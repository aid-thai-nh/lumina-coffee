import React, { useState } from 'react';
import { ViewTab, UserProfile } from '../types';
import { ShoppingBag, Menu, X, Sparkles, MapPin, Coffee, BookOpen, User, Bike, ChevronDown } from 'lucide-react';
import { Tooltip } from 'antd';

interface HeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuickDelivery: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenQuickDelivery,
  currentUser,
  onOpenAuth,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ViewTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Trang chủ', icon: <Coffee className="w-4 h-4" /> },
    { id: 'menu', label: 'Thực đơn đặc sản', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'about', label: 'Câu chuyện di sản', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'locations', label: 'Không gian & Quán', icon: <MapPin className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: ViewTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getUserInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fcf9f8]/95 backdrop-blur-xl border-b border-[#e8dfd1]/60 shadow-[0_2px_12px_rgba(56,34,15,0.04)] transition-all">
      <div className="h-16 sm:h-20 lumina-container flex items-center justify-between gap-2">
        {/* Brand Logo - Responsive Mobile & Desktop */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left group cursor-pointer focus:outline-none flex-shrink-0"
          aria-label="Lumina Coffee Trang chủ"
        >
          {/* Mobile Logo (< sm) */}
          <div className="flex sm:hidden items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d36b00] to-[#9b4900] text-white flex items-center justify-center shadow-xs flex-shrink-0">
              <Coffee className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="font-serif text-[17px] font-extrabold tracking-wide text-[#2c1810] uppercase whitespace-nowrap">
                LUMINA
              </span>
              <span className="text-[8.5px] tracking-[0.14em] text-[#d36b00] font-bold uppercase mt-0.5 whitespace-nowrap">
                COFFEE
              </span>
            </div>
          </div>

          {/* Desktop Logo (sm:) */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d36b00] to-[#9b4900] text-white flex items-center justify-center shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#2c1810] uppercase transition-colors group-hover:text-[#d36b00] leading-tight whitespace-nowrap">
                LUMINA COFFEE
              </span>
              <span className="text-[9.5px] tracking-[0.2em] text-[#8c7a6b] uppercase font-medium whitespace-nowrap">
                ARTISANAL ROASTERY &amp; ATELIER
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation (Visible from lg: 1024px to 1440px+) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative font-semibold text-[14px] transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#d36b00] font-bold'
                    : 'text-[#51443a] hover:text-[#d36b00]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[#ea7c1b]/15 text-[#ea7c1b] px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d36b00] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          {/* Quick Delivery Action Button */}
          <button
            onClick={onOpenQuickDelivery}
            className="hidden sm:inline-flex items-center justify-center gap-2 text-[13px] bg-[#d36b00] text-white py-2.5 px-3.5 xl:px-5 rounded-full hover:bg-[#b85b00] transition-all shadow-[0_2px_8px_-2px_rgba(211,107,0,0.35)] font-bold cursor-pointer active:scale-95"
            title="Mở giao diện Đặt Giao Ngay Siêu Tốc 25-30 phút"
          >
            <Bike className="w-4 h-4" />
            <span className="hidden md:inline">Đặt giao ngay</span>
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            aria-label="Giỏ hàng"
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f0eded] hover:bg-[#eae7e7] flex items-center justify-center text-[#835423] transition-colors cursor-pointer"
            title="Giỏ hàng Lumina"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#d36b00] text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center ring-2 ring-[#fcf9f8] shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <Tooltip title={`Tài khoản: ${currentUser.name} (${currentUser.membershipTier})`}>
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1 pl-1 pr-2 sm:pr-2.5 rounded-full bg-[#f0eded] hover:bg-[#eae7e7] transition-all cursor-pointer border border-[#e8dfd1]"
                title="Quản lý tài khoản & Thẻ hội viên"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#835423] text-white flex items-center justify-center text-[11px] sm:text-xs font-bold tracking-wider shadow-xs">
                  {getUserInitials(currentUser.name)}
                </div>
                <div className="text-left hidden xl:block">
                  <span className="text-xs font-bold text-[#2c1810] block leading-tight truncate max-w-[100px]">
                    {currentUser.name.split(' ')[currentUser.name.split(' ').length - 1]}
                  </span>
                  <span className="text-[9px] text-[#d36b00] font-semibold block uppercase">
                    {currentUser.membershipTier}
                  </span>
                </div>
              </button>
            </Tooltip>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-full bg-[#2c1810] hover:bg-[#38220f] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95 whitespace-nowrap"
              title="Đăng nhập hoặc đăng ký tài khoản Lumina Coffee Club"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden min-[400px]:inline">Đăng nhập</span>
            </button>
          )}

          {/* Mobile & Tablet Hamburger (visible on < lg) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-[#51443a] hover:text-[#2c1810] rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (sm/md/tablet) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fcf9f8] border-b border-[#e8dfd1] px-6 py-4 flex flex-col gap-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center justify-between py-2 text-left font-medium text-base ${
                currentTab === item.id
                  ? 'text-[#d36b00] font-bold border-l-4 border-[#d36b00] pl-3'
                  : 'text-[#51443a]'
              }`}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
              {item.badge && (
                <span className="text-[10px] bg-[#ea7c1b]/15 text-[#ea7c1b] px-2 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-2 border-t border-[#e8dfd1] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickDelivery();
              }}
              className="w-full py-3 rounded-xl bg-[#d36b00] text-white font-bold text-sm text-center shadow-sm flex items-center justify-center gap-2"
            >
              <Bike className="w-4 h-4" />
              <span>Đặt Giao Ngay Siêu Tốc (25-30p)</span>
            </button>

            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProfile();
                }}
                className="w-full py-2.5 rounded-xl bg-white border border-[#e8dfd1] text-[#2c1810] font-semibold text-xs text-center flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-[#d36b00]" />
                <span>Tài khoản: {currentUser.name} ({currentUser.membershipTier})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-xl bg-[#2c1810] text-white font-semibold text-xs text-center flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Đăng nhập / Đăng ký Hội viên Lumina</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
