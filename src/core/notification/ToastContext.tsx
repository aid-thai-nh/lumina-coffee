import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  X,
  Sparkles,
  Coffee,
} from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  title?: string;
  duration?: number; // ms
}

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration: number;
}

interface ToastContextType {
  toasts: ToastMessage[];
  show: (type: ToastType, message: string, options?: ToastOptions) => string;
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  info: (message: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
  clearAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const show = useCallback(
    (type: ToastType, message: string, options?: ToastOptions) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const duration = options?.duration ?? (type === 'error' ? 4500 : 3200);

      const newToast: ToastMessage = {
        id,
        type,
        title: options?.title,
        message,
        duration,
      };

      setToasts((prev) => [...prev.slice(-3), newToast]); // Keep max 4 toasts visible

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    [dismiss]
  );

  const success = useCallback(
    (message: string, options?: ToastOptions) =>
      show('success', message, { title: options?.title || 'Thành công', ...options }),
    [show]
  );

  const error = useCallback(
    (message: string, options?: ToastOptions) =>
      show('error', message, { title: options?.title || 'Thao tác thất bại', ...options }),
    [show]
  );

  const warning = useCallback(
    (message: string, options?: ToastOptions) =>
      show('warning', message, { title: options?.title || 'Cảnh báo hệ thống', ...options }),
    [show]
  );

  const info = useCallback(
    (message: string, options?: ToastOptions) =>
      show('info', message, { title: options?.title || 'Thông báo', ...options }),
    [show]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, show, success, error, warning, info, dismiss, clearAll }}
    >
      {children}

      {/* Floating Toast Container (Fixed Top-Right) */}
      <aside
        aria-live="polite"
        aria-label="Thông báo hệ thống"
        className="fixed top-20 right-4 sm:right-6 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
          ))}
        </AnimatePresence>
      </aside>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

/**
 * Individual Toast Card with Brand Theming & Icons
 */
const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: () => void }> = ({
  toast,
  onDismiss,
}) => {
  const config = {
    success: {
      bg: 'bg-[#201206]',
      border: 'border-emerald-500/40',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      icon: <CheckCircle2 className="w-4 h-4" />,
      titleColor: 'text-emerald-300',
      barColor: 'bg-emerald-500',
    },
    error: {
      bg: 'bg-[#201206]',
      border: 'border-rose-500/40',
      iconBg: 'bg-rose-500/20 text-rose-400',
      icon: <XCircle className="w-4 h-4" />,
      titleColor: 'text-rose-300',
      barColor: 'bg-rose-500',
    },
    warning: {
      bg: 'bg-[#201206]',
      border: 'border-amber-500/40',
      iconBg: 'bg-amber-500/20 text-amber-400',
      icon: <AlertCircle className="w-4 h-4" />,
      titleColor: 'text-amber-300',
      barColor: 'bg-amber-500',
    },
    info: {
      bg: 'bg-[#201206]',
      border: 'border-[#c68e58]/50',
      iconBg: 'bg-[#ea7c1b]/20 text-[#ffdcc3]',
      icon: <Sparkles className="w-4 h-4 text-[#ea7c1b]" />,
      titleColor: 'text-[#ffdcc3]',
      barColor: 'bg-[#ea7c1b]',
    },
  }[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`pointer-events-auto rounded-2xl p-4 text-white shadow-2xl border ${config.border} ${config.bg} backdrop-blur-md relative overflow-hidden flex items-start gap-3 select-none`}
    >
      {/* Type Icon */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
      >
        {config.icon}
      </div>

      {/* Content */}
      <div className="flex-1 pr-2 pt-0.5">
        {toast.title && (
          <h5 className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${config.titleColor}`}>
            {toast.title}
          </h5>
        )}
        <p className="text-xs text-white/90 leading-relaxed font-medium">
          {toast.message}
        </p>
      </div>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={onDismiss}
        className="text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 flex-shrink-0 cursor-pointer"
        title="Đóng thông báo"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Timeout indicator bar */}
      {toast.duration > 0 && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: toast.duration / 1000, ease: 'linear' }}
          className={`absolute bottom-0 left-0 h-0.5 ${config.barColor}`}
        />
      )}
    </motion.div>
  );
};
