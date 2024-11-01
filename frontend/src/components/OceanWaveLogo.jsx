import React from 'react';

const OceanWaveLogo = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#3B82F6"
        d="M0 10 C20 30, 40 30, 50 10 C60 30, 80 30, 100 10 L100 100 L0 100 Z"
      />
      <path
        fill="#2563EB"
        d="M0 40 C20 60, 40 60, 50 40 C60 60, 80 60, 100 40 L100 100 L0 100 Z"
      />
      <path
        fill="#1D4ED8"
        d="M0 70 C20 90, 40 90, 50 70 C60 90, 80 90, 100 70 L100 100 L0 100 Z"
      />
    </svg>
  );
};

export default OceanWaveLogo;