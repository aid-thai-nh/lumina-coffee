import React, { useState, useEffect } from 'react';
import { App, Form, Input, Segmented } from 'antd';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Product, UserProfile, QuickDeliveryOrder } from '../types';
import { PRODUCTS } from '../data/coffeeData';
import {
  Bike,
  Clock,
  MapPin,
  Phone,
  User,
  Coffee,
  Check,
  Plus,
  Minus,
  Sparkles,
  CreditCard,
  QrCode,
  DollarSign,
  AlertCircle,
  X,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export interface QuickDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentUser: UserProfile | null;
  onUpdateQuantity: (index: number, delta: number) => void;
  onAddToCart: (item: CartItem) => void;
  onConfirmOrder: (order: QuickDeliveryOrder) => void;
  onOpenAuthModal?: () => void;
  isStandalone?: boolean;
}

export const QuickDeliveryModalContent: React.FC<QuickDeliveryModalProps> = ({
  onClose,
  cartItems,
  currentUser,
  onUpdateQuantity,
  onAddToCart,
  onConfirmOrder,
  onOpenAuthModal,
  isStandalone = false,
}) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [deliverySpeed, setDeliverySpeed] = useState<'express' | 'scheduled'>('express');
  const [scheduledTime, setScheduledTime] = useState('11:30 - 12:30 (Trưa nay)');
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'cod' | 'card'>('vietqr');

  // Top 4 best sellers ready for immediate dispatch
  const quickBestSellers = PRODUCTS.slice(0, 4);

  // Synchronize initial form fields with current logged in user
  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        fullName: currentUser.name,
        phone: currentUser.phone,
        address: currentUser.address || '42 Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP.HCM',
        notes: 'Giao giờ hành chính, gọi trước khi đến',
      });
    } else {
      form.setFieldsValue({
        fullName: 'Nguyễn Minh Triết',
        phone: '0908 123 456',
        address: '42 Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP.HCM',
        notes: '',
      });
    }
  }, [currentUser, form]);

  const getItemPrice = (item: CartItem) => item.unitPrice ?? item.product.price;
  const subtotal = cartItems.reduce((acc, item) => acc + getItemPrice(item) * item.quantity, 0);
  const hasSubscription = cartItems.some((item) => item.subscriptionOption && item.subscriptionOption !== 'none');
  const isFreeShip = hasSubscription || subtotal >= 120000 || (currentUser && currentUser.membershipTier === 'Hội viên Vàng');
  const shippingFee = subtotal === 0 ? 0 : isFreeShip ? 0 : 25000;
  // 10% discount for members
  const memberDiscount = currentUser ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal - memberDiscount + shippingFee);

  const handleQuickAddRecommended = (prod: Product) => {
    onAddToCart({
      product: prod,
      quantity: 1,
      grindOption: prod.category === 'single-origin' ? 'Hạt mộc nguyên chất' : undefined,
      sweetness: prod.category === 'signature' || prod.category === 'espresso' ? 'Nguyên bản (Chuẩn Barista)' : undefined,
    });
    message.success(`Đã thêm nhanh ${prod.name} vào đơn giao`);
  };

  const handleSubmit = (values: {
    fullName: string;
    phone: string;
    address: string;
    notes?: string;
  }) => {
    if (cartItems.length === 0) {
      message.error('Vui lòng chọn ít nhất 1 món để đặt giao siêu tốc!');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const generatedOrder: QuickDeliveryOrder = {
        id: `LMN-${Math.floor(100000 + Math.random() * 900000)}`,
        recipientName: values.fullName,
        phone: values.phone,
        address: values.address,
        deliverySpeed,
        scheduledTime: deliverySpeed === 'scheduled' ? scheduledTime : undefined,
        items: [...cartItems],
        paymentMethod,
        notes: values.notes,
        subtotal,
        shippingFee,
        discountAmount: memberDiscount,
        total,
        createdAt: 'Vừa xong',
        status: 'delivering',
      };

      message.success('Đơn giao ngay đã được tiếp nhận thành công!');
      onConfirmOrder(generatedOrder);
      onClose();
    }, 750);
  };

  const cardContent = (
    <div
      className={`relative z-10 w-full max-w-2xl bg-white rounded-2xl p-5 sm:p-7 border border-stone-200 ${
        isStandalone ? 'mx-auto my-4 shadow-xl' : 'shadow-2xl my-6 max-h-[92vh] overflow-y-auto'
      }`}
    >
      {/* Close Button - hidden in standalone mode */}
      {!isStandalone && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>
      )}

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between pb-4 border-b border-stone-200 mb-5 gap-3 pr-8">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 text-[11px] font-semibold flex items-center gap-1.5 border border-stone-200">
                    <Bike className="w-3.5 h-3.5 text-amber-800" />
                    <span>Giao Nhanh 20 - 30 Phút</span>
                  </span>
                  <span className="text-xs text-stone-500 font-medium">Nội thành Hà Nội &amp; TP.HCM</span>
                </div>
                <h3 className="font-sans text-xl font-bold text-stone-900 tracking-tight">
                  Đặt Cà Phê Giao Ngay
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Barista tại xưởng rang gần nhất chiết xuất mẻ mới và đóng gói bảo ôn giao tới bạn.
                </p>
              </div>

              {currentUser ? (
                <div className="text-left sm:text-right bg-stone-50 p-2.5 rounded-xl border border-stone-200 shrink-0">
                  <span className="text-[11px] text-stone-400 block font-medium">Khách hàng:</span>
                  <span className="text-xs font-bold text-stone-900 flex items-center sm:justify-end gap-1">
                    <Sparkles className="w-3 h-3 text-amber-700" />
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-amber-800 font-semibold">
                    Đặc quyền {currentUser.membershipTier} (-10%)
                  </span>
                </div>
              ) : onOpenAuthModal ? (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAuthModal();
                  }}
                  className="text-xs text-amber-800 hover:text-amber-900 font-semibold cursor-pointer flex items-center gap-1 self-start"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Đăng nhập để nhận ưu đãi</span>
                </button>
              ) : null}
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              {/* Section 1: Delivery Mode (Express vs Scheduled) */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  Thời Gian Nhận Hàng
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliverySpeed('express')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                      deliverySpeed === 'express'
                        ? 'border-stone-900 bg-stone-50 text-stone-900 shadow-xs'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        deliverySpeed === 'express'
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold block text-stone-900">Giao Hỏa Tốc (20 - 30 Phút)</span>
                      <span className="text-[11px] text-stone-500 block mt-0.5">
                        Chiết xuất nóng/lạnh và giao tới ngay
                      </span>
                    </div>
                    {deliverySpeed === 'express' && <Check className="w-4 h-4 text-stone-900 shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliverySpeed('scheduled')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                      deliverySpeed === 'scheduled'
                        ? 'border-stone-900 bg-stone-50 text-stone-900 shadow-xs'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        deliverySpeed === 'scheduled'
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold block text-stone-900">Hẹn Giờ Nhận Trong Ngày</span>
                      <span className="text-[11px] text-stone-500 block mt-0.5">
                        Khung giờ cố định cho giờ họp, tiệc
                      </span>
                    </div>
                    {deliverySpeed === 'scheduled' && <Check className="w-4 h-4 text-stone-900 shrink-0" />}
                  </button>
                </div>

                {/* Scheduled Time Sub-selector with Smooth Collapse */}
                <AnimatePresence>
                  {deliverySpeed === 'scheduled' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                        <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block mb-2">
                          Chọn khung giờ giao mong muốn:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            '08:30 - 09:30',
                            '11:30 - 12:30',
                            '14:00 - 15:00',
                            '16:30 - 17:30',
                          ].map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setScheduledTime(slot)}
                              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border cursor-pointer text-center transition-all ${
                                scheduledTime === slot
                                  ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                                  : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Section 2: Recipient Information */}
              <div className="mb-5 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    Thông Tin Nhận Hàng
                  </span>
                  {currentUser?.address && (
                    <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Địa chỉ đã lưu
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <Form.Item
                    name="fullName"
                    label={<span className="text-xs font-semibold text-stone-700">Họ và tên người nhận</span>}
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                    className="mb-0"
                  >
                    <Input
                      prefix={<User className="w-3.5 h-3.5 text-stone-400 mr-1" />}
                      placeholder="Nguyễn Văn A"
                      className="text-xs h-9.5 rounded-lg border-stone-300"
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label={<span className="text-xs font-semibold text-stone-700">Số điện thoại liên hệ</span>}
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại' },
                      { pattern: /^[0-9+ ]{9,15}$/, message: 'Số điện thoại không hợp lệ' },
                    ]}
                    className="mb-0"
                  >
                    <Input
                      prefix={<Phone className="w-3.5 h-3.5 text-stone-400 mr-1" />}
                      placeholder="0908 123 456"
                      className="text-xs h-9.5 rounded-lg border-stone-300"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="address"
                  label={<span className="text-xs font-semibold text-stone-700">Địa chỉ giao hàng chi tiết</span>}
                  rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng' }]}
                  className="mb-3"
                >
                  <Input.TextArea
                    rows={2}
                    placeholder="Số nhà, tên đường, Phường, Quận..."
                    className="text-xs rounded-lg border-stone-300"
                  />
                </Form.Item>

                <Form.Item
                  name="notes"
                  label={<span className="text-xs font-semibold text-stone-600">Ghi chú cho Barista &amp; Tài xế (Tùy chọn)</span>}
                  className="mb-0"
                >
                  <Input
                    placeholder="VD: Nhiều đá riêng, mang lên tầng 3, gọi trước khi đến..."
                    className="text-xs h-9 rounded-lg border-stone-300"
                  />
                </Form.Item>
              </div>

              {/* Section 3: Selected Items in this order */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-stone-500" />
                    Món Trong Đơn ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} phần)
                  </span>
                  {cartItems.length > 0 && (
                    <span className="text-xs text-stone-700 font-semibold">
                      Tạm tính: {subtotal.toLocaleString('vi-VN')}đ
                    </span>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-center mb-3">
                    <AlertCircle className="w-5 h-5 text-amber-700 mx-auto mb-1 opacity-80" />
                    <p className="text-xs font-bold text-stone-800">
                      Chưa có món nào trong đơn giao
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Chọn nhanh các món đặc sản bán chạy bên dưới để giao tức thì:
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 mb-3 max-h-44 overflow-y-auto pr-1">
                    {cartItems.map((item, idx) => (
                      <motion.div
                        key={`${item.product.id}-${idx}`}
                        layout
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2.5 bg-white rounded-xl border border-stone-200 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                          />
                          <div className="min-w-0">
                            <h5 className="font-sans font-bold text-stone-900 truncate">
                              {item.product.name}
                            </h5>
                            <div className="flex flex-wrap gap-1 text-[10px] text-stone-500 mt-0.5">
                              {item.weightOption && (
                                <span className="bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-semibold">
                                  {item.weightOption}
                                </span>
                              )}
                              {item.subscriptionOption && item.subscriptionOption !== 'none' && (
                                <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                                  Định kỳ (-15%)
                                </span>
                              )}
                              {item.grindOption && (
                                <span className="bg-stone-100 px-1.5 py-0.2 rounded truncate max-w-[140px]">
                                  {item.grindOption}
                                </span>
                              )}
                              {item.sweetness && (
                                <span className="bg-stone-100 px-1.5 py-0.2 rounded">
                                  {item.sweetness}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(idx, -1)}
                              className="w-5 h-5 rounded flex items-center justify-center hover:bg-white text-stone-600 transition-colors cursor-pointer"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="w-4 text-center font-bold text-xs text-stone-900">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(idx, 1)}
                              className="w-5 h-5 rounded flex items-center justify-center hover:bg-white text-stone-600 transition-colors cursor-pointer"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          <span className="font-bold text-stone-900 w-20 text-right">
                            {(getItemPrice(item) * item.quantity).toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Clean Quick-Add Recommendations Row */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    Gợi ý thêm nhanh món được ưa chuộng:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {quickBestSellers.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => handleQuickAddRecommended(prod)}
                        className="p-2 bg-white rounded-lg border border-stone-200 hover:border-stone-400 transition-all text-left flex flex-col justify-between cursor-pointer group shadow-2xs hover:shadow-xs active:scale-[0.98]"
                      >
                        <div>
                          <span className="text-[10px] font-semibold text-amber-800 uppercase block truncate">
                            {prod.tag}
                          </span>
                          <span className="font-sans text-xs font-semibold text-stone-900 line-clamp-1 group-hover:text-amber-900">
                            {prod.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                          <span className="text-[11px] font-bold text-stone-800">
                            {prod.price.toLocaleString('vi-VN')}đ
                          </span>
                          <span className="w-5 h-5 rounded-md bg-stone-100 text-stone-700 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-colors">
                            <Plus className="w-3 h-3" />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 4: Payment Method */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-stone-500" />
                  Phương Thức Thanh Toán
                </label>
                <Segmented
                  value={paymentMethod}
                  onChange={(val) => setPaymentMethod(val as 'vietqr' | 'cod' | 'card')}
                  block
                  options={[
                    {
                      label: (
                        <div className="py-1 flex items-center justify-center gap-1.5 font-semibold text-xs">
                          <QrCode className="w-3.5 h-3.5" />
                          <span>VietQR 24/7</span>
                        </div>
                      ),
                      value: 'vietqr',
                    },
                    {
                      label: (
                        <div className="py-1 flex items-center justify-center gap-1.5 font-semibold text-xs">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>Tiền Mặt COD</span>
                        </div>
                      ),
                      value: 'cod',
                    },
                    {
                      label: (
                        <div className="py-1 flex items-center justify-center gap-1.5 font-semibold text-xs">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Thẻ Hội Viên</span>
                        </div>
                      ),
                      value: 'card',
                    },
                  ]}
                />

                {paymentMethod === 'vietqr' && (
                  <div className="mt-2.5 p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-stone-900 text-white flex items-center justify-center shrink-0">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-semibold text-stone-900 block">Quét mã VietQR Chuyển Khoản Nhanh</span>
                        <span className="text-[11px] text-stone-500">
                          Mã QR sẽ hiển thị tự động ngay khi bạn xác nhận đơn.
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      Miễn phí
                    </span>
                  </div>
                )}
              </div>

              {/* Section 5: Order Summary */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-5 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600 font-medium">
                  <span>Tạm tính ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} món):</span>
                  <span className="font-semibold text-stone-800">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>

                {memberDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Ưu đãi thành viên (-10%):</span>
                    <span className="font-bold">-{memberDiscount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600 font-medium">
                  <span>Phí vận chuyển giao nhanh:</span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">Miễn phí giao hàng</span>
                  ) : (
                    <span className="font-semibold text-stone-800">{shippingFee.toLocaleString('vi-VN')}đ</span>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm font-bold text-stone-900">
                  <span>Tổng thanh toán:</span>
                  <span className="text-lg text-stone-900">
                    {total.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={submitting || cartItems.length === 0}
                className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wide shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>
                  {cartItems.length === 0
                    ? 'Vui lòng chọn ít nhất 1 món vào đơn'
                    : submitting
                    ? 'Đang tiếp nhận đơn...'
                    : `Xác Nhận Đặt Giao Siêu Tốc • ${total.toLocaleString('vi-VN')}đ`}
                </span>
                {!submitting && cartItems.length > 0 && <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="text-[11px] text-center text-stone-400 mt-2.5">
                Cam kết giữ nhiệt chuẩn Barista, đóng lon bảo ôn và giao đúng hẹn.
              </p>
            </Form>
    </div>
  );

  if (isStandalone) {
    return (
      <div className="w-full py-4 px-2 sm:px-4 bg-[#fcf9f8] flex justify-center font-sans">
        {cardContent}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans">
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

export const QuickDeliveryModal: React.FC<QuickDeliveryModalProps> = (props) => {
  return (
    <AnimatePresence>
      {props.isOpen && <QuickDeliveryModalContent {...props} />}
    </AnimatePresence>
  );
};

export const QuickDeliveryStandalone: React.FC<Omit<QuickDeliveryModalProps, 'isOpen'>> = (props) => {
  return <QuickDeliveryModalContent {...props} isOpen={true} isStandalone={true} />;
};
