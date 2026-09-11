import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rate, App, Tooltip } from 'antd';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data/coffeeData';
import {
  ArrowLeft,
  Sparkles,
  Star,
  Share2,
  Heart,
  Check,
  Truck,
  ShieldCheck,
  Flame,
  Calendar,
  Award,
  Clock,
  Compass,
  Coffee,
  Scale,
  Repeat,
  Package,
  Plus,
  Minus,
  Info,
  ChevronRight,
  Droplets,
  Thermometer,
  Layers,
  ShoppingBag,
  Zap,
  CheckCircle2,
  MapPin,
  Mountain,
  Sliders,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  onBackToMenu: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
  onOpenQuickDelivery: () => void;
  onOpenCart: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBackToMenu,
  onSelectProduct,
  onAddToCart,
  onOpenQuickDelivery,
  onOpenCart,
}) => {
  const { message } = App.useApp();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'recipe' | 'origin' | 'reviews'>('profile');

  // Bean-specific states
  const isBean = product.isBeanProduct ?? product.category === 'single-origin';
  const [selectedWeight, setSelectedWeight] = useState<'250g' | '500g' | '1kg'>('250g');
  const [subscriptionOption, setSubscriptionOption] = useState<'none' | 'bi-weekly' | 'monthly'>('none');
  const [grindOption, setGrindOption] = useState<string>(
    isBean ? 'Nguyên hạt (Whole Bean)' : ''
  );

  // Drink-specific states
  const [sweetness, setSweetness] = useState<string>('Nguyên bản (Chuẩn Barista)');
  const [milkOption, setMilkOption] = useState<string>('Sữa tươi Đà Lạt thanh trùng');
  const [temperature, setTemperature] = useState<'Đá' | 'Nóng'>('Đá');

  // Reset local configuration on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);
    setSelectedWeight('250g');
    setSubscriptionOption('none');
    setGrindOption(
      (product.isBeanProduct ?? product.category === 'single-origin')
        ? 'Nguyên hạt (Whole Bean)'
        : ''
    );
    setSweetness('Nguyên bản (Chuẩn Barista)');
    setMilkOption('Sữa tươi Đà Lạt thanh trùng');
    setTemperature('Đá');
  }, [product.id]);

  // Price calculations
  const weightMultiplier = selectedWeight === '1kg' ? 3.6 : selectedWeight === '500g' ? 1.9 : 1;
  const baseCalculatedPrice = Math.round(product.price * (isBean ? weightMultiplier : 1));
  const isSubscribed = subscriptionOption !== 'none';
  const finalUnitPrice = isSubscribed
    ? Math.round(baseCalculatedPrice * 0.85) // 15% discount
    : baseCalculatedPrice;
  const totalPrice = finalUnitPrice * quantity;

  const grindOptionsList = [
    {
      label: 'Nguyên hạt (Whole Bean)',
      desc: 'Giữ trọn vẹn tinh dầu & nốt hương, tự xay tại nhà',
      icon: '🫘',
    },
    {
      label: 'Xay Pha Phin Việt Nam (Medium-Coarse)',
      desc: 'Chiết xuất đậm đà, tốc độ chảy 40-50 giọt/phút',
      icon: '☕',
    },
    {
      label: 'Xay Pha Giấy V60 / Pour-over (Medium)',
      desc: 'Làm nổi bật nốt hương hoa quả thanh sáng',
      icon: '⏳',
    },
    {
      label: 'Xay Máy Espresso (Fine)',
      desc: 'Cực mịn, áp suất 9 Bar tạo lớp Crema dày óng ả',
      icon: '⚡',
    },
    {
      label: 'Xay Cold Brew & French Press (Coarse)',
      desc: 'Xay thô ngâm ủ lạnh 18-24 tiếng mượt mà',
      icon: '🧊',
    },
  ];

  const handleAddToCart = () => {
    const item: CartItem = {
      product,
      quantity,
      unitPrice: finalUnitPrice,
      weightOption: isBean ? selectedWeight : undefined,
      subscriptionOption,
      grindOption: isBean ? grindOption : undefined,
      sweetness: !isBean && product.category !== 'gear' ? sweetness : undefined,
      milkOption: !isBean && product.category !== 'gear' ? milkOption : undefined,
      temperature: !isBean && product.category !== 'gear' ? temperature : undefined,
    };
    onAddToCart(item);
    message.success(`Đã thêm ${quantity}x ${product.name} vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    const item: CartItem = {
      product,
      quantity,
      unitPrice: finalUnitPrice,
      weightOption: isBean ? selectedWeight : undefined,
      subscriptionOption,
      grindOption: isBean ? grindOption : undefined,
      sweetness: !isBean && product.category !== 'gear' ? sweetness : undefined,
      milkOption: !isBean && product.category !== 'gear' ? milkOption : undefined,
      temperature: !isBean && product.category !== 'gear' ? temperature : undefined,
    };
    onAddToCart(item);
    onOpenQuickDelivery();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      message.success('Đã sao chép liên kết sản phẩm vào bộ nhớ tạm!');
    }
  };

  // Filter related products (same category or popular beans)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.category === 'single-origin')
  ).slice(0, 4);

  // Sensory attribute radar scores (derived or default specialty range)
  const sensoryProfile = {
    acidity: product.roastLevel === 'Light' ? 92 : product.roastLevel === 'Medium-Light' ? 85 : 70,
    sweetness: 88,
    body: product.roastLevel === 'Dark' || product.roastLevel === 'Medium-Dark' ? 95 : 82,
    aroma: 94,
    balance: 90,
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] pb-24 font-sans selection:bg-[#fdd5b8] selection:text-[#785b44]">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-white border-b border-stone-200/80 sticky top-16 sm:top-20 z-30 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToMenu}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-900 font-semibold text-xs sm:text-sm transition-colors cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-amber-100 flex items-center justify-center transition-colors">
              <ArrowLeft className="w-4 h-4 text-stone-700 group-hover:text-amber-900" />
            </div>
            <span>Quay lại Thực đơn</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs text-stone-400">
            <span className="hover:text-stone-700 cursor-pointer" onClick={onBackToMenu}>
              Trang chủ
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-stone-700 cursor-pointer" onClick={onBackToMenu}>
              Thực đơn
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-900 font-semibold">{product.categoryLabel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-stone-800 font-bold truncate max-w-[200px]">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip title="Yêu thích">
              <button
                type="button"
                onClick={() => {
                  setIsLiked(!isLiked);
                  message.info(isLiked ? 'Đã bỏ yêu thích' : 'Đã lưu vào danh sách yêu thích!');
                }}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                  isLiked
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-rose-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </Tooltip>
            <Tooltip title="Chia sẻ sản phẩm">
              <button
                type="button"
                onClick={handleShare}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Main Product Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Gallery & Badges (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-md group">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-80 sm:h-110 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Tags Floating */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-amber-800/90 backdrop-blur-md shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  {product.tag}
                </span>
                {product.scaScore && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-stone-950/85 backdrop-blur-md shadow-sm flex items-center gap-1.5 border border-amber-500/40">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    SCA {product.scaScore} ĐIỂM
                  </span>
                )}
              </div>

              {/* Roast level badge */}
              {product.roastLevel && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-stone-200/80 shadow-xs flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-700" />
                    <div>
                      <span className="text-stone-500 text-[10px] uppercase font-bold block">
                        Độ Rang Xưởng (Roast Profile)
                      </span>
                      <span className="font-bold text-stone-900">{product.roastLevel} Roast</span>
                    </div>
                  </div>
                  {product.altitude && (
                    <div className="text-right">
                      <span className="text-stone-500 text-[10px] uppercase font-bold block">
                        Độ Cao Canh Tác
                      </span>
                      <span className="font-bold text-stone-900">{product.altitude}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quality Seals & Guarantees */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-stone-900">Van Thụy Sĩ 1 Chiều</h6>
                  <p className="text-[11px] text-stone-500">Bảo quản khử khí WICOVALVE</p>
                </div>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-stone-900">100% Cà Phê Mộc</h6>
                  <p className="text-[11px] text-stone-500">Không hương liệu tẩm ướp</p>
                </div>
              </div>
            </div>

            {/* Fresh Roast Date Card (If bean) */}
            {isBean && (
              <div className="p-4 bg-gradient-to-br from-amber-950 to-stone-900 text-white rounded-2xl shadow-sm space-y-2 border border-amber-900/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Flame className="w-4 h-4 text-amber-400" />
                    Minh Bạch Mẻ Rang (Roast Batch)
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-200 border border-amber-400/30">
                    Tươi Mới Mỗi Ngày
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-xs text-stone-300">
                    <strong className="text-white">Ngày rang gần nhất:</strong>{' '}
                    {product.roastDate ?? '07:00 sáng Thứ Ba (Cách 2 ngày)'}
                  </p>
                  <p className="text-xs text-stone-300 mt-1">
                    <strong className="text-white">Cửa sổ Degas đỉnh cao:</strong>{' '}
                    {product.peakFlavorWindow ?? 'Ngày 7 – 28 sau khi rang (Hương thơm bộc lộ tròn trịa)'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Configuration, Purchasing & Pricing (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Reviews Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                  {product.categoryLabel}
                </span>
                {product.origin && (
                  <span className="text-xs text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {product.origin}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
                {product.name}
              </h1>

              {product.subname && (
                <p className="text-sm font-serif italic text-stone-500 mt-1">
                  {product.subname}
                </p>
              )}

              {/* Ratings and Reviews */}
              <div className="flex items-center gap-3 mt-3 pb-4 border-b border-stone-200">
                <div className="flex items-center gap-1.5">
                  <Rate disabled defaultValue={product.rating} allowHalf className="text-amber-600 text-sm" />
                  <span className="text-xs font-bold text-stone-900">{product.rating}</span>
                </div>
                <span className="text-stone-300">|</span>
                <span className="text-xs text-stone-500">
                  <strong>{product.reviewCount}</strong> đánh giá thực tế từ khách hàng
                </span>
                <span className="text-stone-300">|</span>
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Còn hàng tại Xưởng
                </span>
              </div>
            </div>

            {/* Price Showcase Card */}
            <div className="p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-2xl sm:text-3xl font-extrabold text-amber-900">
                    {finalUnitPrice.toLocaleString('vi-VN')}đ
                  </span>
                  {product.originalPrice && !isSubscribed && (
                    <span className="text-sm text-stone-400 line-through">
                      {(product.originalPrice * (isBean ? weightMultiplier : 1)).toLocaleString('vi-VN')}đ
                    </span>
                  )}
                  {isSubscribed && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Tiết kiệm 15% gói định kỳ
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  {isBean
                    ? `Giá cho quy cách túi ${selectedWeight} ${isSubscribed ? 'kèm ưu đãi giao định kỳ' : ''}`
                    : 'Đã bao gồm thuế GTGT & phí phục vụ chuẩn Barista'}
                </p>
              </div>

              {/* Free Shipping Badge */}
              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>
                  {isSubscribed || totalPrice >= 150000 ? 'Miễn phí giao hàng' : 'Giao nhanh 20-30 phút'}
                </span>
              </div>
            </div>

            {/* Short sensory summary description */}
            <p className="text-sm text-stone-700 leading-relaxed">
              {product.description}
            </p>

            {/* Tasting notes tags */}
            {product.tastingNotes && product.tastingNotes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Nốt Hương Vị Tự Nhiên (Tasting Notes):
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.tastingNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-amber-50/80 border border-amber-200/80 text-amber-900 font-medium text-xs flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-amber-700" />
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* BEAN CONFIGURATION: Weight & Subscription */}
            {isBean && (
              <div className="space-y-5 pt-2 border-t border-stone-200">
                {/* 1. Weight Selection */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-amber-800" />
                      1. Chọn Quy Cách Trọng Lượng:
                    </label>
                    <span className="text-[11px] text-stone-500">Đóng gói van một chiều</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { weight: '250g', label: '250g Chuẩn', desc: '15 – 18 ly tại nhà' },
                      { weight: '500g', label: '500g Tiết kiệm', desc: 'Tiết kiệm 5% chi phí' },
                      { weight: '1kg', label: '1kg Xưởng Rang', desc: 'Tiết kiệm 10% giá hạt' },
                    ].map((w) => (
                      <button
                        key={w.weight}
                        type="button"
                        onClick={() => setSelectedWeight(w.weight as '250g' | '500g' | '1kg')}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedWeight === w.weight
                            ? 'bg-amber-900 text-white border-amber-900 shadow-sm'
                            : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200'
                        }`}
                      >
                        <span className="font-bold text-xs block">{w.label}</span>
                        <span
                          className={`text-[10px] mt-0.5 block ${
                            selectedWeight === w.weight ? 'text-amber-200' : 'text-stone-500'
                          }`}
                        >
                          {w.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Coffee Subscription Plan (Gói định kỳ) */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Repeat className="w-4 h-4 text-amber-800" />
                      2. Gói Giao Hạt Tươi Định Kỳ:
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      GIẢM 15% + FREESHIP
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'none', label: 'Mua 1 Lần', note: 'Đơn hàng thông thường' },
                      { id: 'bi-weekly', label: 'Mỗi 2 Tuần', note: 'Giảm 15% trọn đời' },
                      { id: 'monthly', label: 'Mỗi Tháng', note: 'Giảm 15% trọn đời' },
                    ].map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setSubscriptionOption(sub.id as 'none' | 'bi-weekly' | 'monthly')}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          subscriptionOption === sub.id
                            ? 'bg-amber-900 text-white border-amber-900 shadow-2xs font-semibold'
                            : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200 text-xs'
                        }`}
                      >
                        <span className="font-bold text-xs block">{sub.label}</span>
                        <span
                          className={`text-[10px] block mt-0.5 ${
                            subscriptionOption === sub.id ? 'text-amber-200' : 'text-stone-500'
                          }`}
                        >
                          {sub.note}
                        </span>
                      </button>
                    ))}
                  </div>
                  {isSubscribed && (
                    <p className="text-[11px] text-amber-950 leading-normal pt-1">
                      ✓ Cà phê mới rang sẽ được gửi tới bạn tự động theo chu kỳ. Bạn có thể tạm dừng hoặc hủy bất kỳ lúc nào trên tài khoản.
                    </p>
                  )}
                </div>

                {/* 3. Grind Size Selection */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Coffee className="w-4 h-4 text-amber-800" />
                      3. Chọn Cỡ Xay Phù Hợp Dụng Cụ:
                    </label>
                    <span className="text-[11px] text-stone-500">Xay bằng máy Mazzer Kony</span>
                  </div>

                  <div className="space-y-1.5">
                    {grindOptionsList.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setGrindOption(item.label)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          grindOption === item.label
                            ? 'bg-amber-50/80 border-amber-800/80 shadow-2xs'
                            : 'bg-white hover:bg-stone-50 border-stone-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-base">{item.icon}</span>
                          <div>
                            <span className="font-bold text-xs text-stone-900 block">
                              {item.label}
                            </span>
                            <span className="text-[11px] text-stone-500 block">
                              {item.desc}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            grindOption === item.label
                              ? 'border-amber-800 bg-amber-800 text-white'
                              : 'border-stone-300 bg-stone-100'
                          }`}
                        >
                          {grindOption === item.label && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DRINK CONFIGURATION: Sweetness & Milk & Temp (if drink) */}
            {!isBean && product.category !== 'gear' && (
              <div className="space-y-4 pt-2 border-t border-stone-200">
                {/* Sweetness */}
                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
                    Mức Độ Ngọt / Đường:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      'Không đường (0%)',
                      'Ít ngọt (30%)',
                      'Nguyên bản (Chuẩn Barista)',
                      'Đậm đà (100%)',
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSweetness(opt)}
                        className={`p-2 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                          sweetness === opt
                            ? 'bg-amber-900 text-white border-amber-900 font-bold'
                            : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Milk Option (if applicable) */}
                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
                    Lựa Chọn Loại Sữa:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      'Sữa tươi Đà Lạt thanh trùng',
                      'Sữa Yến Mạch Oatly Barista',
                      'Sữa Hạnh Nhân hữu cơ',
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setMilkOption(opt)}
                        className={`p-2.5 rounded-lg border text-xs text-left transition-all cursor-pointer ${
                          milkOption === opt
                            ? 'bg-amber-900 text-white border-amber-900 font-bold'
                            : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Temperature */}
                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
                    Nhiệt Độ Thưởng Thức:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Đá (Chườm lạnh bảo ôn)', 'Nóng (Giữ ấm tiêu chuẩn)'].map((temp) => (
                      <button
                        key={temp}
                        type="button"
                        onClick={() => setTemperature(temp.includes('Đá') ? 'Đá' : 'Nóng')}
                        className={`p-2.5 rounded-lg border text-xs text-center font-bold transition-all cursor-pointer ${
                          (temperature === 'Đá' && temp.includes('Đá')) ||
                          (temperature === 'Nóng' && temp.includes('Nóng'))
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        {temp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ACTION BAR: Quantity & Buy Buttons */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-stone-300 rounded-xl bg-white p-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-stone-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm Vào Giỏ ({totalPrice.toLocaleString('vi-VN')}đ)</span>
                </button>

                {/* Buy Now / Quick Delivery */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="py-3 px-4 sm:px-6 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all active:scale-[0.99]"
                >
                  <Zap className="w-4 h-4" />
                  <span>Giao Tốc Hành</span>
                </button>
              </div>

              {/* Free delivery alert */}
              <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-1">
                <Truck className="w-3.5 h-3.5 text-amber-800" />
                <span>Miễn phí giao hàng cho đơn từ 150.000đ hoặc sản phẩm đăng ký định kỳ.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive Section Tabs: Hồ Sơ Hương Vị, Công Thức Pha Chế, Nông Trại, Đánh Giá */}
        <div className="mt-16 pt-10 border-t border-stone-200">
          <div className="flex border-b border-stone-200 overflow-x-auto no-scrollbar gap-2 sm:gap-6">
            {[
              { id: 'profile', label: 'Hồ Sơ Hương Vị & Thử Nếm', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'recipe', label: 'Công Thức Pha Chế Barista', icon: <Coffee className="w-4 h-4" /> },
              { id: 'origin', label: 'Vùng Trồng & Nông Hộ', icon: <Mountain className="w-4 h-4" /> },
              { id: 'reviews', label: `Đánh Giá Từ Tín Đồ (${product.reviewCount})`, icon: <Star className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 pt-1 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'border-amber-900 text-amber-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab 1: Profile */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
                <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-800" />
                  Thước Đo Cảm Nhận Giác Quan (Sensory Radar)
                </h4>
                <div className="space-y-3.5">
                  {[
                    { label: 'Độ chua sáng thanh (Acidity)', value: sensoryProfile.acidity, note: 'Trái cây nhiệt đới' },
                    { label: 'Hậu vị ngọt ngào (Sweetness)', value: sensoryProfile.sweetness, note: 'Mật ong & Caramel' },
                    { label: 'Độ đầm đậm đà (Body)', value: sensoryProfile.body, note: 'Mịn mượt như lụa' },
                    { label: 'Hương thơm quyến rũ (Aroma)', value: sensoryProfile.aroma, note: 'Hoa nhài & cam chanh' },
                    { label: 'Độ cân bằng tổng thể (Balance)', value: sensoryProfile.balance, note: 'Chuẩn Specialty SCA' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs font-semibold mb-1 text-stone-800">
                        <span>{item.label}</span>
                        <span className="text-amber-900 font-bold">{item.value}%</span>
                      </div>
                      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-800 rounded-full transition-all duration-700"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-800" />
                  Đặc Điểm Nhân Xanh & Quy Trình Rang
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="text-stone-400 text-[10px] uppercase font-bold block">Vùng Trồng</span>
                    <span className="font-bold text-stone-900 mt-0.5 block">{product.origin ?? 'Cầu Đất, Đà Lạt'}</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="text-stone-400 text-[10px] uppercase font-bold block">Độ Cao</span>
                    <span className="font-bold text-stone-900 mt-0.5 block">{product.altitude ?? '1.650m'}</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="text-stone-400 text-[10px] uppercase font-bold block">Sơ Chế</span>
                    <span className="font-bold text-stone-900 mt-0.5 block">{product.process ?? 'Washed Processing'}</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="text-stone-400 text-[10px] uppercase font-bold block">Mức Rang</span>
                    <span className="font-bold text-stone-900 mt-0.5 block">{product.roastLevel ?? 'Medium'} Roast</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-2">
                  Mỗi mẻ cà phê được kiểm soát profile nhiệt độ bằng máy rang Giesen W6A hiện đại, đảm bảo lưu giữ tối đa axit hữu cơ tự nhiên và đường fructose tự nhiên của quả cà phê chín mọng.
                </p>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Brewing Recipe */}
          {activeTab === 'recipe' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
                  <Scale className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-stone-500 uppercase block">Tỷ Lệ Chiết Xuất</span>
                <span className="text-xl font-extrabold text-stone-900 block font-serif">1 : 15 (Brew Ratio)</span>
                <p className="text-xs text-stone-600">20g cà phê nguyên chất chiết xuất 300ml nước</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
                  <Thermometer className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-stone-500 uppercase block">Nhiệt Độ Nước</span>
                <span className="text-xl font-extrabold text-stone-900 block font-serif">92°C – 94°C</span>
                <p className="text-xs text-stone-600">Nước lọc tinh khiết TDS 80-120 ppm</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-stone-500 uppercase block">Thời Gian Chiết Xuất</span>
                <span className="text-xl font-extrabold text-stone-900 block font-serif">2:30 – 3:00 Phút</span>
                <p className="text-xs text-stone-600">Bao gồm 30-45 giây Blooming nở bọt khí</p>
              </div>

              {/* Step-by-step extraction guide */}
              <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                <h5 className="font-serif text-base font-bold text-stone-900">
                  3 Bước Pha Pour-Over V60 Đỉnh Cao:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-stone-50 rounded-xl space-y-1">
                    <span className="w-6 h-6 rounded-full bg-amber-900 text-white font-bold inline-flex items-center justify-center mb-1">
                      1
                    </span>
                    <h6 className="font-bold text-stone-900">Tráng Giấy &amp; Nở Hạt (Bloom)</h6>
                    <p className="text-stone-600">Rót 50g nước làm ướt đều bột, đợi 40 giây để khí CO2 thoát hết.</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl space-y-1">
                    <span className="w-6 h-6 rounded-full bg-amber-900 text-white font-bold inline-flex items-center justify-center mb-1">
                      2
                    </span>
                    <h6 className="font-bold text-stone-900">Rót Dòng Thứ Nhất</h6>
                    <p className="text-stone-600">Rót dòng xoắn ốc từ trong ra ngoài đến mức 180g ở phút 1:15.</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl space-y-1">
                    <span className="w-6 h-6 rounded-full bg-amber-900 text-white font-bold inline-flex items-center justify-center mb-1">
                      3
                    </span>
                    <h6 className="font-bold text-stone-900">Hoàn Thiện Dòng Chảy</h6>
                    <p className="text-stone-600">Rót chậm đến mức 300g, để cà phê nhỏ giọt tự nhiên kết thúc ở 2:45.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Origin Story */}
          {activeTab === 'origin' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6"
            >
              <div className="max-w-3xl space-y-3">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  Hành Trình Hạt Cà Phê Từ Vùng Cao Nguyên Sương Mù
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Tại độ cao trên 1.600m thuộc Cầu Đất (Lâm Đồng), biên độ nhiệt ngày và đêm chênh lệch tới 15°C giúp trái cà phê tích tụ hàm lượng đường tự nhiên vượt trội. Từng chùm quả được nông hộ đồng bào bản địa hái tuyển lựa thủ công 100% khi đạt độ chín đỏ mọng hoàn hảo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-stone-50 rounded-xl">
                  <h6 className="font-bold text-stone-900 text-sm mb-1">Hợp Tác Công Bằng</h6>
                  <p className="text-xs text-stone-600">Lumina thu mua trực tiếp cao hơn 35% so với giá thị trường hàng hóa để hỗ trợ nông dân gìn giữ giống thuần.</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-xl">
                  <h6 className="font-bold text-stone-900 text-sm mb-1">Lên Men Chậm Tự Nhiên</h6>
                  <p className="text-xs text-stone-600">Ủ kín yếm khí 72 giờ kích hoạt hương hoa quả nhiệt đới bung tỏa tự nhiên.</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-xl">
                  <h6 className="font-bold text-stone-900 text-sm mb-1">Phơi Giàn Châu Phi</h6>
                  <p className="text-xs text-stone-600">Phơi trên giàn thông thoáng cách mặt đất 80cm trong nhà kính trong suốt 25 ngày.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 4: Verified Reviews */}
          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 space-y-4"
            >
              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-3xl font-extrabold text-stone-900">
                      {product.rating}
                    </span>
                    <Rate disabled defaultValue={product.rating} allowHalf className="text-amber-600 text-sm" />
                  </div>
                  <p className="text-xs text-stone-500 mt-1">Dựa trên {product.reviewCount} đánh giá xác thực</p>
                </div>
                <div className="text-xs text-stone-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <span>5 sao</span>
                    <div className="w-32 bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-800 h-full w-[90%]" />
                    </div>
                    <span>90%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>4 sao</span>
                    <div className="w-32 bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-800 h-full w-[10%]" />
                    </div>
                    <span>10%</span>
                  </div>
                </div>
              </div>

              {/* Sample verified reviews */}
              <div className="space-y-3">
                {[
                  {
                    name: 'Trần Hoàng Long',
                    role: 'Khách hàng thân thiết',
                    rating: 5,
                    date: '3 ngày trước',
                    comment: 'Hạt rang đều màu cực kỳ đẹp. Pha V60 ra nốt hương cam bergamot và đào rõ rệt, hậu ngọt kéo dài. Mẻ rang mới chỉ cách ngày nhận 3 hôm, đóng gói van xịn xò!',
                    variant: 'Túi 250g • Xay V60',
                  },
                  {
                    name: 'Lê Minh Quân',
                    role: 'Tín đồ Espresso',
                    rating: 5,
                    date: '1 tuần trước',
                    comment: 'Đăng ký gói định kỳ 2 tuần 1 lần rất tiện, không bao giờ lo hết hạt. Crema pha máy dày và mịn, hương thơm tràn ngập gian bếp.',
                    variant: 'Túi 500g • Nguyên hạt',
                  },
                  {
                    name: 'Nguyễn Thảo Uyên',
                    role: 'Barista tại nhà',
                    rating: 5,
                    date: '2 tuần trước',
                    comment: 'Mỗi lần mua cà phê ở Lumina đều rất an tâm vì độ tươi và thông tin minh bạch. Sẽ tiếp tục ủng hộ!',
                    variant: 'Túi 250g • Nguyên hạt',
                  },
                ].map((rev, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">{rev.name}</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
                          ✓ Đã mua hàng
                        </span>
                        <span className="text-[11px] text-stone-400">({rev.variant})</span>
                      </div>
                      <span className="text-stone-400 text-[11px]">{rev.date}</span>
                    </div>
                    <Rate disabled defaultValue={rev.rating} className="text-amber-600 text-xs" />
                    <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                  Cùng Bộ Sưu Tập
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  Gợi Ý Khám Phá Thêm
                </h3>
              </div>
              <button
                type="button"
                onClick={onBackToMenu}
                className="text-xs font-bold text-stone-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
              >
                <span>Xem tất cả thực đơn</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel)}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-amber-700/50 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                    <img
                      src={rel.imageUrl}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs">
                      {rel.tag}
                    </span>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-sans text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-amber-900 transition-colors">
                        {rel.name}
                      </h5>
                      <span className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                        {rel.brewInfo}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      <span className="text-xs font-bold text-amber-900">
                        {rel.price.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-[11px] font-semibold text-stone-600 group-hover:text-amber-800 flex items-center gap-0.5">
                        Xem chi tiết →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
