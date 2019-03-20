import React from 'react'
import firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore'
import { CircularProgress } from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { makeStyles } from '@material-ui/styles';

interface Post {
	id: string
	thumbnailUrl: string
	authorUserId: string
}

const useStyles = makeStyles({
	root: {
		'display': 'flex',
		'flexWrap': 'wrap',
		'justifyContent': 'space-around',
	}
})

const PostList = () => {
	const classes = useStyles();
	const { error, loading, value } = useCollection(firebase.firestore().collection('posts'))
	if (error) {
		return <p>Error: {error}</p>
	}
	if (loading) {
		return <CircularProgress />
	}
	if (!value) {
		return <p>nothing</p>
	}

	const tile = (doc: firebase.firestore.QueryDocumentSnapshot) => {
		const post = {id: doc.id, ...doc.data()} as Post
		return <GridListTile key={post.id} cols={3}>
			<img src={post.thumbnailUrl} />
		</GridListTile>
	}

	return <div className={classes.root}>
		<GridList cellHeight={150} cols={3}>
			{value.docs.map(tile)}
		</GridList>
	</div>
}

export default PostList