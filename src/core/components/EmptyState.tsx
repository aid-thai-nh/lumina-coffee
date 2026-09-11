import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-[#faf8f5]/60 border border-dashed border-[#d5c7b8] ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#835423] mb-4 border border-[#e8dfd5]">
        {icon || <PackageOpen className="w-7 h-7" />}
      </div>
      <h3 className="text-base font-bold text-[#2C1810] mb-1.5">{title}</h3>
      {description && (
        <p className="text-sm text-[#7c6b59] max-w-sm mb-5 leading-relaxed">{description}</p>
      )}
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
