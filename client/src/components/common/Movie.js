import React from "react";
import Card from "react-bootstrap/card";
import Button from "react-bootstrap/button";
const Movie = (props) => {
  return (
    <div class="container">
      <Card
        className="card"
        style={{
          width: "18rem",
          maxHeight: "46rem",
          marginTop: "1rem",
          backgroundColor: "lightgrey",
        }}
      >
        <div className="card-img-top">
          {props.image == null ? (
            <Card.Img
              variant="top"
              src={
                "https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png"
              }
              alt="no poster"
            />
          ) : (
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w300/${props.image}`}
              alt=""
            />
          )}
        </div>
        <Card.Body
          style={{
            position: "relative",
          }}
        >
          <Card.Title>{props.title}</Card.Title>
          <Card.Text
            style={{
              fontSize: "1rem",
              overflow: "hidden",
              display: "-webkit-box",
              webkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.overview}
          </Card.Text>
          <Button variant="primary">See More</Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Movie;
