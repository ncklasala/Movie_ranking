const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const user = require("./routes/api/users");
const profile = require("./routes/api/profile");
const list = require("./routes/api/list");
const app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;
// connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
//Passport Config
require("./config/passport")(passport);
// app.get("/", (req, res) => res.send("Hello World"));

//Use Routes
app.use("/api/users", user);
// app.use("/api/profile", profile);
// app.use("/api/list", list);

// serve static in prod
if (process.env.NODE_ENV === "production") {
  //static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
