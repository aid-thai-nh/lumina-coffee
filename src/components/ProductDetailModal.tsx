import React, { useState } from 'react';
import { Rate } from 'antd';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from '../types';
import { X, Sparkles, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [grindOption, setGrindOption] = useState('Hạt mộc nguyên chất');
  const [sweetness, setSweetness] = useState('Nguyên bản (Chuẩn Barista)');
  const [milkOption, setMilkOption] = useState('Sữa tươi Đà Lạt thanh trùng');
  const [size, setSize] = useState<'Tiêu chuẩn (M)' | 'Lớn (L)'>('Tiêu chuẩn (M)');

  const grindOptions = [
    'Hạt mộc nguyên chất',
    'Xay pha Pour-over / V60',
    'Xay pha Phin truyền thống',
    'Xay pha Máy Espresso',
    'Xay pha Cold Brew thô',
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

  const handleAdd = () => {
    if (!product) return;
    onAddToCart({
      product,
      quantity,
      grindOption: product.category === 'single-origin' || product.category === 'gear' ? grindOption : undefined,
      sweetness: product.category === 'espresso' || product.category === 'signature' || product.category === 'cold-brew' ? sweetness : undefined,
      milkOption: product.category === 'espresso' || product.category === 'signature' ? milkOption : undefined,
      size,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[90vh] my-6"
          >
            {/* Header with image */}
            <div className="relative h-52 sm:h-60 bg-stone-900 shrink-0">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/20" />

              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] uppercase font-bold tracking-wider inline-block mb-1.5 shadow-xs">
                    {product.tag}
                  </span>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-white leading-tight">
                    {product.name}
                  </h3>
                </div>
                <div className="text-right">
                  {product.originalPrice && (
                    <span className="text-stone-300 text-xs block line-through">
                      {product.originalPrice.toLocaleString('vi-VN')}đ
                    </span>
                  )}
                  <span className="font-sans text-xl font-bold text-amber-300">
                    {product.price.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable details */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
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
                <span className="text-xs text-stone-500 font-medium">({product.reviews} đánh giá)</span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {product.description}
              </p>

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

              {/* Customization: Single Origin Beans Grind Option */}
              {(product.category === 'single-origin' || product.category === 'gear') && (
                <div>
                  <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                    Tùy chọn độ xay hạt
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {grindOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setGrindOption(opt)}
                        className={`p-2.5 rounded-xl text-xs text-left border cursor-pointer transition-all flex items-center justify-between ${
                          grindOption === opt
                            ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-xs'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <span>{opt}</span>
                        {grindOption === opt && <Check className="w-4 h-4 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Customization: Drinks Sweetness */}
              {(product.category === 'espresso' || product.category === 'signature' || product.category === 'cold-brew') && (
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
                <span>Thêm vào giỏ</span>
                <span>•</span>
                <span>{(product.price * quantity).toLocaleString('vi-VN')}đ</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
