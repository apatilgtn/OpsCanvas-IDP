// src/components/CloudEdgeLogo.jsx
import React from 'react';

const CloudEdgeLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#60A5FA" />
      </linearGradient>
    </defs>
    <circle cx="20" cy="20" r="18" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
    <path 
      d="M18 20L20 17M20 17L22 20M20 17V23" 
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="20" cy="17" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    <circle cx="22" cy="20" r="1.5" fill="currentColor" />
    <circle cx="20" cy="23" r="1.5" fill="currentColor" />
  </svg>
);

export default CloudEdgeLogo;