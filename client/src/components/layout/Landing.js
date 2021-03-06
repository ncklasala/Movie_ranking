import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Search from "../search/Search";
import RankedMovies from "../rankedlist/RankedMovies";
import Spinner from "../common/Spinner";
import {
  clearCurrentProfile,
  getCurrentProfile,
  deleteAccount,
} from "../../actions/profileActions";
import GuestLanding from "./GuestLanding";
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
    let authLinks;
    let profileOption;

    if (profile === null || loading) {
      authLinks = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        profileOption = (
          <div>
            <img
              src={user.avatar}
              alt={user.name}
              className="rounded-circle"
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have gravtar"
            />
            {/* <RankedMovies movieList={profile.movieList} /> */}
            <Link to="/edit-profile" className="btn btn-lg btn-info mr-2">
              Edit Profile
            </Link>
            <Link to="/movie-search" className="btn btn-lg btn-info mr-2">
              Movie Search
            </Link>
            <Link to="/ranked-list" className="btn btn-lg btn-info mr-2">
              Ranked List
            </Link>
            <a
              href="/#"
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              <div className="btn btn-lg btn-danger">Logout</div>
            </a>
          </div>
        );
      } else {
        profileOption = (
          <div className="newProfile">
            <img
              src={user.avatar}
              alt={user.name}
              className="rounded-circle"
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have gravtar"
            />
            <Link to="/create-profile" className="btn btn-lg btn-info mr-2">
              Create Profile
            </Link>
            <a
              href="/#"
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              <div className="btn btn-lg btn-danger">Logout</div>
            </a>
          </div>
        );
      }
    }
    return (
      <div>
        <div className="welcome">
          <p className="lead text-muted">Welcome {user.name}</p>
        </div>
        {isAuthenticated ? authLinks : GuestLanding}

        {profileOption}
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
