import React from 'react'
import firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore'
import { CircularProgress } from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { makeStyles } from '@material-ui/styles';
import { Post } from './Post';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		margin: '3em 0.5em',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	gridList: {
		width: 900,
	}
}))

const PostList = () => {
	const classes = useStyles();
	const { error, loading, value } = useCollection(firebase.firestore().collection('posts'))
	if (error) {
		return <p>Error: {error}</p>
	}
	if (loading) {
		return <div className={classes.root}>
			<CircularProgress />
		</div>
	}
	if (!value) {
		return <p>nothing</p>
	}

	const tile = (doc: firebase.firestore.QueryDocumentSnapshot) => {
		const post = {id: doc.id, ...doc.data()} as Post
		return <GridListTile key={post.id} cols={1}>
			<Link to={`/post/${post.id}`}><img src={post.thumbnailUrl} /></Link>
		</GridListTile>
	}

	return <div className={classes.root}>
		<GridList className={classes.gridList} cellHeight={150} cols={8}>
			{value.docs.map(tile)}
		</GridList>
	</div>
}

export default PostList