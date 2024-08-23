import React from "react";
import { Spinner } from "react-bootstrap";

function PokeSpinner() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Spinner animation="border" role="status"></Spinner>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default PokeSpinner;
