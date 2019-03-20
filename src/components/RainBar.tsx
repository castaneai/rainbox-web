import React from 'react'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Avatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	root: {
	},
	grow: {
		flexGrow: 1,
	},
}))

const RainBar = () => {
	const classes = useStyles();
	const {initialising, user} = useAuthState(firebase.auth())
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleMenu = (event: any) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const login = () => {
	  firebase.auth().signInWithEmailAndPassword('test@example.com', 'password')
	}
	const logout = () => {
	  firebase.auth().signOut()
	}

	const accountMenu = () => {
		return <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
			<MenuItem onClick={handleClose}>My Profile</MenuItem>
			<MenuItem onClick={logout}>Logout</MenuItem>
		</Menu>
	}

	const userAvatar = (user: firebase.User) => {
		const alt = user.displayName || '';
		if (!user.photoURL) {
			return <Avatar alt={alt}><AccountCircle /></Avatar>
		}
		return <Avatar alt={alt} src={user.photoURL} />
	}

	const account = (user: firebase.User) => {
		if (user) {
			return <div>
				<IconButton onClick={handleMenu} color="inherit">{userAvatar(user)}</IconButton>
				{accountMenu()}
			</div>
		}
		return <Button color="primary" variant="outlined">Login</Button>
	}

	const loginButton = () => {
		return <Button onClick={login}>Login</Button>
	}

	return <div className={classes.root}>
		<AppBar position="static" color="default">
			<Toolbar>
				<Link to="/">
				<Typography variant="h6" color="inherit" noWrap className={classes.grow}>
					RAINBOX
				</Typography>
				</Link>
				{!initialising && (user ? account(user) : loginButton())}
			</Toolbar>
		</AppBar>
	</div>
}

export default RainBar