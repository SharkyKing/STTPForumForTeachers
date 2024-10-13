import React from 'react';
import './Input.css';
import './TextArea.css';

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  readOnly = false,
  onChange, 
  name, 
  className, 
  multiline = false,  
  ...rest 
}) => {
  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        readOnly={readOnly}
        className={`textarea ${className}`}
        {...rest}
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      readOnly={readOnly}
      className={`input ${className}`} 
      {...rest} 
    />
  );
};

export default Input;
