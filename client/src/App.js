import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: []
    };
  }

  addToSavedList = movie => {
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({ savedList });
  };

  render() {
    return (
      <Router>
        <div>
          <SavedList list={this.state.savedList} />
          <Route
            exact path="/"
            render={props => <MovieList {...props} onSave={this.addToSavedList} />}
          />
          <Route
            path="/movies/:id"
            render={props => <Movie {...props} onSave={this.addToSavedList} />}
          />
        </div>
      </Router>
    );
  }
}
