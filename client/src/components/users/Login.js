import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
        <div>Login</div>
        <p>
          Don't Have an account? <Link to="/register">Sign up!</Link>
        </p>
      </div>
    );
  }
}
export default Login;
