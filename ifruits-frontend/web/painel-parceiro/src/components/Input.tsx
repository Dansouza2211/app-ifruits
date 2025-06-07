import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  className = '', 
  required = false,
  ...props 
}, ref) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        className={`input ${error ? 'input-error' : ''} ${className}`}
        {...props}
      />
      
      {error && <p className="error-message">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 