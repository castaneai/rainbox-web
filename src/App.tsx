import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import RainBar from './components/RainBar'
import PostList from './components/PostList'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PostDetail from './components/PostDetail';

const App = () => <React.Fragment>
  <CssBaseline />
  <Router>
    <RainBar />
    <Route path="/" exact component={PostList} />
    <Route path="/post/:id" render={props => <PostDetail postId={props.match.params.id} />} />
  </Router>
</React.Fragment>

export default App;
