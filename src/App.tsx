import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import RainBar from "./components/RainBar";
import PostGridList from "./components/PostGridList";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PostDetail from "./components/PostDetail";

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Router>
      <RainBar />
      <Route path="/" exact component={PostGridList} />
      <Route
        path="/posts/:id"
        render={props => <PostDetail postId={props.match.params.id} />}
      />
    </Router>
  </React.Fragment>
);

export default App;
