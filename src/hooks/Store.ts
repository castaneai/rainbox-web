import firebase from "firebase/app";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";

interface Model {
  id: string;
}

export function useModel<T extends Model>(
  ref: firebase.firestore.DocumentReference
): [T | null, boolean] {
  const { error, loading, value } = useDocument(ref);
  if (error) {
    throw error;
  }
  if (loading) {
    return [null, loading];
  }
  if (!value || (value && !value.exists)) {
    return [null, loading];
  }
  const model = { id: ref.id, ...value.data() } as T;
  return [model, loading];
}

export function useModels<T extends Model>(
  ref: firebase.firestore.CollectionReference
): [T[], boolean] {
  const { error, loading, value } = useCollection(ref);
  if (error) {
    throw error;
  }
  if (loading) {
    return [[], loading];
  }
  if (!value) {
    return [[], loading];
  }
  const models = value.docs.map(doc => {
    return { id: ref.id, ...doc.data() } as T;
  });
  return [models, loading];
}
