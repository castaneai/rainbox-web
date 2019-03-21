import React from "react";
import { Post } from "./Post";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface Props {
  postId: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: "3em 0.5em",
    display: "flex"
  }
}));

const PostDetail = (props: Props) => {
  const classes = useStyles();
  const { error, loading, value } = useDocument(
    firebase.firestore().doc(`posts/${props.postId}`)
  );
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  if (!value || !value.exists) {
    return <p>nothing</p>;
  }
  const post = { id: props.postId, ...value.data() } as Post;

  return (
    <div className={classes.root}>
      <img src={post.thumbnailUrl} />
    </div>
  );
};

export default PostDetail;
