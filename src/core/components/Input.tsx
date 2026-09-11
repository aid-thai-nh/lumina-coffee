import React from 'react';
import { Input as AntdInput, InputProps as AntdInputProps } from 'antd';

export interface InputProps extends AntdInputProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  errorMessage,
  containerClassName = '',
  status,
  ...props
}) => {
  const isError = Boolean(errorMessage);

  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {label && (
        <label className="text-xs font-semibold text-[#2C1810] tracking-wide">
          {label}
        </label>
      )}
      <AntdInput
        status={isError ? 'error' : status}
        className="rounded-xl border-[#d5c7b8] hover:border-[#835423] focus:border-[#835423] text-sm"
        {...props}
      />
      {errorMessage ? (
        <span className="text-xs text-[#c62828] font-medium">{errorMessage}</span>
      ) : helperText ? (
        <span className="text-xs text-[#7c6b59]">{helperText}</span>
      ) : null}
    </div>
  );
};
