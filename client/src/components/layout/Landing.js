import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Search from "../common/Search";
import {
  clearCurrentProfile,
  getCurrentProfile,
  deleteAccount,
} from "../../actions/profileActions";
class Landing extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const authLinks = (
      <ul navbar-nav ml-auto>
        <a
          href="/#"
          onClick={this.onLogoutClick.bind(this)}
          className="nav-link"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="rounded-circle"
            style={{ width: "25px", marginRight: "5px" }}
            title="You must have gravtar"
          />
          <div className="btn btn-lg btn-danger">Logout</div>
        </a>
        <Link to="/create-profile" className="btn btn-lg btn-info mr-2">
          Create Profile
        </Link>
      </ul>
    );
    const guestLinks = (
      <div className="guestlanding">
        <Link to="/register" className="btn btn-lg btn-info mr-2">
          Sign up
        </Link>

        <Link to="/login" className="btn btn-lg btn-light">
          Login
        </Link>
      </div>
    );

    return (
      <div>
        <div className="welcome">
          <p className="lead text-muted">Welcome {user.name}</p>
          <Search />
        </div>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    );
  }
}
Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  logoutUser,
  clearCurrentProfile,
})(Landing);
