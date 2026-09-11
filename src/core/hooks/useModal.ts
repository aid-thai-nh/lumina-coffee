import { useState, useCallback } from 'react';

/**
 * useModal hook
 * Manages modal visibility, active item payload, and transitions
 */
export function useModal<T = any>(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [data, setData] = useState<T | null>(null);

  const open = useCallback((payload?: T) => {
    if (payload !== undefined) setData(payload);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
    data,
    setData,
  };
}
