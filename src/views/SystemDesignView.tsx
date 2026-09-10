import React, { useState } from 'react';
import { SYSTEM_DESIGN_TOKENS } from '../data/coffeeData';
import {
  Layers,
  Copy,
  Check,
  Type,
  Palette,
  Layout,
  Component,
  ShieldCheck,
  Sparkles,
  Coffee,
  Flame,
  ArrowRight,
  Database,
  Cpu,
  Monitor,
} from 'lucide-react';

interface SystemDesignViewProps {
  onCopyNotice: (text: string) => void;
  onClose?: () => void;
}

export const SystemDesignView: React.FC<SystemDesignViewProps> = ({ onCopyNotice, onClose }) => {
  const [activeSection, setActiveSection] = useState<'foundations' | 'typography' | 'components' | 'architecture'>('foundations');
  const [selectedRoast, setSelectedRoast] = useState<number>(2); // 0 to 4
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedToken(name);
    onCopyNotice(`Đã sao chép mã màu ${hex} (${name})`);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const roastLevels = [
    { label: 'Light', desc: 'Vị chua thanh, nốt hoa quả mọng (Pour-over/Geisha)' },
    { label: 'Medium-Light', desc: 'Cân bằng acidity & mật ong ngọt (Honey Typica)' },
    { label: 'Medium', desc: 'Hương caramel, socola sữa (Macchiato/Latte)' },
    { label: 'Medium-Dark', desc: 'Đậm đà, hậu vị ca cao (Cà phê sữa đá)' },
    { label: 'Dark Roast', desc: 'Đậm đắng truyền thống, hương khói mộc' },
  ];

  return (
    <div className="w-full bg-[#fcf9f8] min-h-screen py-10">
      <div className="lumina-container">
        {/* System Header */}
        <div className="mb-12 border-b border-[#e8dfd1] pb-8">
          {onClose && (
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#e8dfd1]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#837469]">
                <span className="w-2 h-2 rounded-full bg-[#2e7d32]" />
                <span>INTERNAL DESIGN SYSTEM SPECIFICATIONS</span>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#2c1810] text-white hover:bg-[#38220f] transition-all text-xs font-bold cursor-pointer shadow-xs flex items-center gap-2 active:scale-95"
              >
                <span>✕ Đóng &amp; Quay Lại Demo</span>
              </button>
            </div>
          )}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea7c1b]/15 text-[#d36b00] text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-4 h-4" />
            <span>LUMINA DESIGN SYSTEM V2.4</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2c1810] mb-3">
            Hệ Thống Thiết Kế Lumina Coffee
          </h1>
          <p className="text-[#51443a] text-base max-w-3xl leading-relaxed">
            {SYSTEM_DESIGN_TOKENS.brand.description} Kết hợp giữa triết lý <strong>Tactile Minimalism</strong> (Tối giản xúc giác) và <strong>Editorial Craft</strong> (Chất ấn phẩm báo chí cổ điển), tạo nên trải nghiệm số ấm áp, trang nhã và tôn vinh hạt cà phê mộc.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 pt-6">
            <button
              onClick={() => setActiveSection('foundations')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === 'foundations'
                  ? 'bg-[#2c1810] text-white shadow-sm'
                  : 'bg-white border border-[#e8dfd1] text-[#51443a] hover:bg-[#f0eded]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Bảng Màu &amp; Token</span>
            </button>

            <button
              onClick={() => setActiveSection('typography')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === 'typography'
                  ? 'bg-[#2c1810] text-white shadow-sm'
                  : 'bg-white border border-[#e8dfd1] text-[#51443a] hover:bg-[#f0eded]'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Thang Chữ (Typography)</span>
            </button>

            <button
              onClick={() => setActiveSection('components')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === 'components'
                  ? 'bg-[#2c1810] text-white shadow-sm'
                  : 'bg-white border border-[#e8dfd1] text-[#51443a] hover:bg-[#f0eded]'
              }`}
            >
              <Component className="w-3.5 h-3.5" />
              <span>Thư Viện Linh Kiện (UI Specs)</span>
            </button>

            <button
              onClick={() => setActiveSection('architecture')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === 'architecture'
                  ? 'bg-[#2c1810] text-white shadow-sm'
                  : 'bg-white border border-[#e8dfd1] text-[#51443a] hover:bg-[#f0eded]'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Kiến Trúc Hệ Thống (Architecture)</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: FOUNDATIONS & COLOR PALETTE */}
        {activeSection === 'foundations' && (
          <div className="space-y-10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2c1810]">
                    Bảng Màu Quang Phổ Hạt Rang (Color Tokens)
                  </h3>
                  <p className="text-xs text-[#837469]">
                    Nhấp vào ô màu để sao chép mã HEX vào clipboard. Đảm bảo tỷ lệ tương phản WCAG AA / AAA.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {SYSTEM_DESIGN_TOKENS.colors.map((c) => (
                  <div
                    key={c.name}
                    onClick={() => copyToClipboard(c.hex, c.name)}
                    className="bg-white rounded-xl border border-[#e8dfd1] p-3.5 shadow-xs hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div
                      className="w-full h-24 rounded-lg mb-3 flex items-end justify-end p-2 border border-black/5"
                      style={{ backgroundColor: c.hex }}
                    >
                      <span className="p-1.5 rounded-md bg-white/90 text-[11px] font-mono font-bold text-[#1c1b1b] shadow-xs group-hover:scale-105 transition-transform flex items-center gap-1">
                        {copiedToken === c.name ? (
                          <>
                            <Check className="w-3 h-3 text-[#2e7d32]" />
                            <span>Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-[#837469]" />
                            <span>{c.hex}</span>
                          </>
                        )}
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-[#2c1810] mb-1">{c.name}</h5>
                    <p className="text-[11px] text-[#51443a] leading-tight">{c.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Design System Rules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 bg-white rounded-xl border border-[#e8dfd1] shadow-xs">
                <span className="text-xs uppercase font-bold text-[#d36b00] tracking-wider block mb-2">
                  Quy Luật Bề Mặt (Surfaces)
                </span>
                <p className="text-xs text-[#51443a] leading-relaxed">
                  Độ chênh lệch độ sáng giữa nền canvas (<code>#FCF9F8</code>) và card đặt trên nó luôn được kiểm soát trong khoảng <strong>≤ 7%</strong> ở chế độ sáng và <strong>≤ 12%</strong> ở chế độ tối, giúp mắt không bị mỏi khi đọc lâu.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-[#e8dfd1] shadow-xs">
                <span className="text-xs uppercase font-bold text-[#d36b00] tracking-wider block mb-2">
                  Độ Sâu &amp; Đổ Bóng (Espresso Depth)
                </span>
                <p className="text-xs text-[#51443a] leading-relaxed">
                  Tất cả bóng đổ trong Lumina System đều pha thêm sắc độ cà phê mộc (<code>rgba(56, 34, 15, 0.08)</code>) thay vì dùng màu xám tro kỹ thuật số, tạo cảm giác xúc giác như ánh nắng sớm rọi lên trang giấy thô.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-[#e8dfd1] shadow-xs">
                <span className="text-xs uppercase font-bold text-[#d36b00] tracking-wider block mb-2">
                  Bo Góc Toán Học (Nested Radius)
                </span>
                <p className="text-xs text-[#51443a] leading-relaxed">
                  Công thức bán kính góc lồng nhau: <code>R_trong = R_ngoài - Khoảng_đệm_padding</code>. Áp dụng giới hạn tối đa 12px – 16px cho thẻ sản phẩm, giữ sự trang nhã kiến trúc.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: TYPOGRAPHY SCALE */}
        {activeSection === 'typography' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-xs">
              <h3 className="font-serif text-2xl font-bold text-[#2c1810] mb-2">
                Cặp Đôi Phông Chữ Đặc Trưng
              </h3>
              <p className="text-xs text-[#837469] mb-6">
                Sự hòa quyện giữa nét cổ điển Châu Âu của <strong>EB Garamond</strong> và tính chính xác, thực dụng của <strong>Manrope</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#e8dfd1] pb-8 mb-8">
                <div className="p-5 rounded-xl bg-[#f6f3f2] border border-[#e8dfd1]">
                  <span className="text-[10px] uppercase font-bold text-[#835423] tracking-widest block mb-2">
                    EDITORIAL &amp; DISPLAY SERIF
                  </span>
                  <div className="font-serif text-4xl font-bold text-[#2c1810] mb-2">
                    EB Garamond
                  </div>
                  <p className="font-serif text-lg italic text-[#51443a] leading-relaxed">
                    “Hạt cà phê mang linh hồn của đất, của sương sớm Cầu Đất và ngọn lửa rang mộc thủ công.”
                  </p>
                  <span className="text-[11px] text-[#837469] block mt-3">
                    Sử dụng cho: Hero Titles, H1, H2, H3, Câu trích dẫn (Quotes), Tên mẻ rang đặc sản.
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-[#f6f3f2] border border-[#e8dfd1]">
                  <span className="text-[10px] uppercase font-bold text-[#d36b00] tracking-widest block mb-2">
                    UI &amp; STRUCTURAL SANS-SERIF
                  </span>
                  <div className="font-sans text-3xl font-bold text-[#2c1810] mb-2">
                    Manrope
                  </div>
                  <p className="font-sans text-sm text-[#51443a] leading-relaxed">
                    Tỷ lệ x-height thoáng đãng, các con số Tabular figures sắc nét phục vụ thanh toán, giá tiền và thông số cupping.
                  </p>
                  <span className="text-[11px] text-[#837469] block mt-3">
                    Sử dụng cho: Body copy, Nhãn nút bấm (Label LG), Giá tiền, Thẻ tasting notes, Navigation.
                  </span>
                </div>
              </div>

              {/* Step Scale Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#e8dfd1] text-[#837469] uppercase tracking-wider">
                      <th className="py-3 px-4">Tên Cấp Độ</th>
                      <th className="py-3 px-4">Họ Font</th>
                      <th className="py-3 px-4">Kích Thước / Dòng</th>
                      <th className="py-3 px-4">Trọng Lượng (Weight)</th>
                      <th className="py-3 px-4">Ứng Dụng Thực Tế</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8dfd1]">
                    {SYSTEM_DESIGN_TOKENS.typography.map((t) => (
                      <tr key={t.level} className="hover:bg-[#f6f3f2]/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#2c1810]">{t.level}</td>
                        <td className="py-3.5 px-4 font-mono text-[#835423]">{t.font}</td>
                        <td className="py-3.5 px-4 font-mono">{t.size}</td>
                        <td className="py-3.5 px-4">{t.weight}</td>
                        <td className="py-3.5 px-4 text-[#51443a]">{t.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: COMPONENT SHOWCASE */}
        {activeSection === 'components' && (
          <div className="space-y-8">
            {/* Buttons & Actions */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-xs">
              <h3 className="font-serif text-2xl font-bold text-[#2c1810] mb-2">
                Nút Bấm &amp; Tương Tác (Buttons &amp; CTAs)
              </h3>
              <p className="text-xs text-[#837469] mb-6">
                Tuân thủ quy tắc tỷ lệ padding ngang = 2x padding dọc, phông chữ <code>Manrope</code> đậm và viền tinh tế.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <button className="px-7 py-3.5 rounded-xl bg-[#d36b00] hover:bg-[#b85b00] text-white font-bold text-sm shadow-md transition-all cursor-pointer">
                  Primary CTA (#D36B00)
                </button>

                <button className="px-7 py-3.5 rounded-xl bg-[#2c1810] hover:bg-[#38220f] text-white font-bold text-sm shadow-md transition-all cursor-pointer">
                  Espresso Secondary (#2C1810)
                </button>

                <button className="px-7 py-3.5 rounded-xl border-2 border-[#c68e58] text-[#38220f] font-bold text-sm hover:bg-[#c68e58] hover:text-white transition-all cursor-pointer">
                  Tertiary Outlined (#C68E58)
                </button>

                <button className="px-5 py-2.5 rounded-full bg-[#f0eded] text-[#51443a] font-semibold text-xs hover:bg-[#e5e2e1] transition-all cursor-pointer">
                  Filter Pill Tag
                </button>

                <button className="w-11 h-11 rounded-full bg-[#ea7c1b] text-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer">
                  <Coffee className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Specialized Widget: Roast Spectrum Meter */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-[#d36b00]" />
                <h3 className="font-serif text-2xl font-bold text-[#2c1810]">
                  Thước Đo Quang Phổ Rang (Roast Spectrum Meter)
                </h3>
              </div>
              <p className="text-xs text-[#837469] mb-6">
                Linh kiện độc quyền thể hiện 5 mức rang mộc của Lumina trên máy rang Probat nhiệt độ kiểm soát.
              </p>

              <div className="p-6 bg-[#fcf9f8] rounded-xl border border-[#e8dfd1]">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {roastLevels.map((lvl, index) => {
                    const isSelected = selectedRoast === index;
                    return (
                      <button
                        key={lvl.label}
                        onClick={() => setSelectedRoast(index)}
                        className={`h-12 rounded-lg transition-all flex flex-col items-center justify-center text-xs font-bold cursor-pointer ${
                          isSelected
                            ? 'bg-[#2c1810] text-white shadow-md scale-102 ring-2 ring-[#ea7c1b]'
                            : 'bg-[#e8dfd1] hover:bg-[#d5c3b6] text-[#51443a]'
                        }`}
                      >
                        <span>{lvl.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 bg-white rounded-lg border border-[#e8dfd1] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#d36b00] tracking-wider block">
                      MỨC RANG HIỆN TẠI: {roastLevels[selectedRoast].label.toUpperCase()}
                    </span>
                    <p className="text-xs text-[#2c1810] font-medium mt-0.5">
                      {roastLevels[selectedRoast].desc}
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-[#ea7c1b]/15 text-[#d36b00] font-bold text-xs rounded-full">
                    Profile #{selectedRoast + 1}
                  </div>
                </div>
              </div>
            </div>

            {/* Tasting Notes Chips & Badges */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-xs">
              <h3 className="font-serif text-2xl font-bold text-[#2c1810] mb-2">
                Huy Hiệu &amp; Thẻ Tasting Notes (Chips &amp; Badges)
              </h3>
              <p className="text-xs text-[#837469] mb-6">
                Thiết kế thẻ cảm quan mùi hương với viền tinh tế và màu caramel dịu nhẹ.
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-full bg-[#fdd5b8]/60 border border-[#c68e58]/50 text-xs font-semibold text-[#785b44] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d36b00]" />
                  Hoa nhài Cầu Đất
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#fdd5b8]/60 border border-[#c68e58]/50 text-xs font-semibold text-[#785b44] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d36b00]" />
                  Quả đào trắng giòn
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#fdd5b8]/60 border border-[#c68e58]/50 text-xs font-semibold text-[#785b44] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d36b00]" />
                  Mật ong rừng LangBiang
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#f0eded] border border-[#e8dfd1] text-xs font-semibold text-[#51443a]">
                  Độ cao: 1.650m
                </span>
                <span className="px-3 py-1 rounded bg-[#ea7c1b] text-white text-[10px] font-bold uppercase tracking-widest">
                  MẺ RANG GIỚI HẠN
                </span>
                <span className="px-3 py-1 rounded bg-[#835423] text-white text-[10px] font-bold uppercase tracking-widest">
                  SINGLE ORIGIN
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: ARCHITECTURE & SYSTEM DESIGN */}
        {activeSection === 'architecture' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-xs">
              <h3 className="font-serif text-2xl font-bold text-[#2c1810] mb-2">
                Kiến Trúc Kỹ Thuật Dự Án (System Design Architecture)
              </h3>
              <p className="text-xs text-[#837469] mb-8">
                Sơ đồ phân tầng từ Giao diện khách hàng (Client UI), Trạng thái (State Store), đến Dịch vụ chế biến và đặt hàng theo thời gian thực.
              </p>

              {/* Architecture Diagram Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* Layer 1: Client Presentation */}
                <div className="p-6 bg-[#fcf9f8] rounded-xl border border-[#e8dfd1] flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#c68e58]/20 text-[#835423] flex items-center justify-center mb-4 font-bold">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#835423] tracking-widest block mb-1">
                      TẦNG 01: PRESENTATION
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#2c1810] mb-2">
                      Client-side UI / SPA
                    </h4>
                    <ul className="text-xs text-[#51443a] space-y-2">
                      <li>• <strong>React 19 + TypeScript</strong>: Quản lý component phân rã mô-đun.</li>
                      <li>• <strong>Tailwind CSS v4</strong>: Theme Tokens màu hạt rang &amp; typography mượt mà.</li>
                      <li>• <strong>Lucide Icons</strong>: Bộ icon hình học vector tối giản.</li>
                      <li>• <strong>Responsive Viewports</strong>: Mobile (4 cols), Tablet (8 cols), Desktop 75rem (12 cols).</li>
                    </ul>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#e8dfd1] text-[11px] text-[#837469]">
                    Client Render &lt; 50ms cold start
                  </div>
                </div>

                {/* Layer 2: State & Business Logic */}
                <div className="p-6 bg-[#fcf9f8] rounded-xl border border-[#d36b00]/30 shadow-sm flex flex-col justify-between relative">
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-[#ea7c1b] text-white text-[9px] font-bold uppercase rounded-full">
                    Core Logic
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#ea7c1b]/20 text-[#d36b00] flex items-center justify-center mb-4 font-bold">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#d36b00] tracking-widest block mb-1">
                      TẦNG 02: APPLICATION STATE
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#2c1810] mb-2">
                      Cart &amp; Sensory Engine
                    </h4>
                    <ul className="text-xs text-[#51443a] space-y-2">
                      <li>• <strong>Cart Store</strong>: Quản lý giỏ hàng, độ ngọt, loại sữa, kích thước xay hạt.</li>
                      <li>• <strong>Flash Sale Engine</strong>: Đếm ngược thời gian thực mẻ rang Batch #402.</li>
                      <li>• <strong>Promotion Validator</strong>: Áp dụng voucher tự động (LUMINA20).</li>
                      <li>• <strong>LocalStorage Sync</strong>: Lưu trữ lựa chọn và giỏ hàng xuyên suốt phiên.</li>
                    </ul>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#e8dfd1] text-[11px] text-[#837469]">
                    Reactive State Hook Patterns
                  </div>
                </div>

                {/* Layer 3: Services & Data Persistence */}
                <div className="p-6 bg-[#fcf9f8] rounded-xl border border-[#e8dfd1] flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#2c1810]/15 text-[#2c1810] flex items-center justify-center mb-4 font-bold">
                      <Database className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#2c1810] tracking-widest block mb-1">
                      TẦNG 03: SERVICES &amp; ATELIERS
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#2c1810] mb-2">
                      Roastery Dispatch &amp; Lab
                    </h4>
                    <ul className="text-xs text-[#51443a] space-y-2">
                      <li>• <strong>Dispatch Routing</strong>: Tự động điều hướng đơn về xưởng Hà Nội hoặc Sài Gòn.</li>
                      <li>• <strong>Cupping Reservation</strong>: Quản lý lịch workshop thử nếm với Q-Grader.</li>
                      <li>• <strong>Probat Temperature Telemetry</strong>: Kiểm soát đường cong nhiệt hạt rang.</li>
                      <li>• <strong>SCA Cupping Standards</strong>: Điểm cảm quan lưu trữ có chứng nhận.</li>
                    </ul>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#e8dfd1] text-[11px] text-[#837469]">
                    SCA Standardized Scoring Model
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
