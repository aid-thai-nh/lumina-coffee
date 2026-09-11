import React, { useState } from 'react';
import { App, Form, Input, Select } from 'antd';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Users, CheckCircle, Clock, Coffee, X, ArrowRight } from 'lucide-react';

export interface WorkshopModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: (message: string) => void;
  isStandalone?: boolean;
}

interface WorkshopFormValues {
  branch: string;
  sessionTime: string;
  attendees: number;
  fullName: string;
  phone: string;
  email: string;
}

export const WorkshopModalContent: React.FC<WorkshopModalProps> = ({
  onClose = () => {},
  onSuccess = (_msg: string) => {},
  isStandalone = false,
}) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<WorkshopFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [currentAttendees, setCurrentAttendees] = useState(1);

  const handleFinish = (values: WorkshopFormValues) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsBooked(true);
      message.success('Đã lưu thông tin đăng ký Workshop!');
      setTimeout(() => {
        onSuccess(
          `Đăng ký thành công Workshop Cupping tại ${values.branch} cho ${values.fullName}! Lumina sẽ liên hệ qua SĐT ${values.phone} để hoàn tất xác nhận.`
        );
        setIsBooked(false);
        form.resetFields();
        onClose();
      }, 1000);
    }, 800);
  };

  const calculatePrice = (count: number) => {
    if (count === 1) return '250.000đ';
    if (count === 2) return '450.000đ (Tiết kiệm 50k)';
    if (count === 3) return '650.000đ';
    return '800.000đ (Ưu đãi nhóm)';
  };

  const cardContent = (
    <div className={`relative z-10 w-full max-w-lg bg-white rounded-2xl p-5 sm:p-7 border border-stone-200 overflow-hidden ${
      isStandalone ? 'mx-auto my-2 shadow-none' : 'shadow-2xl my-6 max-h-[92vh] overflow-y-auto'
    }`}>
      {/* Close Button */}
      {!isStandalone && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      )}

        <div className="flex items-center gap-2 mb-2 pr-8">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-center">
            <Coffee className="w-4 h-4" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-amber-800 font-bold">
            TRẢI NGHIỆM ĐẶC QUYỀN
          </span>
        </div>

        <h3 className="font-sans text-xl font-bold text-stone-900 mb-1">
          Workshop Cupping &amp; Cảm Quan Cà Phê
        </h3>
        <p className="text-xs text-stone-500 leading-relaxed mb-6">
          Khám phá 5 mẻ rang Single Origin cùng chuyên gia Q-Grader quốc tế. Học cách nhận biết acidity, sweetness và body theo quy chuẩn SCA.
        </p>

        {isBooked ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="font-sans text-lg font-bold text-stone-900">
              Đăng Ký Giữ Chỗ Thành Công!
            </h4>
            <p className="text-xs text-stone-500">
              Thư mời và mã vé tham dự đã được gửi tới thông tin liên hệ của bạn.
            </p>
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              branch: 'Hà Nội — 18 Tràng Thi, Hoàn Kiếm',
              sessionTime: 'Thứ Bảy, 14:00 - 16:30',
              attendees: 1,
            }}
            requiredMark={false}
          >
            {/* Branch Select */}
            <Form.Item
              name="branch"
              label={
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  Chọn Xưởng Rang Trải Nghiệm
                </span>
              }
              rules={[{ required: true, message: 'Vui lòng chọn xưởng rang' }]}
            >
              <Select
                options={[
                  {
                    value: 'Hà Nội — 18 Tràng Thi, Hoàn Kiếm',
                    label: 'Hà Nội — Hoàn Kiếm Roastery (18 Tràng Thi)',
                  },
                  {
                    value: 'Sài Gòn — 42 Xuân Thủy, Thảo Điền',
                    label: 'Sài Gòn — Thảo Điền Atelier (42 Xuân Thủy)',
                  },
                  {
                    value: 'Đà Lạt — Đồi Chè Cầu Đất Farm',
                    label: 'Đà Lạt — Cầu Đất Flagship Farm (Trạm Hành)',
                  },
                ]}
              />
            </Form.Item>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Session Time */}
              <Form.Item
                name="sessionTime"
                label={
                  <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    Suất Thử Nếm
                  </span>
                }
                rules={[{ required: true, message: 'Vui lòng chọn suất thử nếm' }]}
              >
                <Select
                  options={[
                    { value: 'Thứ Bảy, 09:30 - 11:30', label: 'Thứ Bảy: 09:30 - 11:30' },
                    { value: 'Thứ Bảy, 14:00 - 16:30', label: 'Thứ Bảy: 14:00 - 16:30 (Khuyên dùng)' },
                    { value: 'Chủ Nhật, 09:30 - 11:30', label: 'Chủ Nhật: 09:30 - 11:30' },
                  ]}
                />
              </Form.Item>

              {/* Attendees */}
              <Form.Item
                name="attendees"
                label={
                  <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-stone-500" />
                    Số Lượng Khách
                  </span>
                }
                rules={[{ required: true, message: 'Vui lòng chọn số lượng' }]}
              >
                <Select
                  onChange={(val) => setCurrentAttendees(Number(val))}
                  options={[
                    { value: 1, label: '1 Người (250.000đ)' },
                    { value: 2, label: '2 Người (450.000đ - Ưu đãi)' },
                    { value: 3, label: '3 Người (650.000đ)' },
                    { value: 4, label: '4 Người (800.000đ - Nhóm)' },
                  ]}
                />
              </Form.Item>
            </div>

            {/* Full Name */}
            <Form.Item
              name="fullName"
              label={<span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Họ và tên của bạn</span>}
              rules={[
                { required: true, message: 'Vui lòng nhập họ và tên' },
                { min: 2, message: 'Họ tên quá ngắn' },
              ]}
            >
              <Input placeholder="VD: Nguyễn Hoàng Nam" className="text-xs h-9.5 rounded-lg" />
            </Form.Item>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Phone */}
              <Form.Item
                name="phone"
                label={<span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Số điện thoại</span>}
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại' },
                  {
                    pattern: /^[0-9+ ]{9,15}$/,
                    message: 'Số điện thoại không hợp lệ',
                  },
                ]}
              >
                <Input placeholder="0901 234 567" className="text-xs h-9.5 rounded-lg" />
              </Form.Item>

              {/* Email */}
              <Form.Item
                name="email"
                label={<span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Email nhận vé</span>}
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không đúng định dạng' },
                ]}
              >
                <Input placeholder="hoangnam@gmail.com" className="text-xs h-9.5 rounded-lg" />
              </Form.Item>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wide shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>
                  {submitting
                    ? 'Đang lưu thông tin...'
                    : `Xác Nhận Giữ Chỗ Workshop (${calculatePrice(currentAttendees)})`}
                </span>
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>
              <p className="text-[11px] text-center text-stone-400 mt-2.5">
                *Thanh toán trực tiếp tại quầy vào ngày tham gia. Tặng kèm 1 túi cà phê dùng thử 100g.
              </p>
            </div>
          </Form>
        )}
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

export const WorkshopModal: React.FC<WorkshopModalProps> = (props) => {
  return (
    <AnimatePresence>
      {props.isOpen && <WorkshopModalContent {...props} />}
    </AnimatePresence>
  );
};
