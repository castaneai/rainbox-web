import React from "react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Gradient from "@material-ui/icons/Gradient";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { useDocument } from "react-firebase-hooks/firestore";
import { User } from "../User";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  logo: {
    marginRight: "0.6em"
  },
  title: {
    textDecoration: "none"
  },
  grow: {
    flexGrow: 1
  },
  avatar: {
    width: "1.5em",
    height: "1.5em",
    marginRight: "0.4em"
  }
}));

const RainBar = () => {
  const classes = useStyles();
  const { initialising, user } = useAuthState(firebase.auth());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { error, loading, value } = useDocument(
    firebase.firestore().doc(`users/${user ? user.uid : "_"}`)
  );
  const myUser =
    user && value ? ({ id: user.uid, ...value.data() } as User) : null;
  if (user && value && !value.exists) {
    const userRef = firebase.firestore().doc(`users/${user.uid}`);
    userRef.set({
      displayName: user.displayName || "unknown",
      avatarImageUrl: user.photoURL
    } as User);
  }

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const login = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    await firebase.auth().signInWithRedirect(provider);
  };
  const logout = async () => {
    await firebase.auth().signOut();
  };

  const accountMenu = () => {
    return (
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>My Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    );
  };

  const account = (user: User) => {
    if (user) {
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
          {accountMenu()}
        </div>
      );
    }
    return (
      <Button color="primary" variant="outlined">
        Login
      </Button>
    );
  };

  const loginButton = () => {
    return <Button onClick={login}>Login</Button>;
  };

  return (
    <div className={classes.root}>
      <Toolbar>
        <Link to="/" className={`${classes.grow} ${classes.title}`}>
          <Button>
            <Gradient className={classes.logo} />
            RAINBOX
          </Button>
        </Link>
        {!initialising &&
          !loading &&
          (myUser ? account(myUser) : loginButton())}
      </Toolbar>
    </div>
  );
};

export default RainBar;
