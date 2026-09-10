import React, { useState } from 'react';
import { App, Form, Input, Popconfirm, Progress } from 'antd';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, QuickDeliveryOrder } from '../types';
import {
  User,
  Phone,
  MapPin,
  LogOut,
  Coffee,
  CheckCircle2,
  Package,
  ChevronRight,
  Sparkles,
  X,
  Edit2,
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
  orders?: QuickDeliveryOrder[];
  onQuickReorder?: (order: QuickDeliveryOrder) => void;
}

const EditProfileForm: React.FC<{
  user: UserProfile;
  onSave: (values: { name: string; phone: string; address: string }) => void;
}> = ({ user, onSave }) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        name: user.name,
        phone: user.phone,
        address: user.address || '',
      }}
      onFinish={onSave}
    >
      <Form.Item
        name="name"
        label={<span className="text-xs font-semibold text-stone-700">Họ và tên</span>}
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
        className="mb-2"
      >
        <Input className="text-xs h-9 rounded-lg" />
      </Form.Item>
      <Form.Item
        name="phone"
        label={<span className="text-xs font-semibold text-stone-700">Số điện thoại</span>}
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
        className="mb-2"
      >
        <Input className="text-xs h-9 rounded-lg" />
      </Form.Item>
      <Form.Item
        name="address"
        label={<span className="text-xs font-semibold text-stone-700">Địa chỉ chi tiết</span>}
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
        className="mb-3"
      >
        <Input.TextArea rows={2} className="text-xs rounded-lg" />
      </Form.Item>
      <button
        type="submit"
        className="w-full py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-all cursor-pointer"
      >
        Lưu Thông Tin Mới
      </button>
    </Form>
  );
};

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onLogout,
  orders = [],
  onQuickReorder,
}) => {
  if (!user) return null;

  const { message } = App.useApp();
  const [isEditing, setIsEditing] = useState(false);

  // Mock initial orders if none exist
  const displayOrders: QuickDeliveryOrder[] = orders.length > 0 ? orders : [
    {
      id: 'LMN-928410',
      recipientName: user.name,
      phone: user.phone,
      address: user.address || '42 Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP.HCM',
      deliverySpeed: 'express',
      items: [
        {
          product: {
            id: 'geisha-batch-402',
            name: 'Geisha Mẻ #402 Cầu Đất',
            category: 'single-origin',
            categoryLabel: 'Single Origin',
            tag: 'Mẻ Rang Giới Hạn',
            price: 185000,
            rating: 5.0,
            reviewCount: 38,
            brewInfo: 'Pour-over V60',
            description: 'Tuyển chọn từ những cây Geisha cổ thụ 1.650m.',
            tastingNotes: ['Hoa Nhài', 'Cam Bergamot', 'Đào Tiên'],
            imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
          },
          quantity: 1,
          grindOption: 'Xay pha Pour-over / V60',
        },
      ],
      paymentMethod: 'vietqr',
      subtotal: 185000,
      shippingFee: 0,
      discountAmount: 0,
      total: 185000,
      createdAt: 'Hôm nay, 14:15',
      status: 'delivering',
    },
    {
      id: 'LMN-817290',
      recipientName: user.name,
      phone: user.phone,
      address: user.address || '42 Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP.HCM',
      deliverySpeed: 'express',
      items: [
        {
          product: {
            id: 'caramel-macchiato-sig',
            name: 'Signature Caramel Macchiato',
            category: 'signature',
            categoryLabel: 'Signature Drink',
            tag: 'Best Seller',
            price: 65000,
            rating: 4.9,
            reviewCount: 142,
            brewInfo: 'Espresso Barista',
            description: 'Caramel bơ mặn thủ công kết hợp sữa tươi Đà Lạt.',
            tastingNotes: ['Caramel Bơ', 'Hạt Phỉ', 'Vanilla'],
            imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
          },
          quantity: 2,
          sweetness: 'Nguyên bản (Chuẩn Barista)',
        },
      ],
      paymentMethod: 'cod',
      subtotal: 130000,
      shippingFee: 25000,
      discountAmount: 26000,
      total: 129000,
      createdAt: 'Hôm qua, 09:20',
      status: 'completed',
    },
  ];

  const handleSaveProfile = (values: { name: string; phone: string; address: string }) => {
    const updated: UserProfile = {
      ...user,
      name: values.name,
      phone: values.phone,
      address: values.address,
    };
    onUpdateUser(updated);
    setIsEditing(false);
    message.success('Cập nhật thông tin tài khoản thành công!');
  };

  const handleRedeemPoints = () => {
    if (user.beansPoints < 100) {
      message.warning('Bạn cần tích lũy tối thiểu 100 Điểm Hạt Đậu để đổi đồ uống!');
      return;
    }
    const updated: UserProfile = {
      ...user,
      beansPoints: user.beansPoints - 100,
    };
    onUpdateUser(updated);
    message.success('Đã đổi thành công Voucher 01 Ly Cold Brew Vân Đồn! Đã thêm vào giỏ hàng.');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans">
          {/* Backdrop with smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs cursor-pointer"
            onClick={onClose}
          />

          {/* Modal with smooth entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-5 sm:p-7 shadow-2xl border border-stone-200 overflow-hidden my-6 max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5 pr-8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans text-base font-bold text-stone-900">
                      {user.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                      {user.membershipTier}
                    </span>
                  </div>
                  <span className="text-xs text-stone-500 font-medium">{user.email}</span>
                </div>
              </div>

              <Popconfirm
                title="Đăng xuất khỏi tài khoản?"
                description="Bạn có muốn đăng xuất khỏi Lumina Coffee Club?"
                okText="Đăng xuất"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
                onConfirm={() => {
                  onLogout();
                  onClose();
                  message.info('Đã đăng xuất an toàn.');
                }}
              >
                <button
                  type="button"
                  className="text-xs text-stone-400 hover:text-red-600 p-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer hover:bg-stone-100"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="font-medium hidden sm:inline">Đăng xuất</span>
                </button>
              </Popconfirm>
            </div>

            {/* Clean Membership Card */}
            <div className="rounded-2xl p-5 text-white mb-5 shadow-sm bg-stone-900 border border-stone-800">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block">
                    THẺ HỘI VIÊN CHÍNH THỨC
                  </span>
                  <h4 className="font-sans text-base font-bold tracking-tight text-white mt-0.5">
                    Lumina Coffee Club
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block font-medium">Điểm Hạt Đậu</span>
                  <div className="flex items-center gap-1 font-bold text-lg text-amber-400">
                    <Coffee className="w-4 h-4 text-amber-400" />
                    <span>{user.beansPoints}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-[11px] text-stone-300 font-medium">
                  <span>Tiến trình thăng hạng Diamond</span>
                  <span>{user.beansPoints}/300 điểm</span>
                </div>
                <Progress
                  percent={Math.min(100, Math.round((user.beansPoints / 300) * 100))}
                  strokeColor="#d97706"
                  railColor="rgba(255,255,255,0.2)"
                  showInfo={false}
                  size="small"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                <span className="text-stone-400 font-mono text-[11px]">ID: {user.id}</span>
                <button
                  type="button"
                  onClick={handleRedeemPoints}
                  className="py-1 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Đổi 100 Điểm = 1 Ly Miễn Phí</span>
                </button>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 mb-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  Địa Chỉ Giao Hàng Mặc Định
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-amber-800 hover:text-amber-900 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>{isEditing ? 'Hủy' : 'Chỉnh sửa'}</span>
                </button>
              </div>

              {isEditing ? (
                <EditProfileForm user={user} onSave={handleSaveProfile} />
              ) : (
                <div className="space-y-2 text-xs text-stone-600 font-medium">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span className="font-semibold text-stone-900">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span className="text-stone-800">{user.address || 'Chưa thiết lập địa chỉ'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Orders History */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-stone-500" />
                  Lịch Sử Đơn Đặt Giao
                </span>
                <span className="text-[11px] text-stone-400">{displayOrders.length} đơn gần nhất</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {displayOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-center justify-between hover:border-stone-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-stone-900">#{ord.id}</span>
                        {ord.status === 'delivering' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                            Đang giao hàng
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Hoàn thành
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-600">
                        {ord.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {ord.createdAt} • {ord.paymentMethod === 'vietqr' ? 'VietQR 24/7' : 'Tiền mặt COD'}
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-3">
                      <span className="font-bold text-stone-900 block text-xs">
                        {ord.total.toLocaleString('vi-VN')}đ
                      </span>
                      {onQuickReorder && (
                        <button
                          type="button"
                          onClick={() => {
                            onQuickReorder(ord);
                            onClose();
                          }}
                          className="text-[11px] text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-0.5 mt-1 cursor-pointer"
                        >
                          <span>Đặt lại</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
