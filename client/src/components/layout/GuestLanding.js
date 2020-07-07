import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import Button from "react-bootstrap/Button";
class GuestLanding extends Component {
  render() {
    return (
      <div className="guestlanding">
        <Link to="/register" className="btn btn-lg btn-info mr-2">
          Sign up
        </Link>

        <Link to="/login" className="btn btn-lg btn-light">
          Login
        </Link>
      </div>
    );
  }
}
export default GuestLanding;
