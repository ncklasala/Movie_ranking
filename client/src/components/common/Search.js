import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div className="md-form mt-0">
        <input
          class="form-control"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
    );
  }
}
export default Search;
