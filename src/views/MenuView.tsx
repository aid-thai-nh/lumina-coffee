import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Select, Pagination, Empty, Rate } from 'antd';
import { Product } from '../types';
import { PRODUCTS } from '../data/coffeeData';
import {
  ProductCardSkeleton,
  ProductSkeletonGrid,
  ProductEmptyState,
} from '../core/components';
import { useToast } from '../core/hooks/useNotification';
import {
  Search,
  Star,
  Plus,
  Check,
  Sparkles,
  Filter,
  Coffee,
  SlidersHorizontal,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Flame,
  MapPin,
  Award,
  CircleDollarSign,
} from 'lucide-react';

interface MenuViewProps {
  onOpenProductModal: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
  onBackToHome?: () => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  onOpenProductModal,
  onQuickAddToCart,
  onBackToHome,
  selectedCategory: propCategory,
  onSelectCategory: propOnSelectCategory,
}) => {
  // Main filter states
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const selectedCategory = propCategory ?? internalCategory;
  const setSelectedCategory = (cat: string) => {
    if (propOnSelectCategory) {
      propOnSelectCategory(cat);
    } else {
      setInternalCategory(cat);
    }
  };
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [selectedProcess, setSelectedProcess] = useState<string>('all');
  const [selectedSca, setSelectedSca] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(false);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const gridTopRef = useRef<HTMLDivElement>(null);
  const [isLoading] = useState<boolean>(false);

  // Filter definitions (100% Vietnamese)
  const categories = [
    { id: 'all', label: 'Tất cả sản phẩm' },
    { id: 'single-origin', label: 'Hạt Đơn Vùng (Single Origin)' },
    { id: 'espresso', label: 'Espresso & Pha Máy' },
    { id: 'signature', label: 'Món Độc Bản Signature' },
    { id: 'cold-brew', label: 'Cold Brew Ủ Chậm' },
    { id: 'gear', label: 'Dụng Cụ & Phin' },
  ];

  const roastFilters = [
    { id: 'all', label: 'Tất cả mức rang' },
    { id: 'Light', label: 'Rang Sáng (Light)' },
    { id: 'Medium-Light', label: 'Rang Vừa Sáng (Med-Light)' },
    { id: 'Medium', label: 'Rang Vừa (Medium)' },
    { id: 'Medium-Dark', label: 'Rang Đậm Vừa (Med-Dark)' },
  ];

  const originFilters = [
    { id: 'all', label: 'Tất cả vùng trồng' },
    { id: 'cau-dat', label: 'Đỉnh Cầu Đất (1.650m)' },
    { id: 'langbiang', label: 'Núi LangBiang (1.700m)' },
    { id: 'daklak', label: 'Đắk Lắk / Buôn Ma Thuột' },
  ];

  const processFilters = [
    { id: 'all', label: 'Tất cả phương pháp sơ chế' },
    { id: 'natural', label: 'Phơi Khô Tự Nhiên (Natural)' },
    { id: 'honey', label: 'Sơ Chế Mật Ong (Honey)' },
    { id: 'washed', label: 'Rửa Ướt (Washed)' },
    { id: 'anaerobic', label: 'Lên Men Yếm Khí (Anaerobic)' },
  ];

  const scaFilters = [
    { id: 'all', label: 'Tất cả thang điểm' },
    { id: '85', label: 'SCA 85+ (Đặc Sản Cao Cấp)' },
    { id: '88', label: 'SCA 88+ (Micro-lot Thượng Hạng)' },
    { id: '90', label: 'SCA 90+ (Tuyệt Phẩm Độc Bản)' },
  ];

  const priceFilters = [
    { id: 'all', label: 'Tất cả mức giá' },
    { id: 'under-70k', label: 'Dưới 70.000đ' },
    { id: '70k-150k', label: '70.000đ – 150.000đ' },
    { id: 'over-150k', label: 'Trên 150.000đ' },
  ];

  const sortOptions = [
    { id: 'featured', label: 'Nổi bật nhất' },
    { id: 'sca-desc', label: 'Điểm SCA cao nhất' },
    { id: 'price-asc', label: 'Giá: Thấp đến Cao' },
    { id: 'price-desc', label: 'Giá: Cao đến Thấp' },
    { id: 'rating-desc', label: 'Đánh giá cao nhất' },
  ];

  // Count active filters (excluding default 'all' and 'featured')
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedRoast !== 'all') count++;
    if (selectedOrigin !== 'all') count++;
    if (selectedProcess !== 'all') count++;
    if (selectedSca !== 'all') count++;
    if (selectedPriceRange !== 'all') count++;
    if (searchQuery.trim() !== '') count++;
    if (sortBy !== 'featured') count++;
    return count;
  }, [selectedRoast, selectedOrigin, selectedProcess, selectedSca, selectedPriceRange, searchQuery, sortBy]);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedRoast('all');
    setSelectedOrigin('all');
    setSelectedProcess('all');
    setSelectedSca('all');
    setSelectedPriceRange('all');
    setSortBy('featured');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

      // Roast level
      const matchesRoast = selectedRoast === 'all' || p.roastLevel === selectedRoast;

      // Origin
      let matchesOrigin = true;
      if (selectedOrigin !== 'all') {
        const orig = (p.origin || '').toLowerCase();
        if (selectedOrigin === 'cau-dat') matchesOrigin = orig.includes('cầu đất');
        else if (selectedOrigin === 'langbiang') matchesOrigin = orig.includes('langbiang');
        else if (selectedOrigin === 'daklak') matchesOrigin = orig.includes('đắk lắk') || orig.includes('buôn ma thuột') || orig.includes('cư m’gar');
      }

      // Processing
      let matchesProcess = true;
      if (selectedProcess !== 'all') {
        const proc = (p.process || '').toLowerCase();
        if (selectedProcess === 'natural') matchesProcess = proc.includes('natural');
        else if (selectedProcess === 'honey') matchesProcess = proc.includes('honey');
        else if (selectedProcess === 'washed') matchesProcess = proc.includes('washed');
        else if (selectedProcess === 'anaerobic') matchesProcess = proc.includes('anaerobic') || proc.includes('yếm khí');
      }

      // SCA Score
      let matchesSca = true;
      if (selectedSca !== 'all') {
        const minScore = parseFloat(selectedSca);
        matchesSca = (p.scaScore || 0) >= minScore;
      }

      // Price range
      let matchesPrice = true;
      if (selectedPriceRange !== 'all') {
        if (selectedPriceRange === 'under-70k') matchesPrice = p.price < 70000;
        else if (selectedPriceRange === '70k-150k') matchesPrice = p.price >= 70000 && p.price <= 150000;
        else if (selectedPriceRange === 'over-150k') matchesPrice = p.price > 150000;
      }

      // Search
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tastingNotes.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.origin && p.origin.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.brewInfo.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesRoast && matchesOrigin && matchesProcess && matchesSca && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'sca-desc') return (b.scaScore || 0) - (a.scaScore || 0);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      return 0; // featured maintains default order
    });
  }, [selectedCategory, selectedRoast, selectedOrigin, selectedProcess, selectedSca, selectedPriceRange, searchQuery, sortBy]);

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedRoast, selectedOrigin, selectedProcess, selectedSca, selectedPriceRange, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const currentProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAddToCart(product);
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#fcf9f8] min-h-screen pb-16 overflow-x-clip"
    >
      <div className="lumina-container pt-6 sm:pt-10">
        {/* Header Title with Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#835423] font-bold block mb-2">
            THỰC ĐƠN ĐẶC SẢN LUMINA • ARTISANAL ROASTERY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2c1810] mb-3 leading-tight">
            Tuyển Chọn Cà Phê Mộc Cao Cấp
          </h1>
          <p className="text-sm text-[#51443a] leading-relaxed">
            Mỗi mẻ cà phê là một bản giao hưởng terroir giữa thổ nhưỡng cao nguyên Cầu Đất 1.650m, phương pháp sơ chế tự nhiên và ngọn lửa rang mộc thủ công.
          </p>
        </motion.div>

        {/* Primary Filter & Controls Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e8dfd1] shadow-xs mb-8 space-y-4"
        >
          {/* Top Bar: Search + Quick Roast + Advanced Toggle */}
          <div className="flex flex-col lg:flex-row gap-3.5 justify-between items-stretch lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#837469] absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Tìm món, nốt hương (hoa nhài, đào, caramel...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e8dfd1] text-xs bg-[#fcf9f8] focus:bg-white focus:border-[#d36b00] focus:outline-none transition-all placeholder:text-[#837469]/70"
              />
            </div>

            {/* Quick Actions: Roast Filter + Sort + Advanced Toggle */}
            <div className="flex flex-wrap items-center gap-2.5 justify-between lg:justify-end">
              {/* Sort Dropdown with Ant Design */}
              <div className="flex items-center gap-1.5 bg-[#faf6f0] border border-[#e8dfd1]/70 rounded-xl px-2.5 py-1 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#835423]" />
                <span className="text-[#837469] font-medium hidden sm:inline">Sắp xếp:</span>
                <Select
                  value={sortBy}
                  onChange={(val) => setSortBy(val)}
                  variant="borderless"
                  size="small"
                  className="w-36 font-semibold text-xs text-[#2c1810]"
                  options={sortOptions.map((opt) => ({
                    value: opt.id,
                    label: opt.label,
                  }))}
                />
              </div>

              {/* Advanced Filters Button */}
              <button
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  isAdvancedOpen || activeFiltersCount > 0
                    ? 'bg-[#2c1810] text-white border-[#2c1810]'
                    : 'bg-[#faf6f0] text-[#51443a] hover:bg-[#efe8de] border-[#e8dfd1]/70'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#ea7c1b]" />
                <span>Bộ lọc chuyên sâu</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#ea7c1b] text-white text-[10px] flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Reset Button (visible when filters applied) */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="py-2 px-3 rounded-xl text-xs font-semibold text-[#837469] hover:text-[#d36b00] hover:bg-[#f6f3f2] transition-colors flex items-center gap-1 cursor-pointer"
                  title="Đặt lại toàn bộ bộ lọc"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Đặt lại</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Horizontal Tabs (100% Vietnamese) */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-[#f0eded] pb-1">
            {categories.map((cat) => {
              const count = cat.id === 'all'
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-2 px-4 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-[#d36b00] text-white shadow-xs'
                      : 'bg-[#faf6f0] text-[#51443a] hover:bg-[#efe8de] border border-[#e8dfd1]/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-[#e8dfd1]/60 text-[#837469]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Advanced Multi-criteria Filter Panel (Collapsible) */}
          <AnimatePresence>
            {isAdvancedOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pt-4 border-t border-[#f0eded]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-[#faf6f0]/70 border border-[#e8dfd1]/60">
                  {/* 1. Roast Level */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#835423] mb-1.5 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-[#ea7c1b]" />
                      <span>Mức rang</span>
                    </label>
                    <Select
                      value={selectedRoast}
                      onChange={(val) => setSelectedRoast(val)}
                      className="w-full text-xs"
                      options={roastFilters.map((r) => ({
                        value: r.id,
                        label: r.label,
                      }))}
                    />
                  </div>

                  {/* 2. Terroir / Origin */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#835423] mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#ea7c1b]" />
                      <span>Vùng trồng / Terroir</span>
                    </label>
                    <Select
                      value={selectedOrigin}
                      onChange={(val) => setSelectedOrigin(val)}
                      className="w-full text-xs"
                      options={originFilters.map((o) => ({
                        value: o.id,
                        label: o.label,
                      }))}
                    />
                  </div>

                  {/* 3. Processing Method */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#835423] mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#ea7c1b]" />
                      <span>Phương pháp sơ chế</span>
                    </label>
                    <Select
                      value={selectedProcess}
                      onChange={(val) => setSelectedProcess(val)}
                      className="w-full text-xs"
                      options={processFilters.map((p) => ({
                        value: p.id,
                        label: p.label,
                      }))}
                    />
                  </div>

                  {/* 4. SCA Score / Price Range */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#835423] mb-1.5 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#ea7c1b]" />
                      <span>Tiêu chuẩn SCA &amp; Giá</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={selectedSca}
                        onChange={(val) => setSelectedSca(val)}
                        className="w-full text-[11px]"
                        options={scaFilters.map((s) => ({
                          value: s.id,
                          label: s.label,
                        }))}
                      />
                      <Select
                        value={selectedPriceRange}
                        onChange={(val) => setSelectedPriceRange(val)}
                        className="w-full text-[11px]"
                        options={priceFilters.map((p) => ({
                          value: p.id,
                          label: p.label,
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-[#837469] pt-2">
            <span>
              Tìm thấy <strong className="text-[#2c1810] font-bold">{filteredProducts.length}</strong> sản phẩm phù hợp
            </span>
            <span>
              Trang <strong className="text-[#2c1810]">{currentPage}</strong> / {totalPages}
            </span>
          </div>
        </motion.div>

        {/* Scroll anchor point for pagination */}
        <div ref={gridTopRef} />

        {/* Products Grid / Skeleton Loading / Empty States */}
        {isLoading ? (
          <ProductSkeletonGrid count={itemsPerPage} />
        ) : filteredProducts.length === 0 ? (
          searchQuery.trim() !== '' ? (
            <ProductEmptyState
              variant="search-empty"
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              onResetFilters={handleResetFilters}
              onSuggestionClick={(kw) => setSearchQuery(kw)}
            />
          ) : activeFiltersCount > 0 ? (
            <ProductEmptyState
              variant="filter-empty"
              onResetFilters={handleResetFilters}
            />
          ) : (
            <ProductEmptyState
              variant="catalog-empty"
              onRetry={handleResetFilters}
            />
          )
        ) : (
          <div>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12"
            >
              <AnimatePresence mode="popLayout">
                {currentProducts.map((prod, index) => {
                  const isAdded = addedItemIds[prod.id];
                  return (
                    <motion.div
                      key={prod.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      onClick={() => onOpenProductModal(prod)}
                      className="group bg-white rounded-2xl p-6 border border-[#e8dfd1] shadow-[0_4px_16px_rgba(56,34,15,0.04)] hover:shadow-[0_12px_28px_rgba(56,34,15,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        {/* Product Image with Rounded Inner Radius */}
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#faf6f0] mb-4">
                          <img
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src={prod.imageUrl}
                            alt={prod.name}
                          />
                          <span className={`absolute top-3 left-3 px-2.5 py-1 ${prod.tagColor || 'bg-[#835423]'} text-white text-[10px] uppercase rounded-md font-bold tracking-wider shadow-xs`}>
                            {prod.tag}
                          </span>
                          {prod.scaScore && (
                            <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-[#ffdcc3] text-[10px] font-bold rounded-md">
                              SCA: {prod.scaScore}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1 text-[#ea7c1b]">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-xs font-bold text-[#1c1b1b]">{prod.rating.toFixed(1)}</span>
                            <span className="text-xs text-[#837469]">({prod.reviewCount})</span>
                          </div>
                          <span className="text-[11px] text-[#837469] uppercase font-semibold">
                            {prod.brewInfo}
                          </span>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-[#1c1b1b] group-hover:text-[#835423] transition-colors mb-1.5 leading-snug">
                          {prod.name}
                        </h3>
                        <p className="text-xs text-[#51443a] line-clamp-2 mb-4 leading-relaxed">
                          {prod.description}
                        </p>

                        {/* Tasting notes pills */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {prod.tastingNotes.slice(0, 3).map((note, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-md bg-[#faf6f0] border border-[#e8dfd1]/60 text-[10px] font-semibold text-[#51443a] flex items-center gap-1"
                            >
                              <Sparkles className="w-2.5 h-2.5 text-[#ea7c1b]" />
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#f0eded]">
                        <div>
                          {prod.originalPrice && (
                            <span className="text-xs text-[#837469] line-through block">
                              {prod.originalPrice.toLocaleString('vi-VN')}đ
                            </span>
                          )}
                          <span className="font-serif text-lg font-bold text-[#835423]">
                            {prod.price.toLocaleString('vi-VN')}đ
                          </span>
                        </div>

                        <button
                          aria-label="Thêm vào giỏ hàng"
                          onClick={(e) => handleQuickAdd(prod, e)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-90 ${
                            isAdded
                              ? 'bg-[#2e7d32] text-white'
                              : 'bg-[#ea7c1b] hover:bg-[#d36b00] text-white'
                          }`}
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls with Ant Design */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center pt-4 pb-8"
              >
                <div className="bg-white px-4 py-2.5 rounded-2xl border border-[#e8dfd1] shadow-xs">
                  <Pagination
                    current={currentPage}
                    total={filteredProducts.length}
                    pageSize={itemsPerPage}
                    onChange={(page) => handlePageChange(page)}
                    showSizeChanger={false}
                    responsive
                  />
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
