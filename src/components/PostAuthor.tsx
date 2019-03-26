import React from "react";
import firebase from "firebase/app";
import { CircularProgress, Avatar, Button } from "@material-ui/core";
import { User } from "../User";
import { makeStyles } from "@material-ui/styles";
import { useModel } from "../hooks/Store";

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
  const userRef = firebase.firestore().doc(`users/${props.userId}`);
  const [user, loading] = useModel<User>(userRef);
  if (loading) {
    return <CircularProgress />;
  }
  if (!user) {
    return <p>unknown user</p>;
  }

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
