import React from "react";
import Movie from "../common/Movie";
const SearchResults = (props) => {
  return (
    <div className="container">
      <div className="row">
        {props.movies.map((movie, i) => {
          return (
            <div className="col col-lg-4">
              {" "}
              <Movie
                key={i}
                image={movie.poster_path}
                title={movie.title}
                overview={movie.overview}
              />{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
