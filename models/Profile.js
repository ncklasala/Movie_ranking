const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  screenName: {
    type: String,
    required: true,
    max: 40,
  },
  location: {
    type: String,
  },
  favoriteGenres: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  movieList: [
    {
      title: { type: String, required: true },
      genre: { type: [String] },
      director: { type: String },
      runtime: { type: String },
      poster: { type: String },
      series: { type: String },
      cast: { type: [String] },
      imdbId: { type: String },
      tmbdId: { type: String },
      release: { type: Date },
      description: { type: String },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
