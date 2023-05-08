import React from "react";

const Input = ({ label, id, ...rest }) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input className="form-control" id={id} {...rest} />
    </div>
  );
};

export default Input;