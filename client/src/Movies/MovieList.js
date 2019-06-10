import React, { Component } from "react";
import Movie from "./Movie";
import axios from "axios";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(response => {
        this.setState(() => ({ movies: response.data }));
      })
      .catch(error => {
        console.error("Server Error", error);
      });
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <Movie key={movie.id} movie={movie} onSave={this.props.onSave} />
        ))}
      </div>
    );
  }
}
