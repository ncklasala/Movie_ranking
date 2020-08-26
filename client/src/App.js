import React from "react";
import "./App.css";
import Landing from "./components/layout/Landing";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/profiles/CreateProfile";
import EditProfile from "./components/profiles/EditProfile";
import Search from "./components/search/Search";
import NotFound from "./components/layout/NotFound";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
//check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and is auth
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //TODO: clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="landing">
              <div className="dark-overlay landing-inner text-light">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h1 className="display-3 mb-4">Movie Ranking App</h1>
                      <hr />

                      <Route exact path="/" component={Landing} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/movie-search" component={Search} />
                      <Switch>
                        <PrivateRoute
                          exact
                          path="/create-profile"
                          component={CreateProfile}
                        />
                      </Switch>
                      <Switch>
                        <PrivateRoute
                          exact
                          path="/edit-profile"
                          component={EditProfile}
                        />
                      </Switch>
                      <Route exact path="/not-found" component={NotFound} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
