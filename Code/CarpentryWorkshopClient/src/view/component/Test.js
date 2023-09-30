import React from "react";
import { Link } from "react-router-dom";

const Test = () => {
  return (
    <div className="test-container">
      <h1>Test Component</h1>
      <p>This is a simple test component.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Test;
