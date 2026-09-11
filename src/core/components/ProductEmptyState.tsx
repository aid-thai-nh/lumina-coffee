import React from 'react';
import { SearchX, FilterX, Coffee, AlertCircle, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from './Button';

export type ProductEmptyVariant = 'search-empty' | 'filter-empty' | 'catalog-empty' | 'error';

export interface ProductEmptyStateProps {
  variant?: ProductEmptyVariant;
  searchQuery?: string;
  onResetFilters?: () => void;
  onClearSearch?: () => void;
  onSuggestionClick?: (keyword: string) => void;
  onRetry?: () => void;
  className?: string;
}

const POPULAR_SUGGESTIONS = [
  'Cầu Đất',
  'Typica',
  'Cold Brew',
  'Anaerobic',
  'Hoa cam',
  'Caramel',
];

export const ProductEmptyState: React.FC<ProductEmptyStateProps> = ({
  variant = 'search-empty',
  searchQuery = '',
  onResetFilters,
  onClearSearch,
  onSuggestionClick,
  onRetry,
  className = '',
}) => {
  // 1. Search Not Found State
  if (variant === 'search-empty') {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-white border border-[#e8dfd1] shadow-xs my-8 ${className}`}
        role="alert"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#faf6f0] border border-[#e8dfd1] flex items-center justify-center text-[#d36b00] mb-5 shadow-xs">
          <SearchX className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea7c1b] px-3 py-1 rounded-full bg-[#ea7c1b]/10 mb-2">
          Không tìm thấy kết quả
        </span>

        <h3 className="font-serif text-2xl font-bold text-[#2c1810] mb-2">
          Không có sản phẩm nào cho "{searchQuery}"
        </h3>

        <p className="text-xs sm:text-sm text-[#837469] max-w-md mx-auto mb-6 leading-relaxed">
          Chúng tôi không tìm thấy hạt cà phê hoặc nốt hương nào khớp với từ khóa của bạn. Hãy thử kiểm tra lỗi chính tả hoặc khám phá các gợi ý bên dưới.
        </p>

        {/* Suggestion Chips */}
        {onSuggestionClick && (
          <div className="mb-6 flex flex-col items-center gap-2">
            <span className="text-[11px] font-semibold text-[#51443a] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#ea7c1b]" />
              <span>Gợi ý tìm kiếm phổ biến:</span>
            </span>
            <div className="flex flex-wrap justify-center gap-2 max-w-md">
              {POPULAR_SUGGESTIONS.map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => onSuggestionClick(kw)}
                  className="px-3 py-1 rounded-full bg-[#faf6f0] hover:bg-[#efe8de] border border-[#e8dfd1] text-xs text-[#51443a] font-medium transition-colors cursor-pointer"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          {onClearSearch && (
            <Button variant="primary" size="md" onClick={onClearSearch}>
              Xóa từ khóa tìm kiếm
            </Button>
          )}
          {onResetFilters && (
            <Button
              variant="outline"
              size="md"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={onResetFilters}
            >
              Đặt lại tất cả bộ lọc
            </Button>
          )}
        </div>
      </div>
    );
  }

  // 2. Filter Combination Empty State
  if (variant === 'filter-empty') {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-white border border-[#e8dfd1] shadow-xs my-8 ${className}`}
        role="alert"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#faf6f0] border border-[#e8dfd1] flex items-center justify-center text-[#835423] mb-5 shadow-xs">
          <FilterX className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-[#835423] px-3 py-1 rounded-full bg-[#835423]/10 mb-2">
          Bộ lọc quá hẹp
        </span>

        <h3 className="font-serif text-2xl font-bold text-[#2c1810] mb-2">
          Không có sản phẩm khớp với tiêu chí lọc
        </h3>

        <p className="text-xs sm:text-sm text-[#837469] max-w-md mx-auto mb-6 leading-relaxed">
          Hiện tại không có mẻ rang nào thỏa mãn đồng thời tất cả các tiêu chí (mức rang, vùng trồng, thang điểm SCA hoặc khoảng giá) bạn đã chọn.
        </p>

        {onResetFilters && (
          <Button
            variant="primary"
            size="md"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={onResetFilters}
          >
            Đặt lại bộ lọc để xem toàn bộ
          </Button>
        )}
      </div>
    );
  }

  // 3. Catalog Empty / Database Zero State
  if (variant === 'catalog-empty') {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-white border border-[#e8dfd1] shadow-xs my-8 ${className}`}
        role="alert"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#faf6f0] border border-[#e8dfd1] flex items-center justify-center text-[#ea7c1b] mb-5 shadow-xs">
          <Coffee className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-[#d36b00] px-3 py-1 rounded-full bg-[#d36b00]/10 mb-2">
          Danh mục đang chuẩn bị
        </span>

        <h3 className="font-serif text-2xl font-bold text-[#2c1810] mb-2">
          Danh mục sản phẩm hiện đang trống
        </h3>

        <p className="text-xs sm:text-sm text-[#837469] max-w-md mx-auto mb-6 leading-relaxed">
          Các mẻ rang mới đang được Master Roaster thử nếm (cupping) và cân chỉnh tỉ lệ. Xin quý khách vui lòng quay lại sau ít phút hoặc tải lại danh sách!
        </p>

        {onRetry && (
          <Button variant="primary" size="md" onClick={onRetry}>
            Tải lại dữ liệu (Refresh)
          </Button>
        )}
      </div>
    );
  }

  // 4. API Error / Connection Failed State
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-white border border-rose-200 shadow-xs my-8 ${className}`}
      role="alert"
    >
      <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-5 shadow-xs">
        <AlertCircle className="w-8 h-8" />
      </div>

      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 px-3 py-1 rounded-full bg-rose-100 mb-2">
        Lỗi kết nối máy chủ API
      </span>

      <h3 className="font-serif text-2xl font-bold text-[#2c1810] mb-2">
        Không thể đồng bộ danh sách sản phẩm
      </h3>

      <p className="text-xs sm:text-sm text-[#837469] max-w-md mx-auto mb-6 leading-relaxed">
        Hệ thống không thể tải dữ liệu sản phẩm từ API. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại.
      </p>

      {onRetry && (
        <Button variant="danger" size="md" onClick={onRetry}>
          Thử kết nối lại ngay
        </Button>
      )}
    </div>
  );
};
