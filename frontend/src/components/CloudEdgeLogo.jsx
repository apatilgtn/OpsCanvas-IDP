// src/components/CloudEdgeLogo.jsx
import React from 'react';

const CloudEdgeLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    {/* Cloud Base */}
    <path
      d="M16 16H8C5.79086 16 4 14.2091 4 12C4 9.79086 5.79086 8 8 8C8.55229 8 9.08166 8.08566 9.57874 8.24408C10.0398 6.51586 11.5803 5.24226 13.4117 5.03243C15.2431 4.8226 17.0305 5.77112 18 7.33333C19.3382 7.33333 20.4297 8.32285 20.6178 9.64404C21.4843 10.0681 22 10.9777 22 12C22 13.6569 20.6569 15 19 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Edge Network Lines */}
    <path
      d="M12 12L16 8M16 8L20 12M16 8V20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Connection Points */}
    <circle cx="16" cy="8" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="20" cy="12" r="1" fill="currentColor" />
    <circle cx="16" cy="20" r="1" fill="currentColor" />
  </svg>
);

export default CloudEdgeLogo;