import React, { useState, useEffect } from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbBarProps {
  items: BreadcrumbItem[];
  rightAction?: React.ReactNode;
}

export const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({ items, rightAction }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Always reset visibility when breadcrumb items change (e.g. on navigation)
  useEffect(() => {
    setIsVisible(true);
  }, [items]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let accumulatedUp = 0;
    let accumulatedDown = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      // Always show breadcrumb when near the top of the page
      if (currentScrollY <= 80) {
        setIsVisible(true);
        accumulatedUp = 0;
        accumulatedDown = 0;
        lastScrollY = currentScrollY;
        return;
      }

      if (delta > 0) {
        // Scrolling DOWN
        accumulatedDown += delta;
        accumulatedUp = 0;
        // Natural threshold before sliding up behind the header
        if (accumulatedDown >= 25) {
          setIsVisible(false);
        }
      } else if (delta < 0) {
        // Scrolling UP
        accumulatedUp += Math.abs(delta);
        accumulatedDown = 0;
        // Sensitive upward detection (~10px) smoothly restores the bar
        if (accumulatedUp >= 10) {
          setIsVisible(true);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Breadcrumb Navigation"
      style={{
        transition:
          'height 800ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 750ms ease, border-color 750ms ease, box-shadow 750ms ease',
      }}
      className={`fixed top-16 sm:top-20 left-0 right-0 w-full z-40 bg-[#fcf9f8]/95 backdrop-blur-xl border-b overflow-hidden will-change-[height,opacity] ${
        isVisible
          ? 'h-11 sm:h-13 opacity-100 border-[#e8dfd1]/70 shadow-[0_2px_8px_rgba(56,34,15,0.03)] pointer-events-auto'
          : 'h-0 opacity-0 border-transparent shadow-none pointer-events-none'
      }`}
    >
      <div className="lumina-container h-11 sm:h-13 flex items-center justify-between gap-4">
        {/* Breadcrumbs List */}
        <ol className="flex items-center gap-1.5 sm:gap-2 text-xs text-stone-500 overflow-x-auto no-scrollbar py-1">
          {items.map((item, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === items.length - 1 || item.active;

            return (
              <li key={idx} className="inline-flex items-center gap-1.5 sm:gap-2 shrink-0">
                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-[#c68e58]/70 shrink-0" aria-hidden="true" />
                )}
                {isLast ? (
                  <span
                    className="text-[#2c1810] font-bold truncate max-w-[150px] sm:max-w-[280px] md:max-w-md shrink-0"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="inline-flex items-center gap-1.5 text-stone-600 hover:text-[#d36b00] font-medium transition-colors cursor-pointer shrink-0"
                  >
                    {isFirst && <Home className="w-3.5 h-3.5 text-stone-500 hover:text-[#d36b00]" />}
                    <span>{item.label}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ol>

        {/* Optional Right Action (e.g. Favorite / Share on Product Detail) */}
        {rightAction && <div className="flex items-center gap-2 shrink-0">{rightAction}</div>}
      </div>
    </nav>
  );
};
