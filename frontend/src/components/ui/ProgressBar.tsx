import React from 'react';

interface ProgressBarProps {
  value: number;
  variant?: 'success' | 'warning' | 'danger';
  className?: string;
}

export function ProgressBar({ value, variant = 'success', className = '' }: ProgressBarProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className={`h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full transition-all duration-300 ${getVariantStyles()}`}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}