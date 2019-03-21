import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import { CircularProgress, Avatar, Button } from "@material-ui/core";
import { User } from "../User";
import { makeStyles } from "@material-ui/styles";

interface Props {
  userId: string;
}

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  avatar: {
    marginRight: "0.4em"
  }
});

const PostAuthor = (props: Props) => {
  const classes = useStyles();
  const { error, loading, value } = useDocument(
    firebase.firestore().doc(`users/${props.userId}`)
  );
  if (error) {
    return <p>error: {error}</p>;
  }
  if (loading) {
    return <CircularProgress />;
  }
  if (!value) {
    return <p>empty user value</p>;
  }
  const user = { id: props.userId, ...value.data() } as User;

  return (
    <div className={classes.root}>
      <Button>
        <Avatar
          className={classes.avatar}
          src={user.avatarImageUrl}
          alt={user.displayName}
        />
        {user.displayName}
      </Button>
    </div>
  );
};

export default PostAuthor;
