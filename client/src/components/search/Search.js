import React, { Component } from "react";
import Searchbar from "./Searchbar";
import SearchResults from "./SearchResults";
class Search extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      searchTerm: "",
    };
    this.apiKey = process.env.REACT_APP_API_KEY;
    console.log(process.env.REACT_APP_API_KEY);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        this.setState({ movies: [...data.results] });
      });
  };
  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };
  render() {
    return (
      <div className="movie-search">
        <Searchbar
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <SearchResults movies={this.state.movies} />
      </div>
    );
  }
}

export default Search;
