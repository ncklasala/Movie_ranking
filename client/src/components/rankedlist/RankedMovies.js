import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteMovies } from "../../actions/profileActions";
import { getCurrentProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";

class RankedMovies extends Component {
  constructor() {
    super();
    this.state = { rankedMovies: [], errors: {} };
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(id) {
    this.props.deleteMovies(id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const movieList = profile.movieList;
      this.setState({
        rankedMovies: movieList,
      });
    }
  }

  render() {
    const movies = this.state.rankedMovies.map((movie) => (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.cast}</td>
        <td>{movie.descripition}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, movie._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Ranked List</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Cast</th>
              <th>Description</th>
              <th></th>
            </tr>
            {movies}
          </thead>
        </table>
      </div>
    );
  }
}
RankedMovies.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  movieList: PropTypes.array.isRequired,
  deleteMovies: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, { deleteMovies, getCurrentProfile })(
  withRouter(RankedMovies)
);
