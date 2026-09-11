import React from 'react';
import { Skeleton } from './Skeleton';

export interface ProductCardSkeletonProps {
  className?: string;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border border-[#e8dfd1] shadow-[0_4px_16px_rgba(56,34,15,0.04)] flex flex-col justify-between ${className}`}
      aria-busy="true"
      aria-label="Đang tải dữ liệu sản phẩm..."
    >
      <div>
        {/* Product Image Skeleton with Badge Placeholders */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#faf6f0] mb-4 flex items-center justify-center">
          <Skeleton className="w-full h-full" variant="rectangular" />

          {/* Top-Left Tag Placeholder */}
          <div className="absolute top-3 left-3">
            <Skeleton width={76} height={22} className="rounded-md bg-white/70" />
          </div>

          {/* Bottom-Right SCA Badge Placeholder */}
          <div className="absolute bottom-3 right-3">
            <Skeleton width={62} height={20} className="rounded-md bg-black/20" />
          </div>
        </div>

        {/* Rating & Brew Info Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Skeleton width={16} height={16} variant="circular" />
            <Skeleton width={48} height={14} variant="text" />
          </div>
          <Skeleton width={70} height={14} variant="text" />
        </div>

        {/* Title Placeholder */}
        <Skeleton width="80%" height={24} className="rounded-md mb-2" />

        {/* Description Lines (2 lines) */}
        <div className="space-y-1.5 mb-4">
          <Skeleton width="100%" height={14} variant="text" />
          <Skeleton width="65%" height={14} variant="text" />
        </div>

        {/* Tasting Notes Pills Placeholders */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Skeleton width={68} height={24} className="rounded-md" />
          <Skeleton width={74} height={24} className="rounded-md" />
          <Skeleton width={62} height={24} className="rounded-md" />
        </div>
      </div>

      {/* Bottom Separator & Action */}
      <div className="flex items-center justify-between pt-4 border-t border-[#f0eded]">
        <div>
          <Skeleton width={50} height={12} className="mb-1" variant="text" />
          <Skeleton width={88} height={22} className="rounded-md" />
        </div>
        <Skeleton width={112} height={40} className="rounded-xl" />
      </div>
    </div>
  );
};

export interface ProductSkeletonGridProps {
  count?: number;
  className?: string;
}

export const ProductSkeletonGrid: React.FC<ProductSkeletonGridProps> = ({
  count = 6,
  className = '',
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 ${className}`}
      role="status"
      aria-label="Đang tải danh sách sản phẩm"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={`product-skeleton-${index}`} />
      ))}
    </div>
  );
};
