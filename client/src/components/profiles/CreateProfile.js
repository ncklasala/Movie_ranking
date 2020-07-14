import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";
class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      displaySocialInputs: false,
      screenName: "",
      location: "",
      bio: "",
      favoriteGenres: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      screenName: this.state.screenName,
      location: this.state.location,
      bio: this.state.bio,
      favoriteGenres: this.state.favoriteGenres,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };
    this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    return (
      <div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Create Your Profile</h1>
                <p className="lead text-center">
                  Let's get some information to make your profile stand out.
                </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Profile Screen Name"
                    name="screenName"
                    value={this.state.screenName}
                    onChange={this.onChange}
                    error={errors.screenName}
                    info="A unique Screen Name for profile"
                  />
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="Your general location (optional)"
                  />
                  <TextAreaFieldGroup
                    placeholder="Short Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    error={errors.bio}
                    info="Tell us about your self"
                  />
                  <TextFieldGroup
                    placeholder="* Favorite Genres"
                    name="favoriteGenres"
                    value={this.state.favoriteGenres}
                    onChange={this.onChange}
                    error={errors.favoriteGenres}
                    info="List some genres of movies you like, "
                  />
                  <div className="mb-3">
                    <button
                      // type required or button will be treated as submit
                      type="button"
                      onClick={() => {
                        this.setState((prevState) => ({
                          displaySocialInputs: !prevState.displaySocialInputs,
                        }));
                      }}
                      className="btn btn-light"
                    >
                      Add Social Network links
                    </button>
                    <span className="text-muted">Optional</span>
                  </div>
                  {socialInputs}
                  <input
                    type="submit"
                    value="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
