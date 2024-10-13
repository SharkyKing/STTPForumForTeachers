import React from 'react';
import './Button.css';

const Button = ({className, children, onClick, type = 'button', disabled = false }) => {
    return (
        <button
            className={`button ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
