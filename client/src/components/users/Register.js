import React, { Component } from "react";
import { Link } from "react-router-dom";
class Register extends Component {
  render() {
    return (
      <div className="register">
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
        <div>Register profile</div>
        <br />
        <p>
          Already Have an account? <Link to="/login">Sign In!</Link>
        </p>
      </div>
    );
  }
}
export default Register;
