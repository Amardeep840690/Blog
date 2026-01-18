import React from 'react';
function Button({
  children,
  type = "button",
  bgcolor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg active:scale-95 ${bgcolor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
