import React from "react";
import { v4 } from "uuid";

const Error = ({ error }) => {
  return (
    <ul>
      {error.map((p) => (
        <li key={v4()}>{p}</li>
      ))}
    </ul>
  );
};

export default Error;
