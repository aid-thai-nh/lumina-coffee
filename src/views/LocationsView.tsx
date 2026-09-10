import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pagination } from 'antd';
import { BRANCHES } from '../data/coffeeData';
import { BranchLocation } from '../types';
import {
  MapPin,
  Phone,
  Clock,
  Calendar,
  Check,
  Sparkles,
  Navigation,
  Search,
  Filter,
  Car,
  Coffee,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Flame,
  Trees,
  Laptop,
  CheckCircle2
} from 'lucide-react';

interface LocationsViewProps {
  onOpenWorkshopModal: () => void;
}

export const LocationsView: React.FC<LocationsViewProps> = ({ onOpenWorkshopModal }) => {
  // Filter states
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('all');

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;
  const listTopRef = useRef<HTMLDivElement>(null);

  // Filter definitions (100% Vietnamese)
  const cityFilters = [
    { id: 'all', label: 'Tất cả thành phố' },
    { id: 'Hà Nội', label: 'Hà Nội' },
    { id: 'TP. Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
    { id: 'Đà Lạt', label: 'Đà Lạt' },
  ];

  const categoryFilters = [
    { id: 'all', label: 'Tất cả loại hình', icon: Coffee },
    { id: 'roastery', label: 'Xưởng Rang & Thử Nếm', icon: Flame },
    { id: 'garden', label: 'Sân Vườn & Nhà Kính', icon: Trees },
    { id: 'workspace', label: 'Làm Việc Tĩnh Lặng', icon: Laptop },
    { id: 'slow-bar', label: 'Slow Bar Thủ Công', icon: Sparkles },
  ];

  const amenityFilters = [
    { id: 'all', label: 'Tất cả tiện ích' },
    { id: 'parking', label: 'Có chỗ đỗ ô tô' },
    { id: 'roaster', label: 'Có máy rang tại chỗ' },
    { id: 'pet', label: 'Thân thiện thú cưng' },
    { id: 'early', label: 'Mở cửa sớm (trước 07:00)' },
  ];

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCity('all');
    setSelectedCategory('all');
    setSelectedAmenity('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedCity !== 'all' || selectedCategory !== 'all' || selectedAmenity !== 'all' || searchQuery.trim() !== '';

  // Filter Logic
  const filteredBranches = useMemo(() => {
    return BRANCHES.filter((b) => {
      // City
      const matchesCity = selectedCity === 'all' || b.city === selectedCity;

      // Category
      const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;

      // Amenity
      let matchesAmenity = true;
      if (selectedAmenity === 'parking') {
        matchesAmenity = (b.parkingInfo || '').toLowerCase().includes('ô tô') || b.features.some(f => f.toLowerCase().includes('ô tô'));
      } else if (selectedAmenity === 'roaster') {
        matchesAmenity = b.features.some(f => f.toLowerCase().includes('máy rang') || f.toLowerCase().includes('rang'));
      } else if (selectedAmenity === 'pet') {
        matchesAmenity = b.features.some(f => f.toLowerCase().includes('thú cưng') || f.toLowerCase().includes('pet'));
      } else if (selectedAmenity === 'early') {
        matchesAmenity = b.openingHours.startsWith('06:');
      }

      // Search
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        b.name.toLowerCase().includes(query) ||
        b.address.toLowerCase().includes(query) ||
        b.city.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.features.some(f => f.toLowerCase().includes(query));

      return matchesCity && matchesCategory && matchesAmenity && matchesSearch;
    });
  }, [selectedCity, selectedCategory, selectedAmenity, searchQuery]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCity, selectedCategory, selectedAmenity, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredBranches.length / itemsPerPage));
  const currentBranches = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredBranches.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredBranches, currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#fcf9f8] min-h-screen py-12 lg:py-16 overflow-hidden"
    >
      <div className="lumina-container">
        {/* Header with Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#835423] font-bold block mb-2">
            HỆ THỐNG ATELIER &amp; ROASTERY • TOÀN QUỐC
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2c1810] mb-3 leading-tight">
            Không Gian Thưởng Thức Cà Phê Mộc
          </h1>
          <p className="text-sm text-[#51443a] leading-relaxed">
            Nơi hương thơm nồng nàn của từng mẻ rang mới hòa quyện cùng ngôn ngữ kiến trúc wabi-sabi tối giản, tinh tế và tĩnh lặng giữa lòng phố thị.
          </p>
        </motion.div>

        {/* Workshop Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-gradient-to-br from-[#201206] to-[#341b0b] rounded-2xl p-6 sm:p-8 text-white mb-10 shadow-[0_16px_36px_rgba(32,18,6,0.18)] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea7c1b]/20 text-[#ffdcc3] text-xs font-bold uppercase mb-2.5 border border-[#ea7c1b]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#ea7c1b]" />
              <span>SỰ KIỆN CUỐI TUẦN NÀY</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
              Workshop Thử Nếm Cà Phê Cupping Lab Cùng Q-Grader
            </h3>
            <p className="text-xs sm:text-sm text-[#ffdcc3]/85 max-w-2xl leading-relaxed">
              Trải nghiệm nếm thử 5 dòng hạt Geisha, Bourbon và Typica Cầu Đất nguyên bản, học cách phân biệt acid citric thanh tao và vị ngọt mật ong tự nhiên.
            </p>
          </div>
          <button
            onClick={onOpenWorkshopModal}
            className="py-3.5 px-7 rounded-xl bg-[#ea7c1b] hover:bg-[#d36b00] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all whitespace-nowrap cursor-pointer active:scale-95 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Đăng Ký Tham Gia</span>
          </button>
        </motion.div>

        {/* Search & Comprehensive Filters for Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e8dfd1] shadow-xs mb-8 space-y-4"
        >
          {/* Top Row: Search + City Selector + Reset */}
          <div className="flex flex-col md:flex-row gap-3.5 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#837469] absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Tìm chi nhánh theo đường, quận (Tràng Thi, Thảo Điền, Quận 1...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e8dfd1] text-xs bg-[#fcf9f8] focus:bg-white focus:border-[#d36b00] focus:outline-none transition-all placeholder:text-[#837469]/70"
              />
            </div>

            {/* City Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {cityFilters.map((city) => {
                const count = city.id === 'all'
                  ? BRANCHES.length
                  : BRANCHES.filter(b => b.city === city.id).length;

                return (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city.id)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedCity === city.id
                        ? 'bg-[#2c1810] text-white shadow-xs'
                        : 'bg-[#faf6f0] text-[#51443a] hover:bg-[#efe8de] border border-[#e8dfd1]/60'
                    }`}
                  >
                    <span>{city.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        selectedCity === city.id ? 'bg-white/20 text-white' : 'bg-[#e8dfd1]/60 text-[#837469]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="py-2 px-3 rounded-xl text-xs font-semibold text-[#837469] hover:text-[#d36b00] hover:bg-[#f6f3f2] transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                  title="Đặt lại toàn bộ lọc"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Đặt lại</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Atmosphere Type & Amenity Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#f0eded]">
            <span className="text-xs text-[#837469] font-bold shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#ea7c1b]" />
              Không gian:
            </span>

            {categoryFilters.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-[#d36b00] text-white shadow-xs'
                      : 'bg-[#faf6f0] text-[#51443a] hover:bg-[#efe8de] border border-[#e8dfd1]/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}

            {/* Quick Amenity Dropdown */}
            <div className="ml-auto flex items-center gap-1.5 bg-[#faf6f0] border border-[#e8dfd1]/70 rounded-lg px-2.5 py-1 text-xs">
              <Car className="w-3.5 h-3.5 text-[#835423]" />
              <select
                value={selectedAmenity}
                onChange={(e) => setSelectedAmenity(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#2c1810] focus:outline-none cursor-pointer"
              >
                {amenityFilters.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs text-[#837469] pt-1">
            <span>
              Tìm thấy <strong className="text-[#2c1810] font-bold">{filteredBranches.length}</strong> không gian phù hợp
            </span>
            <span>
              Trang <strong className="text-[#2c1810]">{currentPage}</strong> / {totalPages}
            </span>
          </div>
        </motion.div>

        {/* Scroll anchor point for pagination */}
        <div ref={listTopRef} />

        {/* Empty State */}
        {filteredBranches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl border border-[#e8dfd1] p-8 mb-16"
          >
            <MapPin className="w-12 h-12 text-[#837469] mx-auto mb-3 opacity-40" />
            <h3 className="font-serif text-xl font-bold text-[#2c1810] mb-1">
              Không tìm thấy chi nhánh phù hợp
            </h3>
            <p className="text-xs text-[#837469] mb-6 max-w-md mx-auto leading-relaxed">
              Hãy thử chọn khu vực hoặc tiêu chí khác để tìm không gian thưởng thức cà phê Lumina gần nhất.
            </p>
            <button
              onClick={handleResetFilters}
              className="py-2.5 px-6 rounded-xl bg-[#d36b00] hover:bg-[#b85b00] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
            >
              Xem tất cả chi nhánh
            </button>
          </motion.div>
        ) : (
          <div>
            {/* Branches Detailed Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <AnimatePresence mode="popLayout">
                {currentBranches.map((branch, index) => (
                  <motion.div
                    key={branch.id}
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="bg-white rounded-2xl overflow-hidden border border-[#e8dfd1] shadow-[0_4px_16px_rgba(56,34,15,0.04)] hover:shadow-[0_12px_32px_rgba(56,34,15,0.08)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Cover Image */}
                      <div className="relative h-64 sm:h-72 w-full bg-[#201206] overflow-hidden">
                        <img
                          src={branch.imageUrl}
                          alt={branch.name}
                          className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="px-3 py-1 bg-[#835423] text-white text-[10px] font-bold uppercase tracking-widest rounded-md shadow-xs">
                            {branch.branchNumber}
                          </span>
                          {branch.isPopular && (
                            <span className="px-2.5 py-1 bg-[#ea7c1b] text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-xs">
                              FLAGSHIP
                            </span>
                          )}
                        </div>

                        {/* Category Label Pill */}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md text-[#ffdcc3] text-[10px] font-bold rounded-md">
                          {branch.categoryLabel}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-[#201206]/90 via-transparent to-transparent flex items-end p-6">
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-[#ffdcc3] font-bold block mb-1">
                              {branch.city}
                            </span>
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                              {branch.name}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 sm:p-7 space-y-4">
                        <p className="text-xs sm:text-sm text-[#51443a] leading-relaxed">
                          {branch.description}
                        </p>

                        <div className="space-y-2.5 text-xs text-[#51443a] pt-3 border-t border-[#f0eded]">
                          <div className="flex items-start gap-2.5">
                            <MapPin className="w-4 h-4 text-[#d36b00] shrink-0 mt-0.5" />
                            <span>{branch.address}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <Clock className="w-4 h-4 text-[#d36b00] shrink-0" />
                            <span>Giờ hoạt động: <strong>{branch.openingHours}</strong></span>
                            <span className="inline-flex items-center gap-1 text-[10px] text-[#2e7d32] font-bold bg-[#e8f5e9] px-2 py-0.5 rounded-full ml-auto">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32] animate-pulse"></span>
                              Đang mở cửa
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <Phone className="w-4 h-4 text-[#d36b00] shrink-0" />
                            <span>
                              Hotline đặt bàn: <strong>{branch.hotline}</strong>
                            </span>
                          </div>
                          {branch.parkingInfo && (
                            <div className="flex items-start gap-2.5 text-[#837469]">
                              <Car className="w-4 h-4 text-[#835423] shrink-0 mt-0.5" />
                              <span>{branch.parkingInfo}</span>
                            </div>
                          )}
                        </div>

                        {/* Highlights */}
                        <div className="pt-2">
                          <span className="text-[11px] uppercase font-bold text-[#837469] tracking-wider block mb-2.5">
                            Tiện ích không gian:
                          </span>
                          <div className="grid grid-cols-2 gap-2.5">
                            {branch.features.map((f, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-[11px] text-[#2c1810] font-medium bg-[#faf6f0] p-2.5 rounded-lg border border-[#e8dfd1]/50"
                              >
                                <Check className="w-3.5 h-3.5 text-[#2e7d32] shrink-0" />
                                <span className="line-clamp-1">{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions Bottom Bar */}
                    <div className="p-6 sm:p-7 pt-0 flex gap-3">
                      <a
                        href={`tel:${branch.hotline.replace(/\s+/g, '')}`}
                        className="flex-1 py-3 px-6 rounded-xl border border-[#c68e58] text-[#38220f] text-xs font-bold text-center hover:bg-[#faf6f0] transition-colors"
                      >
                        Gọi Đặt Chỗ
                      </a>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-6 rounded-xl bg-[#d36b00] hover:bg-[#b85b00] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Chỉ Đường</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination Controls with Ant Design */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center pt-2 pb-8"
              >
                <div className="bg-white px-4 py-2.5 rounded-2xl border border-[#e8dfd1] shadow-xs">
                  <Pagination
                    current={currentPage}
                    total={filteredBranches.length}
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
