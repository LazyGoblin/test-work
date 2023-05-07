import React from "react";

const Input = ({ label, id, ...rest }) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} {...rest} />
    </div>
  );
};

export default Input;