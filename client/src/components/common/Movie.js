import React from "react";

const Movie = (props) => {
  return (
    <div className="col m12">
      <div className="card">
        <div className="card-img-top">
          {props.image == null ? (
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png"
              }
              alt="no poster"
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500/${props.image}`}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Movie;
