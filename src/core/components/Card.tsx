import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  hoverable = false,
  padding = 'md',
  border = true,
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyle = hoverable
    ? 'hover:-translate-y-1 hover:shadow-xl transition-all duration-300'
    : 'transition-shadow duration-200';

  const borderStyle = border ? 'border border-[#e8dfd5]' : 'border-none';

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm overflow-hidden ${borderStyle} ${hoverStyle} ${className}`}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-[#f4efea] bg-[#faf8f5]/60 font-semibold text-[#2C1810]">
          {header}
        </div>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-[#f4efea] bg-[#faf8f5]/40 flex items-center justify-between">
          {footer}
        </div>
      )}
    </div>
  );
};
