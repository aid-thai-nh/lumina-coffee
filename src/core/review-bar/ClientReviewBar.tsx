import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  Copy,
  Check,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Coffee,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { FlagIcon } from '../i18n/FlagIcons';
import { useNotification } from '../hooks/useNotification';

interface ClientReviewBarProps {
  onOpenSystemDesign: () => void;
  onReplayPreloader?: () => void;
}

export const ClientReviewBar: React.FC<ClientReviewBarProps> = ({
  onOpenSystemDesign,
  onReplayPreloader,
}) => {
  const { locale, setLocale } = useI18n();
  const notification = useNotification();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      notification.success('Đã sao chép liên kết nghiệm thu cho khách hàng!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 font-sans">
      {/* Expanded Review Panel */}
      {isExpanded && (
        <div className="mb-2 p-4 rounded-2xl bg-[#201206]/95 backdrop-blur-md text-white border border-[#c68e58]/30 shadow-2xl w-84 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ea7c1b]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chế độ Nghiệm Thu (Review)</span>
            </div>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/70">
              v1.2.0 Core
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Language Switch with SVG Flags */}
            <div className="flex items-center justify-between">
              <span className="text-white/70 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#ffdcc3]" />
                <span>Ngôn ngữ (i18n):</span>
              </span>
              <div className="inline-flex rounded-lg bg-white/10 p-0.5 gap-1">
                <button
                  onClick={() => setLocale('vi')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                    locale === 'vi'
                      ? 'bg-[#ea7c1b] text-white shadow-xs'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <FlagIcon country="vi" size="xs" />
                  <span>VI</span>
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                    locale === 'en'
                      ? 'bg-[#ea7c1b] text-white shadow-xs'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <FlagIcon country="en" size="xs" />
                  <span>EN</span>
                </button>
              </div>
            </div>

            {/* Quick System Design Specs */}
            <div className="flex items-center justify-between">
              <span className="text-white/70 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#ffdcc3]" />
                <span>Đặc tả thiết kế:</span>
              </span>
              <button
                onClick={onOpenSystemDesign}
                className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white font-medium rounded-md cursor-pointer transition-colors"
              >
                Mở System Design
              </button>
            </div>

            {/* Replay Preloader Button */}
            {onReplayPreloader && (
              <div className="flex items-center justify-between pt-1">
                <span className="text-white/70 flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-[#ea7c1b]" />
                  <span>Màn hình Loading:</span>
                </span>
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    onReplayPreloader();
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-[#ea7c1b]/20 hover:bg-[#ea7c1b]/30 text-[#ffdcc3] font-medium rounded-md cursor-pointer transition-colors border border-[#ea7c1b]/30"
                  title="Chạy lại hiệu ứng Loading mở đầu website"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Chạy lại Preloader</span>
                </button>
              </div>
            )}

            {/* Quick Test Toast Notifications */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-white/50 text-[10px] block mb-1.5 uppercase font-semibold">
                Thử Thông Báo Toast (API & System Noti)
              </span>
              <div className="grid grid-cols-4 gap-1 text-[10px]">
                <button
                  onClick={() => notification.success('Thao tác dữ liệu thành công!', { title: 'Thành công' })}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 py-1 rounded text-center transition-colors cursor-pointer font-medium"
                >
                  Success
                </button>
                <button
                  onClick={() => notification.error('Lỗi máy chủ HTTP 500!', { title: 'Thất bại' })}
                  className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 py-1 rounded text-center transition-colors cursor-pointer font-medium"
                >
                  Failed
                </button>
                <button
                  onClick={() => notification.warning('Kho chỉ còn 2 gói mộc!', { title: 'Cảnh báo' })}
                  className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 py-1 rounded text-center transition-colors cursor-pointer font-medium"
                >
                  Warning
                </button>
                <button
                  onClick={() => notification.info('Mẻ rang #402 đang ủ lạnh.', { title: 'Thông tin' })}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-1 rounded text-center transition-colors cursor-pointer font-medium"
                >
                  Info
                </button>
              </div>
            </div>

            {/* Responsive hints */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-white/50 text-[10px] block mb-1.5 uppercase font-semibold">
                Kiểm tra Responsive
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                <div className="bg-white/5 p-1.5 rounded flex flex-col items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mobile 375px</span>
                </div>
                <div className="bg-white/5 p-1.5 rounded flex flex-col items-center gap-1">
                  <Tablet className="w-3.5 h-3.5 text-blue-400" />
                  <span>Tablet 768px</span>
                </div>
                <div className="bg-white/5 p-1.5 rounded flex flex-col items-center gap-1">
                  <Monitor className="w-3.5 h-3.5 text-amber-400" />
                  <span>Desktop 1440px</span>
                </div>
              </div>
            </div>

            {/* Copy Review Link */}
            <button
              onClick={handleCopyLink}
              className="w-full mt-2 py-2 bg-[#ea7c1b] hover:bg-[#c66400] text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-98"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã sao chép link!' : 'Copy Link Gửi Khách Review'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Pill Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#201206] text-white border border-[#c68e58]/40 shadow-xl hover:bg-[#2c1810] transition-all cursor-pointer text-xs font-semibold group"
      >
        <div className="w-2 h-2 rounded-full bg-[#ea7c1b] animate-pulse" />
        <span>Client Review Tool</span>
        <span className="text-white/40">|</span>
        <div className="flex items-center gap-1">
          <FlagIcon country={locale as 'vi' | 'en'} size="xs" />
          <span className="text-[#ffdcc3] font-bold uppercase">{locale}</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:text-white" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-white/60 group-hover:text-white" />
        )}
      </button>
    </div>
  );
};
