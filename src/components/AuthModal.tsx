import React, { useState } from 'react';
import { App, Form, Input, Button, Checkbox } from 'antd';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Coffee,
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialTab = 'login',
}) => {
  const { message } = App.useApp();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  // Pre-configured VIP Demo Account
  const demoUser: UserProfile = {
    id: 'USR-8829',
    name: 'Nguyễn Minh Triết',
    email: 'minhtriet.coffee@lumina.vn',
    phone: '0908 123 456',
    address: '42 Xuân Thủy, Thảo Điền, TP. Thủ Đức, TP.HCM',
    membershipTier: 'Hội viên Vàng',
    beansPoints: 240,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    savedAddresses: [
      '42 Xuân Thủy, Thảo Điền, TP. Thủ Đức, TP.HCM',
      '18 Tràng Thi, Hoàn Kiếm, Hà Nội',
    ],
  };

  const handleLogin = (values: { identifier: string; password?: string }) => {
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      const user: UserProfile = {
        id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
        name: values.identifier.includes('@') ? values.identifier.split('@')[0] : 'Khách Thân Thiết Lumina',
        email: values.identifier.includes('@') ? values.identifier : `${values.identifier}@lumina.vn`,
        phone: values.identifier.match(/^[0-9+ ]+$/) ? values.identifier : '0908 123 456',
        address: '42 Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP.HCM',
        membershipTier: 'Hội viên Vàng',
        beansPoints: 160,
        savedAddresses: ['42 Xuân Thủy, Thảo Điền, TP. Thủ Đức, TP.HCM'],
      };

      message.success(`Chào mừng ${user.name} trở lại với Lumina Coffee Club!`);
      onLoginSuccess(user);
      onClose();
    }, 700);
  };

  const handleQuickDemoLogin = () => {
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      message.success(`Đã đăng nhập tài khoản mẫu: ${demoUser.name} (${demoUser.membershipTier})`);
      onLoginSuccess(demoUser);
      onClose();
    }, 500);
  };

  const handleRegister = (values: {
    name: string;
    phone: string;
    email: string;
    address?: string;
  }) => {
    setRegisterLoading(true);
    setTimeout(() => {
      setRegisterLoading(false);
      const newUser: UserProfile = {
        id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address || 'TP. Hồ Chí Minh',
        membershipTier: 'Hội viên Bạc',
        beansPoints: 50,
        savedAddresses: values.address ? [values.address] : [],
      };

      message.success('Đăng ký tài khoản thành công! Bạn nhận được 50 Điểm Hạt Đậu chào mừng.');
      onLoginSuccess(newUser);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
          {/* Backdrop with smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Card with smooth scale & slide entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-stone-200 overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-center mx-auto mb-2.5">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 block mb-0.5">
                LUMINA COFFEE CLUB
              </span>
              <h3 className="font-sans text-xl font-bold text-stone-900">
                {activeTab === 'login' ? 'Đăng Nhập Thành Viên' : 'Đăng Ký Khách Thân Thiết'}
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Đăng nhập để tích lũy điểm hạt đậu, lưu địa chỉ giao hàng và nhận ưu đãi riêng.
              </p>
            </div>

            {/* Tab Selector with Smooth Animated Indicator */}
            <div className="flex p-1 bg-stone-100 rounded-xl mb-5 relative">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all relative z-10 cursor-pointer ${
                  activeTab === 'login'
                    ? 'text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {activeTab === 'login' && (
                  <motion.div
                    layoutId="authTabIndicator"
                    className="absolute inset-0 bg-white rounded-lg -z-10 shadow-xs"
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  />
                )}
                Đăng Nhập
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all relative z-10 cursor-pointer ${
                  activeTab === 'register'
                    ? 'text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {activeTab === 'register' && (
                  <motion.div
                    layoutId="authTabIndicator"
                    className="absolute inset-0 bg-white rounded-lg -z-10 shadow-xs"
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  />
                )}
                Đăng Ký Tài Khoản
              </button>
            </div>

            {/* Form with Smooth Crossfade Transition */}
            <AnimatePresence mode="wait">
              {activeTab === 'login' ? (
                <motion.div
                  key="login-form-pane"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <Form
                    layout="vertical"
                    onFinish={handleLogin}
                    initialValues={{ remember: true }}
                    requiredMark={false}
                  >
                    <Form.Item
                      label={<span className="text-xs font-semibold text-stone-700">Số điện thoại hoặc Email</span>}
                      name="identifier"
                      rules={[{ required: true, message: 'Vui lòng nhập số điện thoại hoặc email' }]}
                      className="mb-3.5"
                    >
                      <Input
                        prefix={<User className="w-4 h-4 text-stone-400 mr-1.5" />}
                        placeholder="Ví dụ: 0908 123 456 hoặc name@example.com"
                        className="rounded-lg h-10 text-xs"
                      />
                    </Form.Item>

                    <Form.Item
                      label={<span className="text-xs font-semibold text-stone-700">Mật khẩu</span>}
                      name="password"
                      rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                      className="mb-2"
                    >
                      <Input.Password
                        prefix={<Lock className="w-4 h-4 text-stone-400 mr-1.5" />}
                        placeholder="Nhập mật khẩu (tùy ý cho demo)"
                        className="rounded-lg h-10 text-xs"
                      />
                    </Form.Item>

                    <div className="flex items-center justify-between mb-4">
                      <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className="text-xs text-stone-500 font-medium">Ghi nhớ đăng nhập</Checkbox>
                      </Form.Item>
                      <button
                        type="button"
                        onClick={() => message.info('Vui lòng sử dụng tính năng Đăng nhập mẫu hoặc nhập SĐT để vào nhanh!')}
                        className="text-xs text-amber-800 hover:text-amber-900 font-medium cursor-pointer"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs tracking-wide hover:bg-stone-800 active:scale-[0.98] transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 mb-3"
                    >
                      <span>{loginLoading ? 'Đang xác thực...' : 'Đăng nhập ngay'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Quick 1-Click Demo Login Pill */}
                    <button
                      type="button"
                      onClick={handleQuickDemoLogin}
                      disabled={loginLoading}
                      className="w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 text-amber-900 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-700" />
                      <span>Đăng nhập nhanh với tài khoản Demo VIP</span>
                    </button>
                  </Form>
                </motion.div>
              ) : (
                <motion.div
                  key="register-form-pane"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <Form
                    layout="vertical"
                    onFinish={handleRegister}
                    requiredMark={false}
                  >
                    <Form.Item
                      label={<span className="text-xs font-semibold text-stone-700">Họ và tên của bạn</span>}
                      name="name"
                      rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                      className="mb-3"
                    >
                      <Input
                        prefix={<User className="w-4 h-4 text-stone-400 mr-1.5" />}
                        placeholder="Ví dụ: Lê Bảo Hoàng"
                        className="rounded-lg h-10 text-xs"
                      />
                    </Form.Item>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <Form.Item
                        label={<span className="text-xs font-semibold text-stone-700">Số điện thoại</span>}
                        name="phone"
                        rules={[{ required: true, message: 'Nhập số điện thoại' }]}
                        className="mb-0"
                      >
                        <Input
                          prefix={<Phone className="w-4 h-4 text-stone-400 mr-1.5" />}
                          placeholder="0912 345 678"
                          className="rounded-lg h-10 text-xs"
                        />
                      </Form.Item>

                      <Form.Item
                        label={<span className="text-xs font-semibold text-stone-700">Email</span>}
                        name="email"
                        rules={[
                          { required: true, message: 'Nhập email' },
                          { type: 'email', message: 'Email chưa đúng định dạng' },
                        ]}
                        className="mb-0"
                      >
                        <Input
                          prefix={<Mail className="w-4 h-4 text-stone-400 mr-1.5" />}
                          placeholder="name@email.com"
                          className="rounded-lg h-10 text-xs"
                        />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label={<span className="text-xs font-semibold text-stone-700">Địa chỉ giao hàng mặc định</span>}
                      name="address"
                      className="mb-4"
                    >
                      <Input
                        prefix={<MapPin className="w-4 h-4 text-stone-400 mr-1.5" />}
                        placeholder="Số nhà, tên đường, Quận/Huyện"
                        className="rounded-lg h-10 text-xs"
                      />
                    </Form.Item>

                    <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl mb-4 text-[11px] text-stone-600 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Nhận ngay <strong>50 Điểm Hạt Đậu</strong> để đổi đồ uống khi đăng ký thành công.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={registerLoading}
                      className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs tracking-wide hover:bg-stone-800 active:scale-[0.98] transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
                    >
                      <span>{registerLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản thành viên'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer note */}
            <div className="mt-4 pt-3 border-t border-stone-100 text-center">
              <span className="text-[11px] text-stone-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                Bảo mật thông tin khách hàng tuyệt đối
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
