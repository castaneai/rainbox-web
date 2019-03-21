import React from "react";
import firebase from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";
import { CircularProgress } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/styles";
import { Post } from "./Post";
import { Link } from "react-router-dom";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "2em 0.5em",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  gridList: {
    width: 900
  },
  gridTile: {
    height: "200px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover"
  }
}));

const PostList = (props: { width: Breakpoint }) => {
  const classes = useStyles();
  const { error, loading, value } = useCollection(
    firebase.firestore().collection("posts")
  );
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }
  if (!value) {
    return <p>nothing</p>;
  }

  const tile = (doc: firebase.firestore.QueryDocumentSnapshot) => {
    const post = { id: doc.id, ...doc.data() } as Post;
    return (
      <GridListTile key={post.id} cols={1}>
        <Link to={`/post/${post.id}`}>
          <div
            className={classes.gridTile}
            style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
          />
        </Link>
      </GridListTile>
    );
  };

  const gridCols = () => {
    if (isWidthUp("md", props.width)) {
      return 6;
    }
    return 3;
  };

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={250} cols={gridCols()}>
        {value.docs.map(tile)}
      </GridList>
    </div>
  );
};

export default withWidth()(PostList);
