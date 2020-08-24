import React from "react";
import { Link } from "react-router-dom";

const GuestLanding = (
  <div className="guestlanding">
    <Link to="/register" className="btn btn-lg btn-info mr-2">
      Sign up
    </Link>

    <Link to="/login" className="btn btn-lg btn-light">
      Login
    </Link>
  </div>
);

export default GuestLanding;
