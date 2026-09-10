import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ViewTab, Product } from '../types';
import {
  HERO_IMAGE,
  STORY_IMAGE_POUROVER,
  STORY_IMAGE_CHERRIES,
  PRODUCTS,
  TESTIMONIALS,
} from '../data/coffeeData';
import {
  ShieldCheck,
  Flame,
  Bike,
  ArrowRight,
  Star,
  Plus,
  Check,
  Thermometer,
  Leaf,
  Droplets,
  Coffee,
  Sparkles,
  Calendar,
  Layers,
  Compass,
  Award,
} from 'lucide-react';

interface HomeViewProps {
  onSelectTab: (tab: ViewTab) => void;
  onOpenProductModal: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
  onOpenWorkshopModal: () => void;
  onOpenQuickDelivery?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onOpenProductModal,
  onQuickAddToCart,
  onOpenWorkshopModal,
  onOpenQuickDelivery,
}) => {
  // Real-time Countdown Timer for Geisha Batch #402
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 28,
    seconds: 5,
  });

  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 3, minutes: 45, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAddToCart(product);
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const geishaProduct = PRODUCTS.find((p) => p.id === 'geisha-batch-402') || PRODUCTS[0];
  const signatureProducts = PRODUCTS.slice(0, 3);

  // Craft Process Steps
  const craftSteps = [
    {
      step: '01',
      title: 'Tuyển Hái 100% Trái Chín',
      subtitle: 'Cao Nguyên Cầu Đất (1.650m)',
      desc: 'Từng quả cà phê Arabica Typica & Bourbon được người nông dân bản địa hái tay thủ công, đạt độ chín mọng hoàn hảo với lượng đường brix trên 22°.',
      icon: <Leaf className="w-5 h-5 text-[#835423]" />,
    },
    {
      step: '02',
      title: 'Sơ Chế Mật Phơi Giàn Kính',
      subtitle: 'Honey & Natural Processing',
      desc: 'Hạt được ủ lên men tự nhiên và phơi nắng chậm trên giàn cao trong nhà vòm kính kiểm soát vi khí hậu suốt 30 ngày, giữ trọn lớp men ngọt mộc mạc.',
      icon: <Compass className="w-5 h-5 text-[#ea7c1b]" />,
    },
    {
      step: '03',
      title: 'Rang Mộc Mẻ Nhỏ Probat',
      subtitle: 'Artisanal Roasting Curves',
      desc: 'Mỗi mẻ 12kg được kiểm soát nhiệt độ thời gian thực bởi Roaster Master, chỉ rang vừa (medium) để bảo tồn axit hữu cơ và nốt hương hoa quả thanh sáng.',
      icon: <Flame className="w-5 h-5 text-[#d36b00]" />,
    },
    {
      step: '04',
      title: 'Cupping & Đóng Gói Van 1 Chiều',
      subtitle: 'SCA Protocol Cupping 86+',
      desc: 'Kiểm tra cảm quan nghiêm ngặt theo tiêu chuẩn quốc tế SCA trước khi đóng gói túi zip màng nhôm bảo quản khí CO2 tươi mới trong vòng 24 giờ.',
      icon: <Award className="w-5 h-5 text-[#835423]" />,
    },
  ];

  return (
    <div className="w-full flex flex-col overflow-hidden">
      {/* SECTION 1: HERO (Cinematic & Immersive Editorial Header) */}
      <section className="relative w-full min-h-[920px] flex items-center justify-center -mt-20 pt-24 pb-20 bg-[#201206] overflow-hidden">
        {/* Cinematic Visual Layer */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-luminosity"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#201206]/85 via-[#201206]/60 to-[#201206]" />

        <div className="relative z-10 lumina-container py-16 flex flex-col items-center text-center">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-8 border border-white/15 shadow-xs max-w-full"
          >
            <span className="w-2 h-2 rounded-full bg-[#ea7c1b] animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] uppercase text-[#ffdcc3] tracking-[0.1em] sm:tracking-[0.2em] font-bold text-center">
              MÙA VỤ SPECIALTY 2025 • CAO NGUYÊN CẦU ĐẤT 1.650M
            </span>
          </motion.div>

          {/* Editorial Display Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[1.15] text-[#fcf9f8] max-w-4xl tracking-tight mb-6 font-semibold"
          >
            Đánh thức mọi giác quan bằng hương vị cà phê mộc nguyên bản
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#ffdcc3]/90 max-w-2xl font-light mb-12 leading-relaxed"
          >
            Từng mẻ Arabica thượng hạng được rang mộc thủ công trong ngày tại xưởng, bảo tồn trọn vẹn lớp hương hoa trái thanh tao từ những triền dốc mờ sương Đà Lạt.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 mb-16 w-full max-w-md sm:max-w-none"
          >
            <button
              onClick={() => onSelectTab('menu')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-sm font-bold bg-[#d36b00] text-white py-4 px-6 sm:px-7 rounded-xl hover:bg-[#b85b00] transition-all duration-300 shadow-[0_4px_20px_rgba(211,107,0,0.35)] hover:-translate-y-0.5 cursor-pointer active:scale-95"
            >
              <span>Khám Phá Thực Đơn</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {onOpenQuickDelivery && (
              <button
                onClick={onOpenQuickDelivery}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold bg-white text-[#2c1810] py-4 px-6 sm:px-7 rounded-xl hover:bg-[#ffdcc3] transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer active:scale-95"
              >
                <Bike className="w-4 h-4 text-[#d36b00]" />
                <span>Đặt Giao Ngay (25-30p)</span>
              </button>
            )}
            <button
              onClick={() => {
                const el = document.getElementById('locations');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else onSelectTab('locations');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-semibold bg-white/10 text-[#fcf9f8] py-4 px-6 sm:px-7 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 border border-white/15 cursor-pointer"
            >
              Trải Nghiệm Tại Quán
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl pt-8 border-t border-white/10"
          >
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10">
              <ShieldCheck className="w-5 h-5 text-[#ea7c1b] shrink-0" />
              <span className="text-xs font-semibold text-[#ffdcc3] tracking-wide text-center">
                100% Arabica Cầu Đất (SCA 86+)
              </span>
            </div>
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10">
              <Flame className="w-5 h-5 text-[#ea7c1b] shrink-0" />
              <span className="text-xs font-semibold text-[#ffdcc3] tracking-wide text-center">
                Rang Mộc Mẻ Nhỏ &lt; 48 Giờ
              </span>
            </div>
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10">
              <Bike className="w-5 h-5 text-[#ea7c1b] shrink-0" />
              <span className="text-xs font-semibold text-[#ffdcc3] tracking-wide text-center">
                Giao Hỏa Tốc 20 Phút
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: OUR STORY (Editorial Magazine Layout) */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-[#fcf9f8] py-20 lg:py-28 border-b border-[#e8dfd1]"
      >
        <div className="lumina-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Asymmetric Left Column: Visual Storytelling */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_32px_-4px_rgba(56,34,15,0.08)] aspect-[4/5] max-h-[440px] lg:max-h-none bg-[#f0eded] border border-[#e8dfd1]">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  src={STORY_IMAGE_POUROVER}
                  alt="Nghệ thuật pha pour-over tại xưởng rang Lumina"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 bg-gradient-to-t from-[#201206]/95 via-[#201206]/60 to-transparent">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#ffdcc3] block mb-1.5 font-bold">
                    THỔ NHƯỠNG CẦU ĐẤT — ĐỘ CAO 1.650M
                  </span>
                  <p className="font-serif text-lg sm:text-xl text-white font-normal leading-snug">
                    Sương mây bao phủ quanh năm, hạt chín chậm tích tụ vị chua thanh khiết và hậu vị mật hoa rừng.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-xl overflow-hidden shadow-xs bg-[#f0eded] border border-[#e8dfd1]">
                  <img
                    className="w-full h-full object-cover"
                    src={STORY_IMAGE_CHERRIES}
                    alt="Thu hoạch quả cà phê chín mọng bằng tay"
                  />
                </div>
                <div className="p-6 rounded-xl bg-[#f6f3f2] flex flex-col justify-center border border-[#e8dfd1]">
                  <span className="font-serif text-3xl sm:text-4xl text-[#835423] font-bold">100%</span>
                  <span className="text-xs text-[#51443a] leading-relaxed mt-1.5 font-medium">
                    Hạt chín tuyển chọn thủ công, sàng lọc khuyết tật cơ học tuyệt đối
                  </span>
                </div>
              </div>
            </div>

            {/* Asymmetric Right Column: Editorial Text */}
            <div className="lg:col-span-7 flex flex-col lg:pl-4">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-[#ea7c1b]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#835423] font-bold">
                  DI SẢN &amp; TRIẾT LÝ RANG MỘC
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#2c1810] mb-6 leading-[1.25] font-semibold">
                Hành trình từ triền đồi Cầu Đất đến giọt cà phê hoàn hảo
              </h2>

              <div className="space-y-4 text-[#51443a] text-base leading-relaxed mb-8">
                <p>
                  <span className="float-left font-serif text-5xl leading-none font-bold text-[#835423] mr-3.5 mt-1">
                    L
                  </span>
                  umina khởi nguồn từ niềm say mê trước tầng terroir độc bản của vùng cao nguyên Cầu Đất, Đà Lạt. Ở độ cao 1.650m với nền đất đỏ bazan màu mỡ cùng biên độ nhiệt ngày đêm lớn, cây cà phê Arabica Typica và Bourbon tích lũy hàm lượng đường tự nhiên phong phú, mang lại nốt hương cam chanh thanh nhã cùng hậu vị mật ong ngọt sâu.
                </p>
                <p>
                  Chúng tôi gìn giữ phương pháp sơ chế mật (Honey Processing) và sơ chế tự nhiên (Natural Processing) với thời gian phơi nắng trên giàn cao trong nhà vòm kính suốt 30 ngày, nhằm bảo toàn vẹn nguyên lớp men đường tự nhiên bao bọc quanh hạt nhân.
                </p>
              </div>

              <blockquote className="p-6 rounded-xl bg-white border border-[#e8dfd1] shadow-xs mb-8">
                <p className="font-serif text-lg italic text-[#2c1810] leading-snug">
                  “Rang cà phê không chỉ đơn thuần là việc áp dụng nhiệt lượng, mà là sự tĩnh tại lắng nghe âm thanh nổ đầu tiên của mẻ hạt để lưu giữ trọn vẹn tinh túy của trời đất.”
                </p>
                <span className="block mt-3 text-xs uppercase tracking-wider text-[#835423] font-semibold">
                  — NGUYỄN VĂN AN, CHỦ NHIỆM RANG ROASTERY MASTER
                </span>
              </blockquote>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-5 rounded-xl bg-[#f6f3f2] border border-[#e8dfd1] mb-8 text-center sm:text-left">
                <div>
                  <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#835423] block">1.650m</span>
                  <span className="text-[11px] sm:text-xs text-[#51443a] font-medium">Độ cao thổ nhưỡng</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#835423] block">100%</span>
                  <span className="text-[11px] sm:text-xs text-[#51443a] font-medium">Trái chín hái tay</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#835423] block">86.5+</span>
                  <span className="text-[11px] sm:text-xs text-[#51443a] font-medium">Điểm SCA Specialty</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onSelectTab('about')}
                  className="inline-flex items-center gap-2.5 py-3 px-6 border-2 border-[#c68e58] text-[#38220f] font-semibold rounded-xl hover:bg-[#c68e58] hover:text-white transition-all duration-300 shadow-xs cursor-pointer whitespace-nowrap active:scale-95"
                >
                  <span>Khám Phá Di Sản Lumina</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: CRAFT PROCESS (Bean-to-Cup Roastery Excellence) */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-[#faf6f0] py-20 lg:py-28 border-b border-[#e8dfd1]"
      >
        <div className="lumina-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#835423] font-bold block mb-2">
                NGHỆ THUẬT CHẾ TÁC THỦ CÔNG • BEAN TO CUP
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#2c1810] leading-tight font-semibold">
                Quy Trình 4 Bước Tạo Nên Giọt Cà Phê Mộc
              </h2>
            </div>
            <p className="text-sm text-[#51443a] max-w-md leading-relaxed">
              Mỗi giọt cà phê Lumina là sự cộng hưởng khắt khe giữa tự nhiên hoang sơ và tay nghề của những nghệ nhân rang mộc tận tụy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {craftSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group bg-white rounded-2xl p-7 border border-[#e8dfd1] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-[#835423]/40 group-hover:text-[#d36b00] transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#faf6f0] border border-[#e8dfd1] flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>

                  <span className="text-[11px] uppercase tracking-wider text-[#837469] font-bold block mb-1.5">
                    {step.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2c1810] mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#51443a] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f0eded]">
                  <span className="text-[10px] text-[#835423] font-semibold uppercase tracking-widest flex items-center gap-1">
                    <span>Chuẩn kiểm duyệt Roastery</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d36b00]" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: SIGNATURE MENU (Refined Warm Editorial Palette) */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-[#f8f3ec] py-20 lg:py-28 border-b border-[#e8dfd1]"
        id="menu-signature"
      >
        <div className="lumina-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#835423] font-bold block mb-2">
                BỘ SƯU TẬP ĐẶC SẢN • SIGNATURE SELECTION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#2c1810] leading-tight font-semibold">
                Những Tách Cà Phê Được Yêu Thích Nhất
              </h2>
            </div>
            <p className="text-sm text-[#51443a] max-w-md leading-relaxed">
              Mỗi món đồ uống là một công thức cân bằng tinh tế giữa nền espresso mộc hảo hạng và nguyên liệu địa phương tuyển chọn.
            </p>
          </div>

          {/* 3 Featured Products Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {signatureProducts.map((prod, index) => {
              const isAdded = addedItemIds[prod.id];
              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  onClick={() => onOpenProductModal(prod)}
                  className="group bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(56,34,15,0.06)] hover:shadow-[0_12px_32px_rgba(56,34,15,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer border border-[#e8dfd1]"
                >
                  <div>
                    {/* Inner image container (Nested radius: 16px - 4px = 12px / rounded-xl) */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#f0eded] mb-5 border border-[#e8dfd1]/60">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={prod.imageUrl}
                        alt={prod.name}
                      />
                      <span className={`absolute top-3 left-3 px-2.5 py-1 ${prod.tagColor || 'bg-[#835423]'} text-white text-[10px] uppercase rounded-md font-bold tracking-wider shadow-xs whitespace-nowrap`}>
                        {prod.tag}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1 text-[#ea7c1b]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-xs font-bold text-[#2c1810]">{prod.rating.toFixed(1)}</span>
                        <span className="text-xs text-[#837469]">({prod.reviewCount})</span>
                      </div>
                      <span className="text-[11px] text-[#835423] uppercase font-semibold tracking-wide">
                        {prod.brewInfo}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-[22px] text-[#2c1810] group-hover:text-[#d36b00] transition-colors mb-2 font-bold leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#51443a] line-clamp-2 mb-4 leading-relaxed font-normal">
                      {prod.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#e8dfd1] mt-2">
                    <div>
                      {prod.originalPrice && (
                        <span className="text-xs text-[#837469] line-through block font-medium">
                          {prod.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                      )}
                      <span className="font-serif text-2xl text-[#d36b00] font-bold">
                        {prod.price.toLocaleString('vi-VN')}đ
                      </span>
                    </div>

                    <button
                      aria-label="Thêm vào giỏ hàng"
                      onClick={(e) => handleQuickAdd(prod, e)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90 cursor-pointer ${
                        isAdded
                          ? 'bg-[#2e7d32] text-white'
                          : 'bg-[#d36b00] hover:bg-[#b85b00] text-white'
                      }`}
                    >
                      {isAdded ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="w-full flex justify-center mt-12">
            <button
              onClick={() => onSelectTab('menu')}
              className="inline-flex items-center gap-2.5 py-4 px-8 bg-[#2c1810] text-white font-bold rounded-xl shadow-md hover:bg-[#38220f] transition-all duration-300 text-sm cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <span>Xem Toàn Bộ Thực Đơn Đặc Sản</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: DAILY MICRO-LOT RESERVE (Limited Roast & Live Sensory) */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-[#fcf9f8] py-20 lg:py-28 border-b border-[#e8dfd1]"
      >
        <div className="lumina-container">
          <div className="bg-white rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm border border-[#e8dfd1] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Flash Roast Reserve Product */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#ea7c1b] text-white text-[10px] uppercase font-bold tracking-wider whitespace-nowrap">
                    MẺ RANG ĐẶC QUYỀN
                  </span>
                  <span className="text-xs text-[#835423] uppercase tracking-wider font-semibold">
                    LIMITED DAILY MICRO-LOT RESERVE
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#2c1810] mb-3 font-bold leading-tight">
                  Geisha Thung Lũng Cầu Đất — Micro-lot #402
                </h2>

                <p className="text-sm text-[#51443a] mb-6 leading-relaxed">
                  Chỉ đúng 25 gói được rang lúc 05:30 sáng nay trên máy Probat UG22 mẻ nhỏ. Nốt hương hoa nhài tinh khiết, đào chuông giòn ngọt và hậu vị trà bá tước Bergamot thượng hạng.
                </p>

                {/* Countdown Timer Component */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex flex-col items-center bg-[#fcf9f8] px-4 py-2.5 rounded-xl shadow-xs min-w-[72px] border border-[#e8dfd1]">
                    <span className="font-serif text-2xl font-bold text-[#835423]">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-[#51443a] uppercase font-bold">Giờ</span>
                  </div>
                  <span className="font-serif text-2xl text-[#835423] font-bold">:</span>
                  <div className="flex flex-col items-center bg-[#fcf9f8] px-4 py-2.5 rounded-xl shadow-xs min-w-[72px] border border-[#e8dfd1]">
                    <span className="font-serif text-2xl font-bold text-[#835423]">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-[#51443a] uppercase font-bold">Phút</span>
                  </div>
                  <span className="font-serif text-2xl text-[#835423] font-bold">:</span>
                  <div className="flex flex-col items-center bg-[#fcf9f8] px-4 py-2.5 rounded-xl shadow-xs min-w-[72px] border border-[#e8dfd1]">
                    <span className="font-serif text-2xl font-bold text-[#d36b00]">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-[#51443a] uppercase font-bold">Giây</span>
                  </div>

                  <div className="ml-4 pl-4 border-l border-[#e8dfd1] hidden sm:block">
                    <span className="text-xs text-[#837469] block">Số lượng còn lại:</span>
                    <span className="text-sm font-bold text-[#d36b00]">07 / 25 Gói</span>
                  </div>
                </div>

                {/* Price & Action (Strict 2x padding ratio: py-3.5 px-7) */}
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-xs text-[#837469] line-through block">420.000đ</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-3xl font-bold text-[#d36b00]">295.000đ</span>
                      <span className="text-xs text-[#51443a]">/ 250gr túi zip van thở 1 chiều</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenProductModal(geishaProduct)}
                    className="inline-flex items-center justify-center text-sm font-bold bg-[#d36b00] hover:bg-[#b85b00] text-white py-3.5 px-7 rounded-xl transition-all shadow-md cursor-pointer active:scale-95 whitespace-nowrap"
                  >
                    Đặt Trước Mẻ Rang
                  </button>
                </div>
              </div>

              {/* Right: Live Roasting Sensory Box */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="bg-[#fcf9f8] rounded-xl p-6 border border-[#e8dfd1] shadow-xs relative overflow-hidden flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e8dfd1]">
                    <div className="inline-flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea7c1b] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ea7c1b]" />
                      </span>
                      <span className="text-[11px] uppercase tracking-widest text-[#835423] font-bold whitespace-nowrap">
                        MẺ RANG ĐỘC BẢN REAL-TIME
                      </span>
                    </div>
                    <span className="text-[11px] text-[#51443a] flex items-center gap-1 font-medium">
                      <Thermometer className="w-3.5 h-3.5 text-[#ea7c1b]" />
                      Probat 204°C
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-[11px] text-[#837469] uppercase tracking-wider block mb-2.5 font-bold">
                      Hồ sơ cảm quan Q-Grader (SCA Score: 92.5/100)
                    </span>
                    <div className="space-y-2">
                      <div className="p-2.5 bg-white rounded-lg flex items-center justify-between text-xs border border-[#e8dfd1]/60">
                        <span className="text-[#2c1810] flex items-center gap-2 font-medium">
                          <Leaf className="w-4 h-4 text-[#835423]" />
                          Hương hoa nhài trắng &amp; Quả đào tươi
                        </span>
                        <span className="font-bold text-[#d36b00]">9.2 / 10</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg flex items-center justify-between text-xs border border-[#e8dfd1]/60">
                        <span className="text-[#2c1810] flex items-center gap-2 font-medium">
                          <Droplets className="w-4 h-4 text-[#ea7c1b]" />
                          Độ ngọt mật ong hoa cà phê rừng
                        </span>
                        <span className="font-bold text-[#ea7c1b]">9.5 / 10</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg flex items-center justify-between text-xs border border-[#e8dfd1]/60">
                        <span className="text-[#2c1810] flex items-center gap-2 font-medium">
                          <Coffee className="w-4 h-4 text-[#755841]" />
                          Body thanh mượt tựa trà Earl Grey
                        </span>
                        <span className="font-bold text-[#755841]">9.0 / 10</span>
                      </div>
                    </div>
                  </div>

                  <blockquote className="bg-white rounded-lg p-3 mb-4 border-l-2 border-[#ea7c1b] border-y border-r border-[#e8dfd1]/60">
                    <p className="text-xs text-[#51443a] italic leading-relaxed">
                      “Hạt Geisha Cầu Đất ở độ cao 1.650m chỉ bộc lộ hết sự tinh tế khi được rang ở profile Light-Omni kiểm soát tỉ mỉ từng giây hạ nhiệt.”
                    </p>
                    <span className="block mt-1 text-[10px] text-[#835423] font-bold uppercase tracking-wider">
                      — Roaster Master Lumina
                    </span>
                  </blockquote>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                      <span className="text-[#51443a]">Tiến độ giữ chỗ mẻ rang:</span>
                      <span className="font-bold text-[#d36b00]">18 / 25 gói (Còn 7 gói)</span>
                    </div>
                    <div className="w-full bg-[#f0eded] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#d36b00] h-full rounded-full transition-all duration-500" style={{ width: '72%' }} />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#837469] mt-1.5 font-semibold">
                      <span>Túi #01</span>
                      <span className="text-[#835423]">Tỷ lệ đặt trước: 72%</span>
                      <span>Túi #25</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6: TESTIMONIALS (Dark Editorial Mode & Deep Warm Espresso) */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-[#201206] py-20 lg:py-28 text-[#fcf9f8]"
      >
        <div className="lumina-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#ffdcc6] font-semibold block mb-2">
              ĐỒNG ĐIỆU CÙNG TÌNH YÊU CÀ PHÊ
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-white leading-tight font-semibold">
              Góc Nhìn Từ Những Chuyên Gia &amp; Người Đồng Điệu
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-white/[0.04] rounded-2xl p-7 sm:p-8 flex flex-col justify-between backdrop-blur-sm border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-white/[0.07] transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#ea7c1b] mb-5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[#ffdcc3]/90 italic leading-relaxed mb-8 font-light">
                    “{review.comment}”
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 shrink-0 border border-[#ea7c1b]/40">
                    <img
                      className="w-full h-full object-cover"
                      src={review.avatarUrl}
                      alt={review.name}
                    />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      {review.name}
                    </span>
                    <span className="text-xs text-[#ffdcc6]/80 block font-medium mt-0.5">
                      {review.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 7: ARCHITECTURAL NETWORK & ATELIERS */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-[#fcf9f8] pt-20 pb-16"
        id="locations"
      >
        <div className="lumina-container">
          {/* Massive Display Statement */}
          <div className="overflow-hidden py-4 mb-12 text-center sm:text-left">
            <h2 className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[96px] xl:text-[108px] leading-none font-bold text-[#2c1810] tracking-tighter uppercase select-none opacity-90">
              LUMINA COFFEE
            </h2>
          </div>

          {/* Architectural Grid: Branches & Atelier Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {/* Hanoi Branch */}
            <div className="p-7 bg-white rounded-2xl shadow-xs border border-[#e8dfd1] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] uppercase tracking-widest text-[#835423] font-bold">
                    CHI NHÁNH 01
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2e7d32]" title="Đang mở cửa" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2c1810] mb-2">
                  Hà Nội — Hoàn Kiếm Roastery
                </h3>
                <p className="text-xs text-[#51443a] mb-4 leading-relaxed">
                  Số 18 Tràng Thi, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội
                </p>
                <p className="text-xs text-[#837469]">
                  Hotline đặt bàn:{' '}
                  <a href="tel:02439821199" className="text-[#2c1810] font-bold hover:text-[#d36b00]">
                    024 3982 1199
                  </a>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f0eded]">
                <span className="text-[11px] text-[#835423] uppercase font-bold tracking-wide">
                  Mở cửa: 07:00 – 22:30 hàng ngày
                </span>
              </div>
            </div>

            {/* Saigon Branch */}
            <div className="p-7 bg-white rounded-2xl shadow-xs border border-[#e8dfd1] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] uppercase tracking-widest text-[#835423] font-bold">
                    CHI NHÁNH 02
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2e7d32]" title="Đang mở cửa" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2c1810] mb-2">
                  Sài Gòn — Thảo Điền Atelier
                </h3>
                <p className="text-xs text-[#51443a] mb-4 leading-relaxed">
                  Số 42 Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh
                </p>
                <p className="text-xs text-[#837469]">
                  Hotline đặt bàn:{' '}
                  <a href="tel:02873004884" className="text-[#2c1810] font-bold hover:text-[#d36b00]">
                    028 7300 4884
                  </a>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f0eded]">
                <span className="text-[11px] text-[#835423] uppercase font-bold tracking-wide">
                  Mở cửa: 06:30 – 23:00 hàng ngày
                </span>
              </div>
            </div>

            {/* Cupping & Workshop Roastery Experience */}
            <div className="p-7 bg-[#2c1810] rounded-2xl text-white flex flex-col justify-between shadow-md border border-[#38220f] sm:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#ffdcc3] font-bold">
                    ĐẶC QUYỀN TRẢI NGHIỆM TẠI XƯỞNG
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ea7c1b]/20 text-[#ffdcc3] border border-[#ea7c1b]/30 text-[9px] uppercase font-bold tracking-wider">
                    Thứ 7 &amp; CN
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                  Workshop Cupping &amp; Thử Nếm Hạt
                </h3>
                <p className="text-xs text-[#ffdcc3]/85 mb-6 leading-relaxed">
                  Gặp gỡ trực tiếp Roaster Master, học cách phân biệt hương vị SCA và tự tay pha chế pour-over V60 chuẩn barista.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenWorkshopModal}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#ea7c1b] hover:bg-[#d36b00] text-white text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Đăng Ký Tham Gia Cupping</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};


