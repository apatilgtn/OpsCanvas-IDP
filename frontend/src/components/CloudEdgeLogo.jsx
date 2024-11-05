import React from 'react';

const CloudEdgeLogo = ({ className = 'h-8 w-8' }) => {
  return (
    <div className={`${className} relative`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          stroke="currentColor" 
          strokeWidth="6"
          className="text-blue-600" 
        />
        
        {/* Arrow */}
        <path 
          d="M30 50 L70 50 M55 35 L70 50 L55 65" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-blue-600"
        />
      </svg>
    </div>
  );
};

export default CloudEdgeLogo;