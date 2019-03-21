import React from "react";
import { Post } from "./Post";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import { CircularProgress, Link, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "react-router-dom";
import PostAuthor from "./PostAuthor";

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
    marginTop: "3em"
  },
  section: {
    margin: "1em 0"
  },
  tagChip: {
    marginRight: "1em"
  }
}));

const PostDetail = (props: Props) => {
  const classes = useStyles();
  const { error, loading, value } = useDocument(
    firebase.firestore().doc(`posts/${props.postId}`)
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
  if (!value || !value.exists) {
    return <p>nothing</p>;
  }
  const post = { id: props.postId, ...value.data() } as Post;

  return (
    <div className={classes.root}>
      <div className={classes.imagesContainer}>
        {post.imageUrls.map((imageUrl, i) => (
          <div key={i} className={classes.imageContainer}>
            <img className={classes.image} src={imageUrl} />
          </div>
        ))}
      </div>

      <div className={classes.metadata}>
        <section className={classes.section}>
          <div>{post.description}</div>
          {post.tags.map(tag => (
            <Link
              className={classes.tagChip}
              key={tag}
              component={(props: any) => (
                <RouterLink to={`/tag/${tag}`} {...props} />
              )}
            >
              #{tag}
            </Link>
          ))}
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
