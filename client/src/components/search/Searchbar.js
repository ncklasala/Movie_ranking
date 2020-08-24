import React from "react";

const Searchbar = (props) => {
  return (
    <div>
      <div className="md-form mt-0">
        <form action="" onSubmit={props.handleSubmit}>
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            onChange={props.handleChange}
          />
        </form>
      </div>
    </div>
  );
};
export default Searchbar;
