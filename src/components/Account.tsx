import React from "react";
import firebase from "firebase/app";
import { useDocument } from "react-firebase-hooks/firestore";
import { User } from "../User";
import { Button, Avatar, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface Props {
  fuser: firebase.User;
  logout: () => Promise<void>;
}

const useStyles = makeStyles({
  avatar: {
    width: "1.5em",
    height: "1.5em",
    marginRight: "0.4em"
  }
});

const Account = (props: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const fuser = props.fuser;
  const userRef = firebase.firestore().doc(`users/${fuser.uid}`);
  const { error, loading, value } = useDocument(userRef);
  if (error || loading || !value) {
    return null;
  }
  const myUser = { id: fuser.uid, ...value.data() } as User;
  if (value && !value.exists) {
    // sign up as new user
    userRef.set({
      displayName: fuser.displayName,
      avatarImageUrl: fuser.photoURL
    } as User);
  }

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleMenu} color="inherit">
        <Avatar
          className={classes.avatar}
          alt={myUser.displayName}
          src={myUser.avatarImageUrl}
        />
        {myUser.displayName}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>My Profile</MenuItem>
        <MenuItem onClick={props.logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Account;
