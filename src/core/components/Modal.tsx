import React from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';
import { X } from 'lucide-react';

export interface CoreModalProps extends Omit<AntdModalProps, 'title'> {
  title?: React.ReactNode;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<CoreModalProps> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  children,
  footer = null,
  width = 540,
  className = '',
  ...props
}) => {
  return (
    <AntdModal
      open={isOpen}
      onCancel={onClose}
      footer={footer}
      width={width}
      centered
      closeIcon={
        <span className="p-1 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors">
          <X className="w-4 h-4" />
        </span>
      }
      className={`lumina-core-modal ${className}`}
      styles={{
        content: {
          borderRadius: 20,
          padding: 24,
          boxShadow: '0 20px 40px -10px rgba(44, 24, 16, 0.2)',
        },
        header: {
          marginBottom: 16,
          borderBottom: 'none',
        },
      }}
      title={
        title ? (
          <div>
            <h3 className="text-lg font-bold text-[#2C1810] tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs text-[#7c6b59] mt-0.5">{subtitle}</p>}
          </div>
        ) : null
      }
      {...props}
    >
      {children}
    </AntdModal>
  );
};
