import React, { useState, useRef, useEffect } from 'react';
import { useI18n, SupportedLocale } from './I18nContext';
import { FlagIcon } from './FlagIcons';
import { ChevronDown, Check } from 'lucide-react';

export interface LanguageOption {
  code: SupportedLocale;
  label: string;
  nativeName: string;
  flagCountry: 'vi' | 'en';
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'vi',
    label: 'VI',
    nativeName: 'Tiếng Việt',
    flagCountry: 'vi',
  },
  {
    code: 'en',
    label: 'EN',
    nativeName: 'English',
    flagCountry: 'en',
  },
];

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'pill' | 'minimal';
  dropdownPlacement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  showNativeName?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'dropdown',
  dropdownPlacement = 'bottom-right',
  showNativeName = true,
}) => {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption =
    LANGUAGE_OPTIONS.find((opt) => opt.code === locale) || LANGUAGE_OPTIONS[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Handle locale select
  const handleSelect = (code: SupportedLocale) => {
    setLocale(code);
    setIsOpen(false);
  };

  // Dropdown placement styling
  const placementClasses = {
    'bottom-right': 'top-full right-0 mt-1.5',
    'bottom-left': 'top-full left-0 mt-1.5',
    'top-right': 'bottom-full right-0 mb-1.5',
    'top-left': 'bottom-full left-0 mb-1.5',
  }[dropdownPlacement];

  // VARIANT: Minimal (Inline Text)
  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center gap-2 text-xs font-semibold ${className}`}>
        {LANGUAGE_OPTIONS.map((opt, idx) => (
          <React.Fragment key={opt.code}>
            {idx > 0 && <span className="opacity-30">/</span>}
            <button
              onClick={() => handleSelect(opt.code)}
              className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer px-1.5 py-0.5 rounded ${
                locale === opt.code
                  ? 'text-[#ea7c1b] font-bold'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
              title={`Switch to ${opt.nativeName}`}
            >
              <FlagIcon country={opt.flagCountry} size="xs" />
              <span>{opt.label}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
    );
  }

  // VARIANT: Pill (Segmented Bar)
  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex items-center p-0.5 rounded-full bg-[#f0eded] border border-[#e8dfd1] ${className}`}
      >
        {LANGUAGE_OPTIONS.map((opt) => {
          const isActive = locale === opt.code;
          return (
            <button
              key={opt.code}
              onClick={() => handleSelect(opt.code)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-[#2c1810] shadow-xs font-bold'
                  : 'text-[#837469] hover:text-[#2c1810]'
              }`}
            >
              <FlagIcon country={opt.flagCountry} size="xs" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // DEFAULT VARIANT: Dropdown
  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#f0eded] hover:bg-[#eae7e7] text-[#2c1810] border border-[#e8dfd1] text-xs font-semibold tracking-wide transition-all shadow-2xs hover:border-[#c68e58]/50 cursor-pointer focus:outline-hidden ${
          isOpen ? 'ring-2 ring-[#ea7c1b]/30 border-[#c68e58]' : ''
        }`}
        title="Chọn ngôn ngữ / Select Language"
      >
        <FlagIcon country={currentOption.flagCountry} size="sm" />
        <span className="font-bold text-[#2c1810]">{currentOption.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#837469] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#ea7c1b]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${placementClasses} w-44 rounded-xl bg-white/98 backdrop-blur-md shadow-xl border border-[#e8dfd1] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150`}
          role="menu"
        >
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#837469] border-b border-[#f0eded] mb-1">
            Ngôn ngữ / Language
          </div>

          <div className="space-y-0.5">
            {LANGUAGE_OPTIONS.map((opt) => {
              const isSelected = locale === opt.code;
              return (
                <button
                  key={opt.code}
                  role="menuitem"
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#ea7c1b]/10 text-[#d36b00] font-bold'
                      : 'text-[#51443a] hover:bg-[#faf8f5] hover:text-[#2c1810]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon country={opt.flagCountry} size="sm" />
                    <div className="flex flex-col">
                      <span className="leading-tight font-medium">
                        {showNativeName ? opt.nativeName : opt.label}
                      </span>
                      <span className="text-[10px] text-[#837469] uppercase font-mono">
                        {opt.label}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[#d36b00] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
