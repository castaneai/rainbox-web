import React from "react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Gradient from "@material-ui/icons/Gradient";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Account from "./Account";

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
  }
}));

const RainBar = () => {
  const classes = useStyles();
  const { initialising, user } = useAuthState(firebase.auth());

  const login = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    await firebase.auth().signInWithRedirect(provider);
  };
  const logout = async () => {
    await firebase.auth().signOut();
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
          (user ? (
            <Account fuser={user} logout={logout} />
          ) : (
            <Button onClick={login}>Login</Button>
          ))}
      </Toolbar>
    </div>
  );
};

export default RainBar;
