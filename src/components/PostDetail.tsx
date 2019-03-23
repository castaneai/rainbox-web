import React from "react";
import { Post } from "../Post";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import {
  CircularProgress,
  Link,
  Divider,
  Typography,
  IconButton,
  Button
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import Add from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import ScrollableAnchor from "react-scrollable-anchor";

interface Props {
  postId: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: "3em auto",
    maxWidth: "900px"
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  imageContainer: {
    maxWidth: "900px"
  },
  image: {
    display: "block",
    width: "100%",
    height: "auto"
  },
  metadata: {
    padding: "2em",
    marginTop: "3em"
  },
  section: {
    margin: "1em 0"
  },
  tag: {
    verticalAlign: "middle",
    marginRight: "1em"
  }
}));

const PostDetail = (props: Props) => {
  const classes = useStyles();
  const postRef = firebase.firestore().doc(`posts/${props.postId}`);
  const { error, loading, value } = useDocument(postRef);
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
  if (!value || !value.exists) {
    return <p>nothing</p>;
  }
  const post = { id: props.postId, ...value.data() } as Post;

  return (
    <div className={classes.root}>
      <div className={classes.metadata}>
        <div style={{ margin: "1em 0" }}>
          {post.tags.map(tag => (
            <Link
              className={classes.tag}
              key={tag}
              component={(props: any) => (
                <RouterLink to={`/tags/${tag}`} {...props} />
              )}
            >
              #{tag}
            </Link>
          ))}
          <IconButton>
            <Add fontSize="small" />
          </IconButton>
        </div>
      </div>

      <div className={classes.imagesContainer}>
        {post.imageUrls.map((imageUrl, i) => (
          <div key={i} className={classes.imageContainer}>
            <ScrollableAnchor id={`page${i + 1}`}>
              <img className={classes.image} src={imageUrl} />
            </ScrollableAnchor>
          </div>
        ))}
      </div>

      <div className={classes.metadata}>
        <section className={classes.section}>
          <div>{post.description}</div>
          <div style={{ margin: "1em 0" }}>
            <Typography variant="caption" gutterBottom>
              <Visibility fontSize="inherit" /> {post.viewCount}
            </Typography>
          </div>
        </section>
        <Divider />
        <section className={classes.section}>
          <PostAuthor userId={post.authorUserId} />
        </section>
      </div>
    </div>
  );
};

export default PostDetail;
