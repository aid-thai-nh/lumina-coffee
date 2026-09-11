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
  Globe,
  Search,
  Code,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  RefreshCw,
  Zap,
} from 'lucide-react';
import {
  Button,
  Badge,
  Card,
  StatCard,
  EmptyState,
  Skeleton,
  SearchInput,
  Input,
  ProductCardSkeleton,
  ProductEmptyState,
  ProductEmptyVariant,
} from '../core/components';
import { useI18n } from '../core/i18n/I18nContext';
import { useToast } from '../core/hooks/useNotification';
import { FlagIcon } from '../core/i18n/FlagIcons';
import { LanguageSwitcher } from '../core/i18n/LanguageSwitcher';
import { projectConfig } from '../config/project.config';

interface SystemDesignViewProps {
  onCopyNotice: (text: string) => void;
  onClose?: () => void;
}

export const SystemDesignView: React.FC<SystemDesignViewProps> = ({
  onCopyNotice,
  onClose,
}) => {
  const [activeSection, setActiveSection] = useState<'foundations' | 'typography' | 'components' | 'architecture'>('foundations');
  const [selectedRoast, setSelectedRoast] = useState<number>(2); // 0 to 4
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [demoSearch, setDemoSearch] = useState('');
  const [emptyStateTab, setEmptyStateTab] = useState<ProductEmptyVariant>('search-empty');
  const [isSkeletonPreviewLoading, setIsSkeletonPreviewLoading] = useState<boolean>(true);
  const toast = useToast();
  const { locale, setLocale, t } = useI18n();

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
            {/* Core Component Library Intro */}
            <div className="bg-gradient-to-r from-[#201206] to-[#2c1810] text-white rounded-2xl p-6 sm:p-8 border border-[#c68e58]/30 shadow-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea7c1b]/25 text-[#ffdcc3] text-xs font-bold uppercase mb-3">
                <Component className="w-4 h-4 text-[#ea7c1b]" />
                <span>Micro-UI Framework Primitives</span>
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">Thư Viện UI Component Cốt Lõi (Core Components)</h3>
              <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
                Các linh kiện được chuẩn hóa theo Design Tokens, dễ dàng tùy biến giao diện, kết hợp sức mạnh thẩm mỹ của Tailwind CSS và tính tin cậy của Ant Design.
              </p>
            </div>

            {/* Core Buttons Showcase */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#2c1810]">Core Button Primitive</h4>
                  <p className="text-xs text-[#837469]">5 variants, 3 kích thước, hỗ trợ icon và loading state</p>
                </div>
                <Badge variant="brand">src/core/components/Button.tsx</Badge>
              </div>

              <div className="p-6 bg-[#faf8f5] rounded-xl border border-[#e8dfd1] space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="md">Primary Button</Button>
                  <Button variant="secondary" size="md">Secondary Button</Button>
                  <Button variant="outline" size="md">Outline Button</Button>
                  <Button variant="ghost" size="md">Ghost Button</Button>
                  <Button variant="danger" size="md">Danger Button</Button>
                  <Button variant="primary" size="md" isLoading>Loading State</Button>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#e8dfd1]">
                  <Button variant="primary" size="sm" icon={<Coffee className="w-3.5 h-3.5" />}>Small (sm)</Button>
                  <Button variant="primary" size="md" icon={<Coffee className="w-4 h-4" />}>Medium (md)</Button>
                  <Button variant="primary" size="lg" icon={<Coffee className="w-5 h-5" />}>Large (lg)</Button>
                </div>
              </div>
            </div>

            {/* Core Badges & Status */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#2c1810]">Core Badges &amp; Status Indicators</h4>
                  <p className="text-xs text-[#837469]">Nhãn trạng thái trực quan với dot indicator</p>
                </div>
                <Badge variant="brand">src/core/components/Badge.tsx</Badge>
              </div>

              <div className="p-6 bg-[#faf8f5] rounded-xl border border-[#e8dfd1] flex flex-wrap items-center gap-3">
                <Badge variant="brand" dot>Brand Coffee</Badge>
                <Badge variant="success" dot>Giao nhanh 30p</Badge>
                <Badge variant="warning" dot>Sắp hết hạt</Badge>
                <Badge variant="error" dot>Tạm ngưng nhận đơn</Badge>
                <Badge variant="info" dot>Workshop tháng 9</Badge>
                <Badge variant="neutral">Khách vãng lai</Badge>
              </div>
            </div>

            {/* Core Inputs & Debounced Search */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#2c1810]">Core Form Controls &amp; Search</h4>
                  <p className="text-xs text-[#837469]">Tích hợp debounce, icon prefix/suffix và kiểm tra lỗi</p>
                </div>
                <Badge variant="brand">src/core/components/SearchInput.tsx</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-[#faf8f5] rounded-xl border border-[#e8dfd1]">
                <div>
                  <label className="text-xs font-semibold text-[#51443a] block mb-1.5">
                    Thử nghiệm Live Search Input (Debounce 300ms):
                  </label>
                  <SearchInput
                    placeholder="Nhập thử từ khóa tìm kiếm..."
                    value={demoSearch}
                    onSearch={(val) => setDemoSearch(val)}
                  />
                  <div className="mt-2 text-[11px] text-[#837469] font-mono">
                    Kết quả nhận tức thì: <span className="font-bold text-[#d36b00]">"{demoSearch}"</span>
                  </div>
                </div>

                <div>
                  <Input
                    label="Họ tên khách hàng (Core Input)"
                    placeholder="Nguyễn Văn A"
                    helperText="Tên trên thẻ hội viên Lumina Club"
                  />
                </div>
              </div>
            </div>

            {/* Core StatCard Showcase */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#2c1810]">Core Stat Cards &amp; Metrics</h4>
                  <p className="text-xs text-[#837469]">Thẻ chỉ số hiệu năng và KPI bán hàng</p>
                </div>
                <Badge variant="brand">src/core/components/StatCard.tsx</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  title="Đơn Giao Hôm Nay"
                  value="142 đơn"
                  subtitle="Tỉ lệ đúng hẹn 98.4%"
                  icon={<Coffee className="w-4 h-4" />}
                  trend={{ value: 12.5, isPositive: true, label: 'so với hôm qua' }}
                />
                <StatCard
                  title="Điểm Cupping SCA TB"
                  value="87.5 / 100"
                  subtitle="Mẻ Cầu Đất Typica #402"
                  icon={<Sparkles className="w-4 h-4" />}
                  trend={{ value: 2.1, isPositive: true }}
                />
                <StatCard
                  title="Học Viên Workshop"
                  value="28 chỗ"
                  subtitle="Đã kín 92% suất tháng này"
                  icon={<Flame className="w-4 h-4" />}
                  trend={{ value: 4.8, isPositive: true }}
                />
              </div>
            </div>

            {/* Core Empty State & Skeleton */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#2c1810]">Core Empty State &amp; Skeleton Loader</h4>
                  <p className="text-xs text-[#837469]">Trạng thái tải dữ liệu và danh sách trống</p>
                </div>
                <Badge variant="brand">src/core/components/EmptyState.tsx</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#faf8f5] rounded-xl border border-[#e8dfd1]">
                <EmptyState
                  title="Chưa có món nào trong giỏ"
                  description="Khám phá ngay các dòng hạt cà phê đặc sản và cold brew để thêm vào đơn hàng."
                  actionText="Xem Thực Đơn Ngay"
                  onAction={() => onCopyNotice('Chuyển hướng đến Menu')}
                />

                <div className="bg-white p-6 rounded-2xl border border-[#e8dfd1] space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton variant="circular" width={48} height={48} />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </div>
                  </div>
                  <Skeleton variant="rectangular" height={90} />
                  <Skeleton variant="text" width="80%" />
                </div>
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

            {/* API STATES & FEEDBACK SYSTEM: SKELETON, EMPTY, ERROR, TOAST NOTIFICATION */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-xs space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-[#ea7c1b]" />
                  <h3 className="font-serif text-2xl font-bold text-[#2c1810]">
                    Hệ Thống Phản Hồi API &amp; Trạng Thái Tương Tác
                  </h3>
                </div>
                <p className="text-xs text-[#837469]">
                  Chuẩn hóa toàn diện 3 khía cạnh: Skeleton Loading đồng bộ layout, 4 biến thể Empty State, và hệ thống Thông báo (Toast Notifications) độc quyền.
                </p>
              </div>

              {/* Subsection 1: Synchronized Skeleton Loading */}
              <div className="p-6 bg-[#fcf9f8] rounded-2xl border border-[#e8dfd1]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#d36b00] tracking-wider block">
                      MODULE 01 • LOADING STATE
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#2c1810]">
                      Product Card Skeleton với Hiệu Ứng Ánh Sáng (Shimmer)
                    </h4>
                    <p className="text-xs text-[#837469]">
                      Đồng bộ 100% về kích thước khung ảnh (4:3), badge, tiêu đề 2 dòng, nốt hương và giá tiền với thẻ sản phẩm thật.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSkeletonPreviewLoading(!isSkeletonPreviewLoading)}
                    className="px-4 py-2 bg-[#2c1810] text-[#ffdcc3] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSkeletonPreviewLoading ? 'animate-spin' : ''}`} />
                    <span>{isSkeletonPreviewLoading ? 'Đang bật Skeleton' : 'Bật lại Skeleton'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  {/* Skeleton Card Preview */}
                  <div>
                    <span className="text-[11px] font-bold text-[#835423] block mb-2 uppercase">
                      1. Giao diện Skeleton Loading:
                    </span>
                    <ProductCardSkeleton />
                  </div>

                  {/* Architecture Specs */}
                  <div className="bg-white p-5 rounded-2xl border border-[#e8dfd1] flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#2c1810] block mb-3 uppercase tracking-wider">
                        Thông Số Kỹ Thuật Skeleton:
                      </span>
                      <ul className="text-xs text-[#51443a] space-y-2.5">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span><strong>Khối hình ảnh:</strong> Tỉ lệ 4:3 (aspect-[4/3]), bo góc rounded-xl, tích hợp sẵn placeholder badge.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span><strong>Hiệu ứng Shimmer:</strong> Gradient trôi 1.8s ánh sáng kem ấm, không gây chói mắt.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span><strong>Không giật layout (Zero CLS):</strong> Chiều cao thẻ skeleton tương đương thẻ thật 100%.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#f0eded] text-[11px] text-[#837469]">
                      Component: <code>&lt;ProductCardSkeleton /&gt;</code> &amp; <code>&lt;ProductSkeletonGrid count={'{6}'} /&gt;</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subsection 2: 4 Empty State Scenarios */}
              <div className="p-6 bg-[#fcf9f8] rounded-2xl border border-[#e8dfd1]">
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-[#d36b00] tracking-wider block">
                    MODULE 02 • ZERO DATA &amp; ERROR STATES
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#2c1810] mb-1">
                    4 Kịch Bản Rỗng Dữ Liệu &amp; Lỗi Máy Chủ
                  </h4>
                  <p className="text-xs text-[#837469]">
                    Xử lý tinh tế hành vi người dùng khi không tìm thấy món, bộ lọc không trùng khớp, hoặc API phản hồi lỗi.
                  </p>
                </div>

                {/* Tabs to switch Empty State variants */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { id: 'search-empty', label: '1. Tìm kiếm không ra (Search)' },
                    { id: 'filter-empty', label: '2. Bộ lọc không khớp (Filter)' },
                    { id: 'catalog-empty', label: '3. Danh mục rỗng (Catalog)' },
                    { id: 'error', label: '4. Lỗi kết nối API (Error 500)' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setEmptyStateTab(tab.id as ProductEmptyVariant)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        emptyStateTab === tab.id
                          ? 'bg-[#2c1810] text-white shadow-xs'
                          : 'bg-white hover:bg-[#efe8de] text-[#51443a] border border-[#e8dfd1]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Live Preview of Selected Empty State */}
                <div className="bg-white rounded-2xl border border-[#e8dfd1] p-4 sm:p-6 shadow-xs">
                  <ProductEmptyState
                    variant={emptyStateTab}
                    searchQuery={emptyStateTab === 'search-empty' ? 'Arabica Geisha Cầu Đất #999' : undefined}
                    onClearSearch={() => toast.info('Đã xóa từ khóa tìm kiếm')}
                    onResetFilters={() => toast.success('Đã đặt lại toàn bộ bộ lọc')}
                    onRetry={() => toast.success('Đang gửi lại yêu cầu API...')}
                    onSuggestionClick={(kw) => toast.info(`Đang áp dụng gợi ý: "${kw}"`)}
                  />
                </div>
              </div>

              {/* Subsection 3: Unified Notification Toast System */}
              <div className="p-6 bg-[#fcf9f8] rounded-2xl border border-[#e8dfd1]">
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-[#d36b00] tracking-wider block">
                    MODULE 03 • NOTIFICATION &amp; TOAST MESSAGES
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#2c1810] mb-1">
                    Hệ Thống Thông Báo Nhận Diện Thương Hiệu (4 Biến Thể)
                  </h4>
                  <p className="text-xs text-[#837469]">
                    Toast nổi ở góc phải màn hình, thiết kế cao cấp với icon đặc trưng, âm sắc espresso và tự động đóng sau 3.5s.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {/* Success Toast Trigger */}
                  <div className="bg-white p-4 rounded-xl border border-emerald-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Success Toast</span>
                      </div>
                      <p className="text-[11px] text-[#837469] mb-3">
                        Báo thêm giỏ hàng, hoàn tất thanh toán hoặc lưu cấu hình thành công.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        toast.success('Đã thêm Arabica Cầu Đất vào giỏ hàng thành công!', {
                          title: 'Thành công',
                        })
                      }
                      className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                    >
                      Bắn Toast Success
                    </button>
                  </div>

                  {/* Failed / Error Toast Trigger */}
                  <div className="bg-white p-4 rounded-xl border border-rose-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-rose-800 font-bold text-xs">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Failed / Error</span>
                      </div>
                      <p className="text-[11px] text-[#837469] mb-3">
                        Báo lỗi API mạng, số dư không đủ hoặc thao tác máy chủ thất bại.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        toast.error('Máy chủ phản hồi mã HTTP 500: Kết nối API quá thời gian.', {
                          title: 'Lỗi hệ thống',
                        })
                      }
                      className="w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                    >
                      Bắn Toast Failed
                    </button>
                  </div>

                  {/* Warning Toast Trigger */}
                  <div className="bg-white p-4 rounded-xl border border-amber-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-amber-800 font-bold text-xs">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Warning Toast</span>
                      </div>
                      <p className="text-[11px] text-[#837469] mb-3">
                        Báo tồn kho sắp hết, định dạng input cần kiểm tra hoặc cảnh báo phiên.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        toast.warning('Mẻ rang Typica Anaerobic của tuần này chỉ còn lại 3 gói!', {
                          title: 'Cảnh báo kho',
                        })
                      }
                      className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                    >
                      Bắn Toast Warning
                    </button>
                  </div>

                  {/* Info Toast Trigger */}
                  <div className="bg-white p-4 rounded-xl border border-[#e8dfd1] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-[#2c1810] font-bold text-xs">
                        <Info className="w-4 h-4 text-[#ea7c1b]" />
                        <span>Info Toast</span>
                      </div>
                      <p className="text-[11px] text-[#837469] mb-3">
                        Báo trạng thái đơn hàng, thông tin mẻ rang mới hoặc bản tin cập nhật.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        toast.info('Barista Lumina đang hoàn tất đóng gói đơn hàng của bạn.', {
                          title: 'Thông tin đơn',
                        })
                      }
                      className="w-full py-1.5 bg-[#2c1810] hover:bg-[#422518] text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                    >
                      Bắn Toast Info
                    </button>
                  </div>
                </div>
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

              {/* Deep Dive Architecture: i18n & SEO Engine */}
              <div className="mt-8 pt-8 border-t border-[#e8dfd1] grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* i18n Specification */}
                <div className="p-6 bg-[#faf8f5] rounded-2xl border border-[#e8dfd1]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#835423]" />
                      <h4 className="font-serif text-lg font-bold text-[#2c1810]">Hệ Thống Đa Ngôn Ngữ (i18n Engine)</h4>
                    </div>
                    <Badge variant="brand">VI / EN</Badge>
                  </div>
                  <p className="text-xs text-[#51443a] leading-relaxed mb-4">
                    Kiến trúc từ điển đa tầng (nested dictionary keys) với tính năng nội suy tham số <code>t('key', &#123; name &#125;)</code>, đồng bộ thuộc tính <code>&lt;html lang=""&gt;</code> và ghi nhớ phiên trong <code>localStorage</code>.
                  </p>
                  <div className="p-3.5 bg-white rounded-xl border border-[#e8dfd1] text-xs font-mono text-[#2c1810] space-y-1.5 mb-3">
                    <div><span className="text-[#837469]">Locale hiện tại:</span> <span className="text-[#ea7c1b] font-bold uppercase">{locale}</span></div>
                    <div><span className="text-[#837469]">Khóa mẫu:</span> <span className="text-blue-700 font-semibold">t('nav.quickOrder')</span></div>
                    <div><span className="text-[#837469]">Kết quả:</span> <span className="text-emerald-700 font-semibold">"{t('nav.quickOrder')}"</span></div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant={locale === 'vi' ? 'primary' : 'outline'}
                        size="sm"
                        icon={<FlagIcon country="vi" size="xs" />}
                        onClick={() => setLocale('vi')}
                      >
                        Tiếng Việt
                      </Button>
                      <Button
                        variant={locale === 'en' ? 'primary' : 'outline'}
                        size="sm"
                        icon={<FlagIcon country="en" size="xs" />}
                        onClick={() => setLocale('en')}
                      >
                        English
                      </Button>
                    </div>
                    <div className="border-l border-[#e8dfd1] pl-3">
                      <LanguageSwitcher variant="dropdown" dropdownPlacement="top-left" />
                    </div>
                  </div>
                </div>

                {/* SEO & Meta Specification */}
                <div className="p-6 bg-[#faf8f5] rounded-2xl border border-[#e8dfd1]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-[#d36b00]" />
                      <h4 className="font-serif text-lg font-bold text-[#2c1810]">Chuẩn SEO &amp; Structured Data</h4>
                    </div>
                    <Badge variant="success">Schema.org JSON-LD</Badge>
                  </div>
                  <p className="text-xs text-[#51443a] leading-relaxed mb-4">
                    Tự động đồng bộ thẻ tiêu đề <code>document.title</code>, Canonical URLs, OpenGraph, Twitter Cards và bơm cấu trúc thực thể <code>@type: CoffeeShop</code> vào mã nguồn.
                  </p>
                  <div className="p-3.5 bg-white rounded-xl border border-[#e8dfd1] text-xs font-mono text-[#2c1810] space-y-1.5">
                    <div><span className="text-[#837469]">Title Template:</span> <span className="text-blue-700">{projectConfig.seo.titleTemplate}</span></div>
                    <div><span className="text-[#837469]">Canonical:</span> <span className="text-[#51443a] truncate block">{projectConfig.seo.canonicalUrl}</span></div>
                    <div><span className="text-[#837469]">Schema Type:</span> <span className="text-emerald-700 font-bold">CoffeeShop (LocalBusiness)</span></div>
                  </div>
                </div>
              </div>

              {/* Deep Dive: API Client & Custom Hooks */}
              <div className="mt-8 pt-8 border-t border-[#e8dfd1]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-[#835423]" />
                    <h4 className="font-serif text-xl font-bold text-[#2c1810]">Tầng Dịch Vụ API &amp; Danh Mục Custom Hooks</h4>
                  </div>
                  <span className="text-xs text-[#837469] font-mono">src/core/services &amp; src/core/hooks</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e8dfd1]">
                    <div className="font-mono text-xs font-bold text-[#835423] mb-1">apiClient</div>
                    <p className="text-[11px] text-[#51443a]">
                      HTTP Client wrapper với Bearer Auth, Request Timeout, Error boundary và Mock Adapter (chuyển live API trong 1 nốt nhạc).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e8dfd1]">
                    <div className="font-mono text-xs font-bold text-[#835423] mb-1">useApi&lt;T&gt;</div>
                    <p className="text-[11px] text-[#51443a]">
                      Quản lý async lifecycle (data, loading, error, execute, refetch) chuẩn mực.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e8dfd1]">
                    <div className="font-mono text-xs font-bold text-[#835423] mb-1">useDebounce</div>
                    <p className="text-[11px] text-[#51443a]">
                      Tối ưu hóa tìm kiếm trực tiếp, tránh re-render và nghẽn mạng khi gõ phím nhanh.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e8dfd1]">
                    <div className="font-mono text-xs font-bold text-[#835423] mb-1">useResponsive</div>
                    <p className="text-[11px] text-[#51443a]">
                      Nhận diện breakpoints <code>isMobile</code>, <code>isTablet</code>, <code>isDesktop</code> theo thời gian thực.
                    </p>
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
