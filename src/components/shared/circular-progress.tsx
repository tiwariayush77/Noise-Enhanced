'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface CircularProgressProps {
  size: number;
  value: number;
  color: 'success' | 'warning' | 'error' | 'primary';
  animated?: boolean;
  strokeWidth?: number;
}

const colorClasses = {
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-destructive',
  primary: 'text-primary',
};

export default function CircularProgress({
  size,
  value,
  color,
  animated = true,
  strokeWidth = 8,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(animated ? 0 : value);

  useEffect(() => {
    if (animated) {
      const animation = requestAnimationFrame(() => setProgress(value));
      return () => cancelAnimationFrame(animation);
    }
  }, [value, animated]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-secondary"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={cn('transform -rotate-90 origin-center', colorClasses[color])}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: animated ? 'stroke-dashoffset 0.8s ease-out' : 'none' }}
        />
      </svg>
    </div>
  );
}
