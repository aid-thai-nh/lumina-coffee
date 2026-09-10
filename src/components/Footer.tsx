import React from 'react';
import { ViewTab } from '../types';
import { Award, Globe, Camera, Youtube, Mail, Calendar, Phone, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: ViewTab) => void;
  onOpenWorkshopModal: () => void;
  onOpenSystemDesign?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenWorkshopModal,
  onOpenSystemDesign,
}) => {
  return (
    <footer className="w-full text-[#F9F6F0] pt-16 pb-10 border-t border-white/10 bg-[#201206]">
      <div className="lumina-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Brand Column (Col 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <span className="font-serif text-[26px] sm:text-[28px] font-bold tracking-wider text-white uppercase block leading-none">
                  LUMINA COFFEE
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#e5bfa3]/80 uppercase block mt-1.5 font-medium">
                  ARTISANAL ROASTERY &amp; ATELIER
                </span>
              </div>
              <p className="text-sm text-[#A89F91] leading-relaxed mb-6">
                Nghệ thuật rang mộc thủ công từng mẻ nhỏ, gìn giữ trọn vẹn phong vị terroir của từng nông hộ tuyển chọn tại cao nguyên Cầu Đất 1.650m và các vùng specialty nổi tiếng toàn cầu.
              </p>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-xs text-[#ffdcbf] mb-6">
                <Award className="w-4 h-4 text-[#ea7c1b] shrink-0" />
                <span className="font-medium">Chứng nhận Specialty Coffee Association (SCA)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Website"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ea7c1b] transition-colors flex items-center justify-center text-white"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ea7c1b] transition-colors flex items-center justify-center text-white"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ea7c1b] transition-colors flex items-center justify-center text-white"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@luminacoffee.vn"
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ea7c1b] transition-colors flex items-center justify-center text-white"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Column (Col 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg sm:text-xl font-semibold text-white mb-5 tracking-wide">
              Khám Phá
            </h4>
            <ul className="space-y-3 text-sm text-[#A89F91]">
              <li>
                <button
                  onClick={() => onSelectTab('menu')}
                  className="hover:text-[#ffdcbf] transition-colors flex items-center gap-2 text-left cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea7c1b] group-hover:scale-125 transition-transform shrink-0" />
                  <span>Hạt Single Origin</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-[#ffdcbf] transition-colors flex items-center gap-2 text-left cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea7c1b] group-hover:scale-125 transition-transform shrink-0" />
                  <span>Di sản rang mộc</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('menu')}
                  className="hover:text-[#ffdcbf] transition-colors flex items-center gap-2 text-left cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea7c1b] group-hover:scale-125 transition-transform shrink-0" />
                  <span>Cold Brew ủ chậm</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('menu')}
                  className="hover:text-[#ffdcbf] transition-colors flex items-center gap-2 text-left cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea7c1b] group-hover:scale-125 transition-transform shrink-0" />
                  <span>Dụng cụ Pour-over</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('locations')}
                  className="hover:text-[#ffdcbf] transition-colors flex items-center gap-2 text-left cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea7c1b] group-hover:scale-125 transition-transform shrink-0" />
                  <span>Hệ thống Atelier</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Locations & Workshop (Col 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg sm:text-xl font-semibold text-white mb-5 tracking-wide">
              Không Gian &amp; Quán
            </h4>
            <div className="space-y-3.5 text-sm text-[#A89F91]">
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] transition-colors">
                <span className="font-semibold text-white block mb-0.5 text-xs sm:text-sm">
                  Hà Nội • Hoàn Kiếm Roastery
                </span>
                <p className="text-[#A89F91] text-xs leading-relaxed">
                  18 Tràng Thi, P. Hàng Trống, Q. Hoàn Kiếm
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] transition-colors">
                <span className="font-semibold text-white block mb-0.5 text-xs sm:text-sm">
                  Sài Gòn • Thảo Điền Atelier
                </span>
                <p className="text-[#A89F91] text-xs leading-relaxed">
                  42 Xuân Thủy, P. Thảo Điền, TP. Thủ Đức
                </p>
              </div>

              <button
                onClick={onOpenWorkshopModal}
                className="w-full inline-flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-[#ffdcc3] hover:text-white transition-all cursor-pointer border border-white/10"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#ea7c1b]" />
                  <span>Workshop Cupping Cuối Tuần</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Customer Care & Concierge (Col 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg sm:text-xl font-semibold text-white mb-5 tracking-wide">
              Dịch Vụ &amp; Liên Hệ
            </h4>
            <div className="space-y-3.5 text-sm text-[#A89F91]">
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-2 text-xs text-[#A89F91]/80 mb-1">
                  <Phone className="w-3.5 h-3.5 text-[#ea7c1b]" />
                  <span>Hotline Concierge &amp; Đặt Bàn:</span>
                </div>
                <a
                  href="tel:19008888"
                  className="font-bold text-white hover:text-[#ffdcc3] transition-colors text-base block"
                >
                  1900 8888
                </a>
                <span className="text-[11px] text-[#A89F91]/70 block mt-0.5">
                  Hỗ trợ nhanh: 024 3982 1199
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-2 text-xs text-[#A89F91]/80 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#ea7c1b]" />
                  <span>Giờ Phục Vụ Tại Quán:</span>
                </div>
                <span className="text-white font-medium text-xs block">
                  07:00 – 22:30 • Tất cả các ngày trong tuần
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#ffdcbf] bg-[#ea7c1b]/10 border border-[#ea7c1b]/20 px-3 py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-[#ea7c1b] shrink-0" />
                <span>Cam kết hạt rang mộc tươi mới trong vòng 14 ngày.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#A89F91] text-xs">
          <div>© 2025 Lumina Specialty Coffee Co. Bảo lưu mọi quyền.</div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-white transition-colors">Nguồn gốc nguyên liệu</a>
            {onOpenSystemDesign && (
              <button
                onClick={onOpenSystemDesign}
                className="text-[#A89F91]/80 hover:text-[#ffdcc3] transition-colors flex items-center gap-1 cursor-pointer font-mono text-[11px]"
                title="Bảng đặc tả hệ thống thiết kế tokens"
              >
                <span>[Design Tokens]</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
