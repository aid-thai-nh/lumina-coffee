import React, { useState } from 'react';
import { App, Popconfirm, Segmented } from 'antd';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/coffeeData';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Tag,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Sparkles,
  Repeat,
  Package,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onOrderSuccess: (orderId: string, total: number) => void;
  onAddToCart?: (item: CartItem) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
  onAddToCart,
}) => {
  const { message } = App.useApp();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Checkout inputs
  const [customerName, setCustomerName] = useState('Nguyễn Minh Triết');
  const [customerPhone, setCustomerPhone] = useState('0908 123 456');
  const [customerAddress, setCustomerAddress] = useState('Phường Thảo Điền, TP. Thủ Đức, TP.HCM');
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'cod' | 'card'>('vietqr');
  const [orderNote, setOrderNote] = useState('Giao vào giờ hành chính, gọi trước khi đến');

  const getItemPrice = (item: CartItem) => item.unitPrice ?? item.product.price;

  const subtotal = items.reduce((acc, item) => acc + getItemPrice(item) * item.quantity, 0);
  const hasSubscription = items.some((item) => item.subscriptionOption && item.subscriptionOption !== 'none');
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  // Subscription orders get free shipping automatically!
  const isFreeShipping = hasSubscription || subtotal >= 150000 || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 25000;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  // Cross sell accessories (Filter gear items not already in cart)
  const crossSellItems = PRODUCTS.filter(
    (p) =>
      p.category === 'gear' &&
      !items.some((i) => i.product.id === p.id)
  ).slice(0, 2);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'LUMINA' || code === 'LUMINA20' || code === 'SPECIALTY') {
      setDiscountPercent(20);
      setPromoApplied(code);
      setPromoError('');
      message.success(`Đã kích hoạt ưu đãi 20% cho mã ${code}!`);
    } else {
      setPromoError('Mã ưu đãi không hợp lệ (Thử "LUMINA20")');
      message.error('Mã giảm giá không hợp lệ');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const generatedId = `LMN-${Math.floor(100000 + Math.random() * 900000)}`;
    onOrderSuccess(generatedId, total);
    onClearCart();
    setIsCheckingOut(false);
    onClose();
  };

  const handleQuickAddGear = (product: Product) => {
    if (onAddToCart) {
      onAddToCart({
        product,
        quantity: 1,
        unitPrice: product.price,
      });
      message.success(`Đã thêm ${product.name} vào giỏ!`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end overflow-hidden font-sans">
          {/* Backdrop with smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs cursor-pointer"
            onClick={onClose}
          />

          {/* Drawer with smooth spring slide */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-stone-200"
          >
            {/* Header */}
            <div className="px-6 py-4.5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-bold text-stone-900 tracking-tight">
                    {isCheckingOut ? 'Thông Tin Đặt Giao' : 'Giỏ Hàng Cà Phê'}
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">
                    {items.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm trong giỏ
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isCheckingOut && items.length > 0 && (
                  <Popconfirm
                    title="Làm trống giỏ hàng?"
                    description="Bạn có chắc chắn muốn xóa toàn bộ sản phẩm?"
                    okText="Xác nhận"
                    cancelText="Hủy"
                    okButtonProps={{ danger: true }}
                    onConfirm={onClearCart}
                  >
                    <button
                      type="button"
                      className="text-xs text-stone-400 hover:text-red-600 transition-colors font-medium px-2 py-1 rounded-md hover:bg-stone-100 cursor-pointer"
                    >
                      Xóa tất cả
                    </button>
                  </Popconfirm>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-stone-200/60 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body View Switcher with Smooth AnimatePresence */}
            <div className="flex-1 overflow-hidden relative flex flex-col">
              <AnimatePresence mode="wait">
                {!isCheckingOut ? (
                  <motion.div
                    key="cart-list"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 overflow-y-auto p-5 space-y-4"
                  >
                    {items.length === 0 ? (
                      <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6">
                        <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                          <ShoppingBag className="w-8 h-8 opacity-60" />
                        </div>
                        <h4 className="font-sans text-base font-bold text-stone-800 mb-1">
                          Giỏ hàng còn trống
                        </h4>
                        <p className="text-xs text-stone-500 max-w-xs mb-5 leading-relaxed">
                          Chọn một mẻ rang mộc Specialty hoặc đồ uống signature để chúng tôi chuẩn bị ngay.
                        </p>
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold tracking-wide hover:bg-stone-800 transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          Khám phá thực đơn
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2.5">
                          {items.map((item, idx) => {
                            const unitPrice = getItemPrice(item);
                            const isSub = item.subscriptionOption && item.subscriptionOption !== 'none';

                            return (
                              <motion.div
                                key={`${item.product.id}-${idx}`}
                                layout
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-3.5 bg-stone-50/70 hover:bg-stone-50 rounded-xl border border-stone-200/80 transition-all flex gap-3.5 items-center"
                              >
                                <img
                                  src={item.product.imageUrl}
                                  alt={item.product.name}
                                  className="w-16 h-16 object-cover rounded-lg bg-stone-100 shrink-0 border border-stone-200"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <h5 className="font-sans text-xs font-bold text-stone-900 truncate">
                                      {item.product.name}
                                    </h5>
                                  </div>

                                  {/* Badges for weight, grind, subscription */}
                                  <div className="flex flex-wrap gap-1 text-[10px] text-stone-600 my-1 font-medium">
                                    {item.weightOption && (
                                      <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold border border-amber-200/60 flex items-center gap-1">
                                        <Package className="w-2.5 h-2.5" />
                                        {item.weightOption}
                                      </span>
                                    )}
                                    {isSub && (
                                      <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold border border-emerald-200 flex items-center gap-1">
                                        <Repeat className="w-2.5 h-2.5" />
                                        {item.subscriptionOption === 'bi-weekly' ? 'Mỗi 2 tuần' : 'Mỗi tháng'} (-15%)
                                      </span>
                                    )}
                                    {item.grindOption && (
                                      <span className="bg-white border border-stone-200 px-1.5 py-0.5 rounded max-w-[170px] truncate">
                                        {item.grindOption}
                                      </span>
                                    )}
                                    {item.sweetness && (
                                      <span className="bg-white border border-stone-200 px-1.5 py-0.5 rounded">
                                        {item.sweetness}
                                      </span>
                                    )}
                                    {item.milkOption && (
                                      <span className="bg-white border border-stone-200 px-1.5 py-0.5 rounded">
                                        {item.milkOption}
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-bold text-amber-900">
                                      {(unitPrice * item.quantity).toLocaleString('vi-VN')}đ
                                    </span>
                                    {item.quantity > 1 && (
                                      <span className="text-[10px] text-stone-400">
                                        ({unitPrice.toLocaleString('vi-VN')}đ/sp)
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Quantity Counter */}
                                <div className="flex items-center gap-1 bg-white border border-stone-200 p-0.5 rounded-lg shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => onUpdateQuantity(idx, -1)}
                                    className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                                    title="Giảm số lượng"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-5 text-center text-xs font-bold text-stone-900">
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => onUpdateQuantity(idx, 1)}
                                    className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                                    title="Tăng số lượng"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <Popconfirm
                                  title="Xóa món này?"
                                  description="Bạn muốn bỏ món này khỏi giỏ hàng?"
                                  okText="Xóa"
                                  cancelText="Giữ"
                                  okButtonProps={{ danger: true }}
                                  onConfirm={() => onRemoveItem(idx)}
                                >
                                  <button
                                    type="button"
                                    className="text-stone-400 hover:text-red-600 transition-colors p-1 cursor-pointer shrink-0"
                                    title="Xóa"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </Popconfirm>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* 1-Click Cross-Sell Accessories */}
                        {crossSellItems.length > 0 && onAddToCart && (
                          <div className="p-3 bg-stone-50/80 rounded-xl border border-stone-200 space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                              <span>Gợi ý dụng cụ &amp; phụ kiện pha chế:</span>
                            </div>
                            <div className="space-y-1.5">
                              {crossSellItems.map((gear) => (
                                <div
                                  key={gear.id}
                                  className="p-2 bg-white rounded-lg border border-stone-200 flex items-center justify-between gap-2"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <img
                                      src={gear.imageUrl}
                                      alt={gear.name}
                                      className="w-9 h-9 rounded object-cover border border-stone-200 shrink-0"
                                    />
                                    <div className="min-w-0">
                                      <span className="block text-xs font-bold text-stone-900 truncate">
                                        {gear.name}
                                      </span>
                                      <span className="text-[11px] text-amber-800 font-semibold">
                                        {gear.price.toLocaleString('vi-VN')}đ
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleQuickAddGear(gear)}
                                    className="px-2.5 py-1 rounded-md bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-semibold shrink-0 cursor-pointer active:scale-95 transition-all"
                                  >
                                    + Thêm
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Promo Code Box */}
                        <div className="pt-1">
                          <form onSubmit={handleApplyPromo} className="flex gap-2 mb-2">
                            <div className="relative flex-1">
                              <input
                                type="text"
                                placeholder="Mã giảm giá (Thử: LUMINA20)"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 bg-white uppercase font-medium text-stone-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all placeholder:text-stone-400"
                              />
                              <Tag className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-3" />
                            </div>
                            <button
                              type="submit"
                              className="px-3.5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 active:scale-95 transition-all cursor-pointer"
                            >
                              Áp dụng
                            </button>
                          </form>
                          {promoApplied && (
                            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Đã áp dụng mã {promoApplied} (-20%)
                            </p>
                          )}
                          {promoError && (
                            <p className="text-[11px] text-red-600 font-medium mt-1">{promoError}</p>
                          )}

                          {/* Free shipping status bar */}
                          <div className="mt-3 p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                            <div className="flex justify-between text-xs text-stone-600 mb-1.5 font-medium">
                              <span className="flex items-center gap-1">
                                <Truck className="w-3.5 h-3.5 text-amber-700" />
                                {hasSubscription
                                  ? 'Đơn định kỳ: Miễn phí giao trọn đời gói'
                                  : subtotal >= 150000
                                  ? 'Đủ điều kiện Freeship nội thành'
                                  : `Thêm ${(150000 - subtotal).toLocaleString('vi-VN')}đ để Freeship`}
                              </span>
                              <span className="font-bold text-amber-800">
                                {hasSubscription || subtotal >= 150000
                                  ? '100%'
                                  : `${Math.min(100, Math.round((subtotal / 150000) * 100))}%`}
                              </span>
                            </div>
                            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-amber-600 h-full rounded-full transition-all duration-500 ease-out"
                                style={{
                                  width: hasSubscription
                                    ? '100%'
                                    : `${Math.min(100, (subtotal / 150000) * 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ) : (
                  /* Checkout Form View */
                  <motion.form
                    key="checkout-form"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleCompleteOrder}
                    className="flex-1 overflow-y-auto p-5 space-y-3.5 font-sans"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Họ và tên người nhận
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Số điện thoại liên hệ
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Địa chỉ giao hàng tận nơi
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Phương thức thanh toán
                      </label>
                      <Segmented
                        value={paymentMethod}
                        onChange={(val) => setPaymentMethod(val as 'vietqr' | 'cod' | 'card')}
                        block
                        options={[
                          { label: 'VietQR 24/7', value: 'vietqr' },
                          { label: 'Tiền mặt COD', value: 'cod' },
                          { label: 'Thẻ Lumina', value: 'card' },
                        ]}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Ghi chú cho Barista &amp; Tài xế
                      </label>
                      <input
                        type="text"
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white focus:border-amber-600 focus:outline-none transition-all"
                      />
                    </div>

                    {hasSubscription && (
                      <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                        <Repeat className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block">Gói Đăng Ký Định Kỳ</span>
                          <span>Mẻ hạt tươi mới sẽ tự động rang và giao định kỳ tới địa chỉ này. Bạn có thể tạm hoãn hoặc hủy bất kỳ lúc nào.</span>
                        </div>
                      </div>
                    )}

                    <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs text-stone-600 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>Đơn sẽ được xưởng rang chuẩn bị và bảo ôn nhiệt độ giao ngay trong 20-30 phút.</span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Pricing & Actions */}
            {items.length > 0 && (
              <div className="p-5 border-t border-stone-200 bg-white space-y-3 shrink-0">
                <div className="space-y-1.5 text-xs text-stone-600 font-medium">
                  <div className="flex justify-between">
                    <span>Tạm tính ({items.reduce((s, i) => s + i.quantity, 0)} món):</span>
                    <span className="font-semibold text-stone-800">{subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Ưu đãi áp dụng:</span>
                      <span className="font-semibold">-{discountAmount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Phí vận chuyển giao nhanh:</span>
                    <span className="font-semibold text-stone-800">
                      {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}đ`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
                    <span>Tổng thanh toán:</span>
                    <span className="text-amber-800 text-base">{total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>

                {!isCheckingOut ? (
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-3 rounded-xl bg-stone-900 text-white font-semibold text-xs tracking-wide shadow-sm hover:bg-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <span>Tiến hành giao ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-1/3 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Quay lại</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCompleteOrder}
                      className="w-2/3 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold tracking-wide shadow-sm transition-all cursor-pointer active:scale-[0.98]"
                    >
                      Xác nhận đặt hàng ({total.toLocaleString('vi-VN')}đ)
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
