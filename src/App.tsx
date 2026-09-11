import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConfigProvider, App as AntdApp, message } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { coreAntdTheme } from './core/theme/antdTheme';
import { I18nProvider, useI18n } from './core/i18n/I18nContext';
import { ToastProvider, useToast } from './core/notification/ToastContext';
import { SEOHead } from './core/seo/SEOHead';
import { ClientReviewBar } from './core/review-bar/ClientReviewBar';
import { AppPreloader } from './core/components/AppPreloader';
import { ViewTab, Product, CartItem, UserProfile, QuickDeliveryOrder } from './types';
import { PRODUCTS } from './data/coffeeData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WorkshopModal } from './components/WorkshopModal';
import { QuickDeliveryModal } from './components/QuickDeliveryModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { HomeView } from './views/HomeView';
import { MenuView } from './views/MenuView';
import { AboutView } from './views/AboutView';
import { LocationsView } from './views/LocationsView';
import { ProductDetailView } from './views/ProductDetailView';
import { SystemDesignView } from './views/SystemDesignView';
import { BreadcrumbBar, BreadcrumbItem } from './components/BreadcrumbBar';
import { Tooltip } from 'antd';
import { CheckCircle2, X, Coffee, Sparkles, Layers, Bike, Heart, Share2 } from 'lucide-react';

function AppContent() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const { t } = useI18n();

  const tabTitles: Record<ViewTab, string> = {
    home: t('nav.home'),
    menu: t('nav.menu'),
    about: t('nav.about'),
    locations: t('nav.locations'),
    'product-detail': 'Chi Tiết Sản Phẩm',
  };

  // Scroll to top on page tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('lumina_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    // Default active VIP profile so the user can immediately experience customer tier & delivery perks
    return {
      id: 'USR-8829',
      name: 'Nguyễn Minh Triết',
      email: 'minhtriet.coffee@lumina.vn',
      phone: '0908 123 456',
      address: '42 Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP.HCM',
      membershipTier: 'Hội viên Vàng',
      beansPoints: 240,
      savedAddresses: ['42 Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP.HCM'],
    };
  });

  const handleUpdateUser = (updated: UserProfile) => {
    setCurrentUser(updated);
    localStorage.setItem('lumina_user', JSON.stringify(updated));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('lumina_user');
  };

  // Recent delivery orders history
  const [ordersHistory, setOrdersHistory] = useState<QuickDeliveryOrder[]>([]);

  // Initial cart items
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return [
      {
        product: PRODUCTS[0], // Nitro Cold Brew Vân Đồn
        quantity: 1,
        grindOption: 'Ủ chậm sẵn sàng thưởng thức',
      },
      {
        product: PRODUCTS[1], // Signature Caramel Macchiato
        quantity: 1,
        sweetness: 'Nguyên bản (Chuẩn Barista)',
        milkOption: 'Sữa tươi Đà Lạt thanh trùng',
      },
    ];
  });

  // Modals & Drawers Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [isQuickDeliveryOpen, setIsQuickDeliveryOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSystemDesignOpen, setIsSystemDesignOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toast = useToast();
  const [orderSuccess, setOrderSuccess] = useState<{
    id: string;
    total: number;
    recipientName?: string;
    phone?: string;
    address?: string;
    deliverySpeed?: string;
  } | null>(null);

  const showToast = (msg: string) => {
    toast.success(msg, { title: 'Thông báo giỏ hàng' });
  };

  // Menu Category Filter State (synchronized with Breadcrumbs)
  const [menuSelectedCategory, setMenuSelectedCategory] = useState<string>('all');
  const [likedProductIds, setLikedProductIds] = useState<Record<string, boolean>>({});

  const isCurrentProductLiked = selectedProduct ? !!likedProductIds[selectedProduct.id] : false;
  const toggleCurrentProductLike = () => {
    if (!selectedProduct) return;
    const next = !isCurrentProductLiked;
    setLikedProductIds((prev) => ({ ...prev, [selectedProduct.id]: next }));
    message.info(next ? 'Đã lưu vào danh sách yêu thích!' : 'Đã bỏ yêu thích');
  };

  const handleShareCurrentProduct = async () => {
    if (!selectedProduct) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${selectedProduct.name} | Lumina Coffee`,
          text: selectedProduct.description,
          url: window.location.href,
        });
        return;
      } catch {
        // user cancelled or share failed
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      message.success('Đã sao chép liên kết sản phẩm vào bộ nhớ tạm!');
    }
  };

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    switch (currentTab) {
      case 'menu': {
        const categoryLabels: Record<string, string> = {
          'single-origin': 'Cà phê Đặc sản Specialty',
          espresso: 'Cà phê Pha Máy Espresso',
          'cold-brew': 'Cà phê Ủ Lạnh Cold Brew',
          signature: 'Đồ Uống Sáng Tạo Signature',
          gear: 'Dụng Cụ & Thiết Bị Pha',
        };
        const activeLabel = categoryLabels[menuSelectedCategory];
        return [
          { label: 'Trang chủ', onClick: () => setCurrentTab('home') },
          {
            label: 'Thực đơn',
            onClick: menuSelectedCategory !== 'all' ? () => setMenuSelectedCategory('all') : undefined,
            active: menuSelectedCategory === 'all',
          },
          ...(menuSelectedCategory !== 'all' && activeLabel
            ? [{ label: activeLabel, active: true }]
            : []),
        ];
      }
      case 'about':
        return [
          { label: 'Trang chủ', onClick: () => setCurrentTab('home') },
          { label: 'Câu chuyện thương hiệu', active: true },
        ];
      case 'locations':
        return [
          { label: 'Trang chủ', onClick: () => setCurrentTab('home') },
          { label: 'Không gian & Chi nhánh', active: true },
        ];
      case 'product-detail':
        return [
          { label: 'Trang chủ', onClick: () => setCurrentTab('home') },
          { label: 'Thực đơn', onClick: () => setCurrentTab('menu') },
          {
            label: selectedProduct?.categoryLabel || 'Cà phê Đặc sản',
            onClick: () => {
              if (selectedProduct?.category) {
                setMenuSelectedCategory(selectedProduct.category);
              }
              setCurrentTab('menu');
            },
          },
          { label: selectedProduct?.name || 'Chi tiết sản phẩm', active: true },
        ];
      default:
        return [];
    }
  };

  const getBreadcrumbRightAction = () => {
    if (currentTab === 'product-detail' && selectedProduct) {
      return (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Tooltip title="Yêu thích">
            <button
              type="button"
              onClick={toggleCurrentProductLike}
              className={`w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                isCurrentProductLiked
                  ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs'
                  : 'bg-white border-[#e8dfd1] text-stone-500 hover:text-rose-600 hover:border-rose-200'
              }`}
              aria-label="Thêm vào yêu thích"
            >
              <Heart
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  isCurrentProductLiked ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
            </button>
          </Tooltip>
          <Tooltip title="Chia sẻ sản phẩm">
            <button
              type="button"
              onClick={handleShareCurrentProduct}
              className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full border border-[#e8dfd1] bg-white hover:bg-[#f9f6f0] text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Chia sẻ sản phẩm"
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </Tooltip>
        </div>
      );
    }
    return null;
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) =>
          i.product.id === item.product.id &&
          i.grindOption === item.grindOption &&
          i.sweetness === item.sweetness &&
          i.milkOption === item.milkOption &&
          i.weightOption === item.weightOption &&
          i.subscriptionOption === item.subscriptionOption
      );
      if (existingIdx > -1) {
        return prev.map((it, idx) =>
          idx === existingIdx
            ? { ...it, quantity: it.quantity + item.quantity }
            : it
        );
      }
      return [...prev, { ...item }];
    });
    showToast(`Đã thêm ${item.product.name} vào đơn hàng`);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart({
      product,
      quantity: 1,
      grindOption: product.category === 'single-origin' ? 'Hạt mộc nguyên chất' : undefined,
    });
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      if (!prev[index]) return prev;
      const target = prev[index];
      const newQty = target.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      return prev.map((item, i) =>
        i === index ? { ...item, quantity: newQty } : item
      );
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Quick delivery order submission handler
  const handleQuickDeliveryConfirm = (order: QuickDeliveryOrder) => {
    setOrdersHistory((prev) => [order, ...prev]);
    // Award 15 points per order
    if (currentUser) {
      const updated: UserProfile = {
        ...currentUser,
        beansPoints: currentUser.beansPoints + 15,
        address: order.address,
      };
      handleUpdateUser(updated);
    }
    // Clear cart once order is confirmed
    setCartItems([]);
    setOrderSuccess({
      id: order.id,
      total: order.total,
      recipientName: order.recipientName,
      phone: order.phone,
      address: order.address,
      deliverySpeed: order.deliverySpeed === 'express' ? 'Hỏa tốc 20 - 25 phút' : 'Hẹn giờ trong ngày',
    });
  };

  const handleOrderSuccess = (orderId: string, total: number) => {
    setOrderSuccess({
      id: orderId,
      total,
      deliverySpeed: '20 - 25 phút',
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] flex flex-col font-sans selection:bg-[#fdd5b8] selection:text-[#785b44]">
      {/* Specialty Coffee Preloader Screen */}
      {isInitialLoading && (
        <AppPreloader
          minDuration={1600}
          onComplete={() => setIsInitialLoading(false)}
        />
      )}

      {/* Dynamic SEO & Meta Management */}
      <SEOHead title={tabTitles[currentTab]} />

          {/* Top Header */}
          <Header
            currentTab={currentTab}
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenQuickDelivery={() => setIsQuickDeliveryOpen(true)}
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
          />

          {/* Global Breadcrumb for all non-Home pages with Smart Headroom */}
          {currentTab !== 'home' && (
            <BreadcrumbBar
              items={getBreadcrumbItems()}
              rightAction={getBreadcrumbRightAction()}
            />
          )}

          {/* Main Content Router */}
          <main
            className={`w-full flex-1 transition-[padding] duration-300 ${
              currentTab === 'home' ? 'pt-16 sm:pt-20' : 'pt-[108px] sm:pt-[132px]'
            }`}
          >
            <AnimatePresence mode="wait">
              {currentTab === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <HomeView
                    onSelectTab={setCurrentTab}
                    onOpenProductModal={handleOpenProduct}
                    onQuickAddToCart={handleQuickAdd}
                    onOpenWorkshopModal={() => setIsWorkshopOpen(true)}
                    onOpenQuickDelivery={() => setIsQuickDeliveryOpen(true)}
                  />
                </motion.div>
              )}

              {currentTab === 'menu' && (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <MenuView
                    onOpenProductModal={handleOpenProduct}
                    onQuickAddToCart={handleQuickAdd}
                    onBackToHome={() => setCurrentTab('home')}
                    selectedCategory={menuSelectedCategory}
                    onSelectCategory={setMenuSelectedCategory}
                  />
                </motion.div>
              )}

              {currentTab === 'product-detail' && (
                <motion.div
                  key={`product-${selectedProduct?.id ?? 'default'}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductDetailView
                    product={selectedProduct ?? PRODUCTS[0]}
                    onBackToMenu={() => setCurrentTab('menu')}
                    onBackToHome={() => setCurrentTab('home')}
                    onSelectProduct={handleOpenProduct}
                    onAddToCart={handleAddToCart}
                    onOpenQuickDelivery={() => setIsQuickDeliveryOpen(true)}
                    onOpenCart={() => setIsCartOpen(true)}
                  />
                </motion.div>
              )}

              {currentTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <AboutView
                    onSelectTab={setCurrentTab}
                    onOpenWorkshopModal={() => setIsWorkshopOpen(true)}
                  />
                </motion.div>
              )}

              {currentTab === 'locations' && (
                <motion.div
                  key="locations"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <LocationsView
                    onOpenWorkshopModal={() => setIsWorkshopOpen(true)}
                    onBackToHome={() => setCurrentTab('home')}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Footer */}
          <Footer
            onSelectTab={setCurrentTab}
            onOpenWorkshopModal={() => setIsWorkshopOpen(true)}
            onOpenSystemDesign={() => setIsSystemDesignOpen(true)}
          />

          {/* Cart Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onOrderSuccess={handleOrderSuccess}
            onAddToCart={handleAddToCart}
          />

          {/* Quick Delivery Streamlined Modal */}
          <QuickDeliveryModal
            isOpen={isQuickDeliveryOpen}
            onClose={() => setIsQuickDeliveryOpen(false)}
            cartItems={cartItems}
            currentUser={currentUser}
            onUpdateQuantity={handleUpdateQuantity}
            onAddToCart={handleAddToCart}
            onConfirmOrder={handleQuickDeliveryConfirm}
            onOpenAuthModal={() => setIsAuthOpen(true)}
          />

          {/* User Authentication Modal (Login / Register) */}
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onLoginSuccess={handleUpdateUser}
          />

          {/* User Profile & Membership Modal */}
          <UserProfileModal
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            user={currentUser}
            onUpdateUser={handleUpdateUser}
            onLogout={handleLogout}
            orders={ordersHistory}
            onQuickReorder={(reorder) => {
              setCartItems(reorder.items);
              setIsQuickDeliveryOpen(true);
            }}
          />

          {/* Workshop Booking Modal */}
          <WorkshopModal
            isOpen={isWorkshopOpen}
            onClose={() => setIsWorkshopOpen(false)}
            onSuccess={showToast}
          />

          {/* Order Success Receipt Modal with smooth AnimatePresence */}
          <AnimatePresence>
            {orderSuccess && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs cursor-pointer"
                  onClick={() => setOrderSuccess(null)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-full max-w-md bg-white rounded-2xl p-6 sm:p-7 text-center shadow-2xl border border-stone-200"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-800 flex items-center justify-center mx-auto mb-3.5">
                    <Bike className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-amber-800 font-bold block mb-1">
                    ĐẶT GIAO HỎA TỐC THÀNH CÔNG
                  </span>
                  <h3 className="font-sans text-xl font-bold text-stone-900 mb-1.5">
                    Xưởng Rang Đang Chiết Xuất Mẻ Mới
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed mb-5">
                    Đơn hàng <strong>#{orderSuccess.id}</strong> đã được chuyển tới Barista gần nhất để chuẩn bị và đóng gói bảo ôn giao tận tay bạn.
                  </p>

                  <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-left mb-5 space-y-1.5">
                    <div className="flex justify-between text-stone-500 font-medium">
                      <span>Mã đơn:</span>
                      <span className="font-mono font-bold text-stone-900">#{orderSuccess.id}</span>
                    </div>
                    {orderSuccess.recipientName && (
                      <div className="flex justify-between text-stone-500 font-medium">
                        <span>Người nhận:</span>
                        <span className="font-semibold text-stone-900">
                          {orderSuccess.recipientName} ({orderSuccess.phone})
                        </span>
                      </div>
                    )}
                    {orderSuccess.address && (
                      <div className="flex justify-between text-stone-500 font-medium">
                        <span>Địa chỉ:</span>
                        <span className="font-medium text-stone-900 text-right max-w-[200px] truncate">
                          {orderSuccess.address}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-stone-500 font-medium">
                      <span>Tổng thanh toán:</span>
                      <span className="font-bold text-stone-900">
                        {orderSuccess.total.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <div className="flex justify-between text-stone-500 font-medium">
                      <span>Thời gian giao:</span>
                      <span className="font-semibold text-emerald-700">
                        {orderSuccess.deliverySpeed || '20 - 30 phút'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setOrderSuccess(null);
                        setIsProfileOpen(true);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-stone-100 text-stone-700 font-semibold text-xs hover:bg-stone-200/80 transition-colors cursor-pointer"
                    >
                      Xem lịch sử đơn
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderSuccess(null)}
                      className="flex-1 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 transition-colors cursor-pointer shadow-xs active:scale-95"
                    >
                      Hoàn tất
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Floating Discrete Dev/Design Specs Toggle */}
          <div className="fixed bottom-5 left-5 z-40">
            <button
              onClick={() => setIsSystemDesignOpen(true)}
              className="group bg-white/95 hover:bg-[#2c1810] text-[#755841] hover:text-white border border-[#e8dfd1] hover:border-[#2c1810] px-3.5 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.06)] text-[11px] font-mono flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md opacity-75 hover:opacity-100"
              title="Xem hệ thống thiết kế và design tokens độc lập"
            >
              <Layers className="w-3.5 h-3.5 text-[#ea7c1b] group-hover:text-[#ffdcc3] transition-colors" />
              <span className="font-semibold">System Design Specs</span>
            </button>
          </div>

          {/* Standalone System Design Modal Overlay */}
          {isSystemDesignOpen && (
            <div className="fixed inset-0 z-50 bg-[#fcf9f8] overflow-y-auto animate-in fade-in duration-200">
              <div className="sticky top-0 z-50 bg-[#2c1810] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#38220f] shadow-md">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ea7c1b] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                    STANDALONE SPEC
                  </span>
                  <span className="font-serif text-lg font-bold text-[#fcf9f8]">
                    Lumina Coffee • Design System &amp; Tokens
                  </span>
                </div>
                <button
                  onClick={() => setIsSystemDesignOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Quay Lại Demo Trải Nghiệm</span>
                </button>
              </div>

              <SystemDesignView
                onCopyNotice={showToast}
                onClose={() => setIsSystemDesignOpen(false)}
              />
            </div>
          )}

          {/* Client Review Floating Bar */}
          <ClientReviewBar
            onOpenSystemDesign={() => setIsSystemDesignOpen(true)}
            onReplayPreloader={() => setIsInitialLoading(true)}
          />
        </div>
  );
}

export default function App() {
  return (
    <I18nProvider defaultLocale="vi">
      <ConfigProvider theme={coreAntdTheme} locale={viVN}>
        <AntdApp>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </AntdApp>
      </ConfigProvider>
    </I18nProvider>
  );
}

