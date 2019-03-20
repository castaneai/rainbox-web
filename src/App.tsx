import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import RainBar from './components/RainBar'
import PostList from './components/PostList';

const App = () => <React.Fragment>
  <CssBaseline />
  <RainBar />
  <PostList />
</React.Fragment>

export default App;
