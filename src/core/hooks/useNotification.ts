import { message } from 'antd';
import { useToast, ToastType } from '../notification/ToastContext';

export interface NotificationOptions {
  title?: string;
  duration?: number;
}

/**
 * useNotification hook
 * Unified notification/toast wrapper combining custom Lumina Toast with Ant Design fallback
 */
export function useNotification() {
  let toast: ReturnType<typeof useToast> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    toast = useToast();
  } catch {
    toast = null;
  }

  const success = (content: string, options?: NotificationOptions) => {
    if (toast) {
      toast.success(content, { title: options?.title, duration: options?.duration ? options.duration * 1000 : undefined });
    } else {
      message.success({
        content,
        duration: options?.duration ?? 2.5,
        className: 'font-sans font-medium',
      });
    }
  };

  const error = (content: string, options?: NotificationOptions) => {
    if (toast) {
      toast.error(content, { title: options?.title, duration: options?.duration ? options.duration * 1000 : undefined });
    } else {
      message.error({
        content,
        duration: options?.duration ?? 3,
        className: 'font-sans font-medium',
      });
    }
  };

  const info = (content: string, options?: NotificationOptions) => {
    if (toast) {
      toast.info(content, { title: options?.title, duration: options?.duration ? options.duration * 1000 : undefined });
    } else {
      message.info({
        content,
        duration: options?.duration ?? 2.5,
        className: 'font-sans font-medium',
      });
    }
  };

  const warning = (content: string, options?: NotificationOptions) => {
    if (toast) {
      toast.warning(content, { title: options?.title, duration: options?.duration ? options.duration * 1000 : undefined });
    } else {
      message.warning({
        content,
        duration: options?.duration ?? 2.5,
        className: 'font-sans font-medium',
      });
    }
  };

  return {
    success,
    error,
    info,
    warning,
  };
}

export { useToast };
export type { ToastType };
