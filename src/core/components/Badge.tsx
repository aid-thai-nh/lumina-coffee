import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
  pill?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  pill = true,
  className = '',
  ...props
}) => {
  const variantStyles = {
    brand: 'bg-[#faf3eb] text-[#835423] border-[#e8dfd5]',
    success: 'bg-[#e8f5e9] text-[#2e7d32] border-[#c8e6c9]',
    warning: 'bg-[#fff3e0] text-[#ea7c1b] border-[#ffe0b2]',
    error: 'bg-[#ffebee] text-[#c62828] border-[#ffcdd2]',
    info: 'bg-[#e1f5fe] text-[#0288d1] border-[#b3e5fc]',
    neutral: 'bg-[#f4efea] text-[#5a4a39] border-[#e8dfd5]',
  };

  const dotColors = {
    brand: 'bg-[#835423]',
    success: 'bg-[#2e7d32]',
    warning: 'bg-[#ea7c1b]',
    error: 'bg-[#c62828]',
    info: 'bg-[#0288d1]',
    neutral: 'bg-[#7c6b59]',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium gap-1',
    md: 'text-xs px-2.5 py-1 font-semibold gap-1.5',
  };

  const shapeStyle = pill ? 'rounded-full' : 'rounded-md';

  return (
    <span
      className={`inline-flex items-center border ${variantStyles[variant]} ${sizeStyles[size]} ${shapeStyle} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      <span>{children}</span>
    </span>
  );
};
