import React from "react";
import Movie from "../common/Movie";
const SearchResults = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col m12">
          {props.movies.map((movie, i) => {
            return <Movie key={i} image={movie.poster_path} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
