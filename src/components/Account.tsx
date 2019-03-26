import React from "react";
import firebase from "firebase/app";
import { User } from "../User";
import { Button, Avatar, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useModel } from "../hooks/Store";

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
  const [user, loading] = useModel<User>(userRef);
  if (loading) {
    return null;
  }
  if (!user) {
    return null;
  }

  // TODO: sign up
  /*
  if (value && !value.exists) {
    // sign up as new user
    userRef.set({
      displayName: fuser.displayName,
      avatarImageUrl: fuser.photoURL
    } as User);
  }
  */

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
          alt={user.displayName}
          src={user.avatarImageUrl}
        />
        {user.displayName}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>My Profile</MenuItem>
        <MenuItem onClick={props.logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Account;
