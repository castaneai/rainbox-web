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

  const userAvatar = (user: firebase.User) => {
    const alt = user.displayName || "";
    if (!user.photoURL) {
      return (
        <Avatar className={classes.avatar} alt={alt}>
          <AccountCircle />
        </Avatar>
      );
    }
    return <Avatar className={classes.avatar} alt={alt} src={user.photoURL} />;
  };

  const account = (user: firebase.User) => {
    if (user) {
      return (
        <div>
          <Button onClick={handleMenu} color="inherit">
            {userAvatar(user)}
            {user.displayName || "testUser"}
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
        {!initialising && (user ? account(user) : loginButton())}
      </Toolbar>
    </div>
  );
};

export default RainBar;
