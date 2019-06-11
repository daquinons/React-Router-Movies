import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    if (this.props.movie) {
      this.setState({ movie: this.props.movie });
    } else {
      const { id } = this.props.match.params;
      this.fetchMovie(id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentWillReceiveProps(newProps) {
    if (
      this.props.match &&
      this.props.match.params.id !== newProps.match.params.id
    ) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  saveMovie = () => {
    const addToSavedList = this.props.onSave;
    addToSavedList(this.state.movie);
  };
  const =``;
  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    const { title, director, metascore, stars } = this.state.movie;
    return (
      <div className="save-wrapper">
        <Link to={`movies/${this.state.movie.id}`} >
        <div className="movie-card">
          <h2>{title}</h2>
          <div className="movie-director">
            Director: <em>{director}</em>
          </div>
          <div className="movie-metascore">
            Metascore: <strong>{metascore}</strong>
          </div>
          <h3>Actors</h3>

          {stars.map(star => (
            <div key={star} className="movie-star">
              {star}
            </div>
          ))}
        </div>
        </Link>
        <div className="save-button" onClick={this.saveMovie.bind(this)}>
          Save
        </div>
      </div>
    );
  }
}
