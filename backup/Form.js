import React from "react";
import "./Form.css";

export default function Form() {
  const handleclick = () => {
    console.log("button is clicked");
  };
  return (
    <div className="f">
      <p className="formheading">Could not find what you are looking for?</p>
      <div>
        <div>
          <label>Name</label>
          <input type="text" className="namelabel" name="Enter name"></input>
        </div>
        <br />
        <br />
        <div>
          <label> Mobile number</label>
          <input
            type="number"
            className="mobilelabel"
            name="contact number"
          ></input>
        </div>
        <br />
        <br />
        <button className="button" onClick={handleclick}>
          Submit
        </button>
      </div>
    </div>
  );
}
