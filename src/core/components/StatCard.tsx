import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-2xl p-5 border border-[#e8dfd5] shadow-sm flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-semibold text-[#7c6b59] uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-[#faf3eb] text-[#835423] flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div>
        <div className="text-2xl font-bold text-[#2C1810] tracking-tight">{value}</div>
        {subtitle && <p className="text-xs text-[#7c6b59] mt-0.5">{subtitle}</p>}
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-[#f4efea] flex items-center gap-1.5 text-xs font-medium">
          <span
            className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-semibold ${
              trend.isPositive ? 'text-[#2e7d32] bg-[#e8f5e9]' : 'text-[#c62828] bg-[#ffebee]'
            }`}
          >
            {trend.isPositive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {trend.value}%
          </span>
          <span className="text-[#7c6b59]">{trend.label || 'so với tháng trước'}</span>
        </div>
      )}
    </div>
  );
};
