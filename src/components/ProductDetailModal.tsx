import React, { useState } from 'react';
import { Rate } from 'antd';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from '../types';
import { X, Sparkles, Check, Flame, Calendar, PackageCheck, Repeat, ShieldCheck } from 'lucide-react';

export interface ProductDetailModalProps {
  product: Product | null;
  onClose?: () => void;
  onAddToCart: (item: CartItem) => void;
  isStandalone?: boolean;
}

export const ProductDetailModalContent: React.FC<ProductDetailModalProps> = ({
  product,
  onClose = () => {},
  onAddToCart,
  isStandalone = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [weightOption, setWeightOption] = useState<'250g' | '500g' | '1kg'>('250g');
  const [grindOption, setGrindOption] = useState('Nguyên hạt (Whole Bean - Tự xay)');
  const [subscriptionOption, setSubscriptionOption] = useState<'none' | 'bi-weekly' | 'monthly'>('none');
  const [sweetness, setSweetness] = useState('Nguyên bản (Chuẩn Barista)');
  const [milkOption, setMilkOption] = useState('Sữa tươi Đà Lạt thanh trùng');
  const [size, setSize] = useState<'Tiêu chuẩn (M)' | 'Lớn (L)'>('Tiêu chuẩn (M)');

  const isBean = Boolean(product?.isBeanProduct || product?.category === 'single-origin');

  const weightTiers: { id: '250g' | '500g' | '1kg'; label: string; desc: string; mult: number; discountBadge?: string }[] = [
    { id: '250g', label: '250g Chuẩn', desc: 'Khoảng 15-18 ly pour/phin', mult: 1.0 },
    { id: '500g', label: '500g Gia đình', desc: 'Tiết kiệm 10% chi phí', mult: 1.8, discountBadge: '-10%' },
    { id: '1kg', label: '1kg Xưởng / Quán', desc: 'Tiết kiệm 20% chi phí', mult: 3.2, discountBadge: '-20%' },
  ];

  const beanGrindOptions = [
    { label: 'Nguyên hạt (Whole Bean - Tự xay)', desc: 'Bảo quản hương hoa quả và khí CO2 lâu nhất' },
    { label: 'Xay Pha Phin Việt Nam (Medium-Coarse)', desc: 'Tối ưu tốc độ giọt 45 giọt/phút, không lọt cặn' },
    { label: 'Xay Pha Giấy / V60 (Medium)', desc: 'Lọc sáng màu, tôn nốt hoa nhài & quả mọng' },
    { label: 'Xay Máy Espresso (Fine)', desc: 'Bột mịn chiết xuất áp suất 9 Bar dày crema' },
    { label: 'Xay Cold Brew / French Press (Coarse)', desc: 'Xay thô ngâm ủ lạnh 18-24 tiếng không đục' },
  ];

  const sweetnessOptions = [
    'Nguyên bản (Chuẩn Barista)',
    'Ít đường / 50% Ngọt nhẹ',
    'Không đường hoàn toàn',
    'Mật ong hoa cà phê (+5k)',
  ];

  const milkOptions = [
    'Sữa tươi Đà Lạt thanh trùng',
    'Sữa Yến mạch Oatly (+12k)',
    'Sữa Hạnh nhân nguyên chất (+12k)',
  ];

  if (!product) return null;

  // Price calculations
  const weightMult = isBean ? weightTiers.find((w) => w.id === weightOption)?.mult || 1.0 : 1.0;
  const baseWeightPrice = Math.round(product.price * weightMult);
  const isSubscribed = subscriptionOption !== 'none';
  const finalUnitPrice = isSubscribed ? Math.round(baseWeightPrice * 0.85) : baseWeightPrice;
  const totalPrice = finalUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      product,
      quantity,
      weightOption: isBean ? weightOption : undefined,
      subscriptionOption: isBean ? subscriptionOption : undefined,
      grindOption: isBean || product.category === 'gear' ? grindOption : undefined,
      sweetness:
        product.category === 'espresso' || product.category === 'signature' || product.category === 'cold-brew'
          ? sweetness
          : undefined,
      milkOption: product.category === 'espresso' || product.category === 'signature' ? milkOption : undefined,
      size,
      unitPrice: finalUnitPrice,
    });
    onClose();
  };

  const cardContent = (
    <div
      className={`relative z-10 w-full max-w-2xl bg-white rounded-2xl border border-stone-200 flex flex-col ${
        isStandalone ? 'shadow-xl my-2 overflow-hidden' : 'shadow-2xl overflow-hidden max-h-[92vh] my-4'
      }`}
    >
      {/* Header with image */}
      <div className="relative h-48 sm:h-56 bg-stone-900 shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/20" />

        {!isStandalone && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] uppercase font-bold tracking-wider inline-block shadow-xs">
                {product.tag}
              </span>
              {isBean && (
                <span className="px-2 py-0.5 rounded-full bg-stone-800 text-amber-300 text-[10px] font-semibold border border-amber-600/30">
                  Hạt Specialty Mộc
                </span>
              )}
            </div>
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-white leading-tight">
              {product.name}
            </h3>
          </div>
          <div className="text-right">
            {isSubscribed && (
              <span className="text-stone-300 text-xs block line-through">
                {baseWeightPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
            <span className="font-sans text-xl font-bold text-amber-300">
              {finalUnitPrice.toLocaleString('vi-VN')}đ
            </span>
            {isBean && (
              <span className="block text-[10px] text-stone-300 font-medium">/{weightOption}</span>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable details */}
      <div className="p-5 overflow-y-auto space-y-4 flex-1 font-sans">
        {/* Roast Date & Peak Flavor Degas Indicator (For Beans) */}
        {isBean && (
          <div className="p-3.5 bg-amber-500/10 border border-amber-600/25 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-amber-600/15">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-900 tracking-wider block">
                    MẺ RANG GẦN NHẤT
                  </span>
                  <span className="text-xs font-bold text-stone-900">
                    {product.roastDate || '07:00 sáng Thứ Ba tuần này'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-900 font-semibold bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200 self-start sm:self-auto">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>Degas tối ưu: {product.peakFlavorWindow || 'Ngày 7 – 28 sau rang'}</span>
              </div>
            </div>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-stone-600">
              <PackageCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>Đóng gói túi giấy Kraft mộc tráng nhôm, van thoát khí 1 chiều Thụy Sĩ WICOVALVE.</span>
            </div>
          </div>
        )}

        {/* Quick Specs Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-stone-600">
          {product.origin && (
            <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xl">
              <span className="block text-[10px] text-stone-400 uppercase font-semibold">Vùng trồng</span>
              <span className="font-bold text-stone-900 text-xs">{product.origin}</span>
            </div>
          )}
          {product.altitude && (
            <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xl">
              <span className="block text-[10px] text-stone-400 uppercase font-semibold">Độ cao</span>
              <span className="font-bold text-stone-900 text-xs">{product.altitude}</span>
            </div>
          )}
          {product.process && (
            <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xl">
              <span className="block text-[10px] text-stone-400 uppercase font-semibold">Sơ chế</span>
              <span className="font-bold text-stone-900 text-xs">{product.process}</span>
            </div>
          )}
          {product.scaScore && (
            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
              <span className="block text-[10px] text-amber-800 uppercase font-semibold">Điểm SCA</span>
              <span className="font-bold text-amber-900 text-xs">{product.scaScore} / 100</span>
            </div>
          )}
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
          <Rate disabled allowHalf defaultValue={product.rating} className="!text-xs !text-amber-500" />
          <span className="text-xs font-bold text-stone-900">{product.rating}</span>
          <span className="text-xs text-stone-500 font-medium">({product.reviewCount} đánh giá từ hội viên)</span>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">{product.description}</p>

        {/* Tasting Notes */}
        <div>
          <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
            Hương vị nổi bật (Tasting Notes)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {product.tastingNotes.map((note, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-xs font-medium text-stone-800 flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-amber-700" />
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* WEIGHT SELECTION FOR BEANS */}
        {isBean && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                Quy cách đóng gói &amp; Trọng lượng
              </label>
              <span className="text-[11px] text-amber-800 font-semibold">
                {weightTiers.find((w) => w.id === weightOption)?.discountBadge || 'Giá gốc'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {weightTiers.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setWeightOption(tier.id)}
                  className={`p-3 rounded-xl text-left border cursor-pointer transition-all flex flex-col justify-between ${
                    weightOption === tier.id
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{tier.label}</span>
                    {tier.discountBadge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          weightOption === tier.id ? 'bg-amber-500 text-stone-950' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {tier.discountBadge}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[10px] mt-1 block ${
                      weightOption === tier.id ? 'text-stone-300' : 'text-stone-400'
                    }`}
                  >
                    {tier.desc}
                  </span>
                  <span
                    className={`text-xs font-bold mt-2 pt-1 border-t ${
                      weightOption === tier.id
                        ? 'border-stone-800 text-amber-300'
                        : 'border-stone-100 text-stone-800'
                    }`}
                  >
                    {Math.round(product.price * tier.mult).toLocaleString('vi-VN')}đ
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 5 GRIND OPTIONS FOR BEANS */}
        {(isBean || product.category === 'gear') && (
          <div>
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
              Cỡ xay tiêu chuẩn Barista
            </label>
            <div className="space-y-1.5">
              {beanGrindOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setGrindOption(opt.label)}
                  className={`w-full p-2.5 rounded-xl text-xs text-left border cursor-pointer transition-all flex items-center justify-between ${
                    grindOption === opt.label
                      ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <span className="block font-semibold">{opt.label}</span>
                    <span
                      className={`text-[10px] block mt-0.5 ${
                        grindOption === opt.label ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {opt.desc}
                    </span>
                  </div>
                  {grindOption === opt.label && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SUBSCRIPTION MODEL (HẠT TƯƠI ĐỊNH KỲ) */}
        {isBean && (
          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Repeat className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold text-stone-900">
                  Gói Đăng Ký Hạt Tươi Định Kỳ (Subscription)
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                Tiết kiệm 15%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSubscriptionOption('none')}
                className={`p-2.5 rounded-xl text-xs text-left border cursor-pointer transition-all ${
                  subscriptionOption === 'none'
                    ? 'border-stone-900 bg-white font-bold text-stone-900 shadow-xs'
                    : 'border-stone-200 bg-stone-100/60 text-stone-600 hover:bg-white'
                }`}
              >
                <span className="block font-bold">Mua 1 Lần</span>
                <span className="text-[10px] text-stone-500 block">Thanh toán theo đơn lẻ</span>
              </button>

              <button
                type="button"
                onClick={() => setSubscriptionOption('bi-weekly')}
                className={`p-2.5 rounded-xl text-xs text-left border cursor-pointer transition-all ${
                  subscriptionOption === 'bi-weekly'
                    ? 'border-amber-700 bg-amber-50 font-bold text-amber-950 shadow-xs'
                    : 'border-stone-200 bg-stone-100/60 text-stone-600 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">Mỗi 2 Tuần</span>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/60 px-1 py-0.2 rounded">
                    -15%
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 block">Uống hằng ngày tại gia</span>
              </button>

              <button
                type="button"
                onClick={() => setSubscriptionOption('monthly')}
                className={`p-2.5 rounded-xl text-xs text-left border cursor-pointer transition-all ${
                  subscriptionOption === 'monthly'
                    ? 'border-amber-700 bg-amber-50 font-bold text-amber-950 shadow-xs'
                    : 'border-stone-200 bg-stone-100/60 text-stone-600 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">Mỗi 1 Tháng</span>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/60 px-1 py-0.2 rounded">
                    -15%
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 block">Uống thư giãn cuối tuần</span>
              </button>
            </div>

            {isSubscribed && (
              <div className="p-2.5 bg-white rounded-lg border border-amber-200/80 text-[11px] text-stone-600 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Đặc quyền gói định kỳ:</span>
                </div>
                <p>• Mẻ rang mới xuất xưởng trong 24h từ Cầu Đất, miễn phí vận chuyển trọn đời gói.</p>
                <p>• Tặng kèm 1 túi mẫu thử (sample 50g) mẻ rang giới hạn mỗi kỳ giao hàng.</p>
                <p>• Dễ dàng đổi vị, tạm ngưng hoặc hủy bất kỳ lúc nào chỉ với 1 click.</p>
              </div>
            )}
          </div>
        )}

        {/* Customization: Drinks Sweetness */}
        {(product.category === 'espresso' ||
          product.category === 'signature' ||
          product.category === 'cold-brew') && (
          <div>
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
              Độ ngọt mong muốn
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sweetnessOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSweetness(opt)}
                  className={`p-2.5 rounded-xl text-xs text-left border cursor-pointer transition-all flex items-center justify-between ${
                    sweetness === opt
                      ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span>{opt}</span>
                  {sweetness === opt && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Milk Alternative */}
        {(product.category === 'espresso' || product.category === 'signature') && (
          <div>
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
              Lựa chọn loại sữa
            </label>
            <div className="space-y-1.5">
              {milkOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setMilkOption(opt)}
                  className={`w-full p-2.5 rounded-xl text-xs text-left border cursor-pointer transition-all flex items-center justify-between ${
                    milkOption === opt
                      ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span>{opt}</span>
                  {milkOption === opt && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Bottom bar */}
      <div className="p-4 sm:p-5 border-t border-stone-200 bg-white flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-bold text-xs text-stone-800 hover:bg-stone-50 cursor-pointer shadow-xs"
          >
            -
          </button>
          <span className="w-7 text-center font-bold text-xs text-stone-900">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-bold text-xs text-stone-800 hover:bg-stone-50 cursor-pointer shadow-xs"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 py-3 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <span>
            {isSubscribed ? 'Đăng ký nhận định kỳ' : 'Thêm vào giỏ'}
            {isBean ? ` (${weightOption})` : ''}
          </span>
          <span>•</span>
          <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
        </button>
      </div>
    </div>
  );

  if (isStandalone) {
    return cardContent;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs cursor-pointer"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center"
      >
        {cardContent}
      </motion.div>
    </div>
  );
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = (props) => {
  return (
    <AnimatePresence>
      {props.product && <ProductDetailModalContent {...props} />}
    </AnimatePresence>
  );
};
