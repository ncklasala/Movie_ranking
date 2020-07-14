const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load validation Files
const validateProfileInput = require("../../validation/profile");
const validateMovieListInput = require("../../validation/movie-list");

const Profile = require("../../models/Profile");

const User = require("../../models/User");

// @route GET api/profile/tests
// @desc tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route GET api/profile
// @desc Get current users profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route GET api/profile/screenName/:screenname
// @desc Get users profile by handle
// @access Public
router.get("/screenname/:screenName", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = "No profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc Get users profile by id
// @access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = "No profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});
// @route GET api/profile/all
// @desc Get all users profile
// @access Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noProfiles = "No profiles created";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch((err) => res.status(404).json(err));
});
// @route Post api/profile
// @desc Post Create or Edit users profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      //Return all errors
      return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.screenName) profileFields.screenName = req.body.screenName;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    //Skills - split into array
    if (typeof req.body.favoriteGenres !== "undefined") {
      profileFields.favoriteGenres = req.body.favoriteGenres.split(",");
    }
    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (profile) {
          //Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then((profile) => res.json(profile));
        } else {
          //Create

          //Check if handle exists
          Profile.findOne({ handle: profileFields.handle })
            .then((profile) => {
              if (profile) {
                errors.handle = "that handle already exists";
                res.status(404).json(errors);
              }
              //Save
              new Profile(profileFields)
                .save()
                .then((profile) => res.json(profile));
            })
            .catch((err) => res.status(404).json(err));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route Post api/profile/experience
// @desc Post Create or Edit users profile experience
// @access Private

router.post(
  "/movie-list",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMovieListInput(req.body);

    if (!isValid) {
      //Return all errors
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        director: req.body.director,
        runtime: req.body.runtime,
        poster: req.body.poster,
        series: req.body.series,
        cast: req.body.cast.split(","),
        imdbId: req.body.imdbId,
        tmbdId: req.body.tmbdId,
        release: req.body.release,
        description: req.body.description,
      };
      // Add to exp array
      profile.movieList.unshift(newMovie);
      profile.save().then((profile) => res.json(profile));
    });
  }
);
// @route Delete api/profile/experience/:exp_id/delete
// @desc Delete users profile experience
// @access Private

router.delete(
  "/movie-list/:movie_id/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        //Get remove index
        const removeIndex = profile.movieList
          .map((item) => item.id)
          .indexOf(req.params.exp_id);
        //splice out of array
        profile.movieList.splice(removeIndex, 1);

        //Save
        profile.save().them((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route Delete api/profile
// @desc Delete users profile
// @access Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
module.exports = router;
