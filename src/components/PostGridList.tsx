import React from "react";
import firebase from "firebase/app";
import { CircularProgress } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/styles";
import { Post } from "../Post";
import { Link } from "react-router-dom";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { useModels } from "../hooks/Store";

const useStyles = makeStyles({
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
});

const PostGridList = (props: { width: Breakpoint }) => {
  const classes = useStyles();
  const postsRef = firebase.firestore().collection("posts");
  const [posts, loading] = useModels<Post>(postsRef);
  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  const tile = (post: Post) => {
    return (
      <GridListTile key={post.id} cols={1}>
        <Link to={`/posts/${post.id}`}>
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
        {posts.map(tile)}
      </GridList>
    </div>
  );
};

export default withWidth()(PostGridList);
