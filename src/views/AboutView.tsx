import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewTab } from '../types';
import {
  STORY_IMAGE_POUROVER,
  STORY_IMAGE_CHERRIES,
} from '../data/coffeeData';
import {
  Award,
  Leaf,
  Flame,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Mountain,
  Sun,
  CloudFog,
  TreePine,
  CheckCircle2,
  XCircle,
  Users,
  Quote,
  Sparkles,
  Compass,
  Calendar
} from 'lucide-react';

interface AboutViewProps {
  onSelectTab: (tab: ViewTab) => void;
  onOpenWorkshopModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onSelectTab,
  onOpenWorkshopModal,
}) => {
  const [activeTabTerroir, setActiveTabTerroir] = useState<number>(0);

  const terroirPillars = [
    {
      id: 'altitude',
      title: 'Độ Cao 1.650m',
      subtitle: 'Biên độ nhiệt ngày - đêm chênh lệch 15°C',
      desc: 'Tại độ cao đỉnh Cầu Đất, không khí se lạnh làm chậm chu trình sinh trưởng của quả cà phê từ 7 lên 9 tháng. Nhờ vậy, hạt cà phê tích lũy lượng đường fructose tự nhiên và các tiền chất hương hoa dồi dào gấp hai lần so với vùng đồng bằng.',
      metric: '1.650m',
      metricLabel: 'Độ cao đỉnh đồi',
      icon: <Mountain className="w-5 h-5 text-[#ea7c1b]" />,
      badge: 'KHÍ HẬU VÙNG CAO'
    },
    {
      id: 'soil',
      title: 'Đất Đỏ Bazan Núi Lửa Cổ',
      subtitle: 'Thổ nhưỡng tơi xốp giàu khoáng chất magiê & sắt',
      desc: 'Tầng đất đỏ bazan cổ hình thành từ tro bụi núi lửa hàng triệu năm trước có độ pH cân bằng hoàn hảo (5.2 - 5.8). Thổ nhưỡng này giúp rễ cây cà phê đâm sâu 3 mét, hút trọn khoáng chất vi lượng để tạo nên vị chua thanh tao (citric acidity) sáng rõ như cam chanh và quả mọng.',
      metric: 'pH 5.5',
      metricLabel: 'Độ cân bằng đất',
      icon: <Sun className="w-5 h-5 text-[#ea7c1b]" />,
      badge: 'THỔ NHƯỠNG CỔ ĐẠI'
    },
    {
      id: 'climate',
      title: 'Sương Mù & Rừng Tán Che',
      subtitle: 'Canh tác nông lâm kết hợp (Agroforestry)',
      desc: 'Được bao phủ bởi sương sớm quanh năm và che bóng bởi các cây gỗ bản địa lâu năm (cây dổi rừng, muồng đen). Bóng râm tự nhiên lọc bớt bức xạ mặt trời gay gắt, giữ ẩm cho đất và nuôi dưỡng hệ vi sinh vật bản địa tự nhiên không cần phân bón hóa học.',
      metric: '85%',
      metricLabel: 'Độ ẩm sương mây',
      icon: <CloudFog className="w-5 h-5 text-[#ea7c1b]" />,
      badge: 'SINH THÁI TỰ NHIÊN'
    }
  ];

  const journeySteps = [
    {
      num: 'Giai Đoạn 01',
      title: 'Bảo Tồn Giống Thuần Chủng Typica & Bourbon Cổ',
      subtitle: 'Di sản cà phê từ năm 1931',
      desc: 'Lumina kiên quyết duy trì và nhân giống những cây Typica, Bourbon cổ thụ thuần chủng trên sườn đồi Cầu Đất, từ chối lai tạo với các giống công nghiệp năng suất cao nhưng hương vị nhạt nhòa.',
      icon: <TreePine className="w-5 h-5 text-[#ea7c1b]" />,
    },
    {
      num: 'Giai Đoạn 02',
      title: 'Tuyển Hái Thủ Công 100% Trái Chín Mọng',
      subtitle: 'Loại bỏ hoàn toàn hạt xanh hay khuyết tật',
      desc: 'Người nông dân đồng bào K’Ho lựa hái bằng tay từng chùm trái chín đỏ thẫm trên cây qua 3 đợt hái tỉ mỉ, đảm bảo độ ngọt Brix đạt từ 22° đến 24° trước khi đưa vào sơ chế.',
      icon: <Leaf className="w-5 h-5 text-[#ea7c1b]" />,
    },
    {
      num: 'Giai Đoạn 03',
      title: 'Phơi Giàn Vòm Kính 25 – 30 Ngày Tự Nhiên',
      subtitle: 'Lên men kiểm soát vi sinh Natural & Honey',
      desc: 'Cà phê được rải đều trên giàn gỗ cao cách mặt đất 80cm trong nhà kính thông gió. Nhiệt độ và độ ẩm được theo dõi đo đạc hàng ngày giúp mật ngọt tự nhiên thấm trọn vào phôi hạt.',
      icon: <Award className="w-5 h-5 text-[#ea7c1b]" />,
    },
    {
      num: 'Giai Đoạn 04',
      title: 'Rang Mộc Thủ Công Bằng Máy Probat Của Đức',
      subtitle: 'Đồ thị nhiệt chính xác đến từng giây',
      desc: 'Xưởng rang Lumina sử dụng máy Probat trống gang truyền thống, ứng dụng nguyên lý dẫn nhiệt đối lưu để bộc lộ tầng hương hoa quả mà không làm cháy sém dầu béo của hạt.',
      icon: <Flame className="w-5 h-5 text-[#ea7c1b]" />,
    },
    {
      num: 'Giai Đoạn 05',
      title: 'Kiểm Định Thử Nếm Mù Đạt Chuẩn SCA Toàn Cầu',
      subtitle: '10 chỉ tiêu khắt khe bởi Q-Grader',
      desc: 'Từng mẻ rang đều trải qua buổi thử nếm mù (Blind Cupping) chấm điểm 10 tiêu chí quốc tế: Fragrance, Flavor, Aftertaste, Acidity, Body, Balance... Chỉ những mẻ trên 85 điểm SCA mới được đóng gói.',
      icon: <ShieldCheck className="w-5 h-5 text-[#ea7c1b]" />,
    },
  ];

  const pledges = [
    {
      pledge: 'KHÔNG tẩm bơ, rượu, caramen cháy hay ngũ cốc độn',
      reason: 'Giữ trọn vẹn bản sắc hương vị tự nhiên của hạt Arabica cao nguyên, bảo vệ máy pha và cơ thể người thưởng thức.'
    },
    {
      pledge: 'KHÔNG hương liệu hóa chất công nghiệp tổng hợp',
      reason: 'Nói không với tinh chất vani nhân tạo, ethyl hazelnut hay chất tạo mùi cà phê hóa học phổ biến trên thị trường thương mại.'
    },
    {
      pledge: 'KHÔNG chất bảo quản & chất tạo bọt nhân tạo',
      reason: 'Lớp bọt Crema dày dặn và lớp foam Nitro sánh mịn hoàn toàn sinh ra từ khí CO2 tự nhiên trong hạt mới rang.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#fcf9f8] min-h-screen pb-16 overflow-x-clip"
    >
      <div className="lumina-container pt-6 sm:pt-10">
        {/* Editorial Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#835423]/10 text-[#835423] text-xs font-bold uppercase mb-4 border border-[#835423]/20">
              <Compass className="w-3.5 h-3.5 text-[#ea7c1b]" />
              <span>DỰ ÁN DI SẢN CÀ PHÊ MỘC VIỆT NAM</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#2c1810] mb-6 leading-[1.15]">
              Đánh Thức Vị Ngon Nguyên Bản Của Cao Nguyên Cầu Đất 1.650m
            </h1>
            <p className="text-base text-[#51443a] leading-relaxed mb-4">
              Lumina Coffee được khởi dựng từ niềm tin mãnh liệt: Cà phê Việt Nam không chỉ có vị đắng gắt của hạt tẩm độn, mà sở hữu những phẩm chất phong vị kỳ diệu sánh ngang với những vùng trồng specialty danh giá nhất thế giới.
            </p>
            <p className="text-base text-[#51443a] leading-relaxed mb-8">
              Tại xưởng rang Lumina, chúng tôi trả lại hạt cà phê vị mộc nguyên thủy—nơi thổ nhưỡng bazan đỏ cổ đại, những làn sương mây lãng đãng và đôi bàn tay nâng niu của người nông dân K’Ho hòa quyện thành những giọt cà phê thanh khiết, thơm ngát hương hoa quả dại.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectTab('menu')}
                className="py-3.5 px-7 rounded-xl bg-[#d36b00] hover:bg-[#b85b00] text-white font-bold text-sm shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
              >
                <span>Khám Phá Cà Phê Mộc</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenWorkshopModal}
                className="py-3.5 px-7 rounded-xl border border-[#c68e58] text-[#38220f] font-bold text-sm hover:bg-[#faf6f0] transition-all cursor-pointer active:scale-95 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#835423]" />
                <span>Đăng Ký Cupping Lab</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_16px_36px_rgba(44,24,16,0.12)] aspect-square bg-[#2c1810] border border-[#e8dfd1]">
              <img
                src={STORY_IMAGE_POUROVER}
                alt="Nghệ thuật pha pour-over thủ công"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201206]/90 via-[#201206]/30 to-transparent flex items-end p-6 sm:p-8">
                <blockquote className="text-[#ffdcc3] font-serif text-lg sm:text-xl italic leading-snug">
                  “Cà phê ngon bắt đầu từ sự tôn trọng đất đai và lòng trắc ẩn với người nông dân vùng cao.”
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 1: Interactive Terroir Cầu Đất 1.650m */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#835423] font-bold block mb-2">
              TERROIR ĐỘC BẢN • THỦ PHỦ ARABICA VIỆT NAM
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c1810] mb-3">
              3 Trụ Cột Thổ Nhưỡng Tạo Nên Vị Ngon Kỳ Diệu
            </h2>
            <p className="text-xs sm:text-sm text-[#51443a] leading-relaxed">
              Thiên nhiên ban tặng cho cao nguyên Cầu Đất sự giao thoa hiếm có giữa độ cao lý tưởng, đất núi lửa bazan giàu dưỡng chất và tầng sương mù ôn đới.
            </p>
          </motion.div>

          {/* Terroir Interactive Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-[#e8dfd1] p-6 sm:p-8 shadow-[0_4px_24px_rgba(56,34,15,0.06)]"
          >
            {/* Terroir Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              {terroirPillars.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTabTerroir(idx)}
                  className={`p-4 rounded-xl text-left transition-all cursor-pointer border flex items-start gap-3.5 ${
                    activeTabTerroir === idx
                      ? 'bg-[#faf6f0] border-[#d36b00] shadow-xs'
                      : 'bg-white border-[#e8dfd1]/70 hover:bg-[#fcf9f8]'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${activeTabTerroir === idx ? 'bg-[#ea7c1b]/20 text-[#d36b00]' : 'bg-[#f0eded] text-[#837469]'}`}>
                    {p.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#835423] block mb-0.5">
                      {p.badge}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#2c1810]">
                      {p.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Terroir Content Showcase */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabTerroir}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#faf6f0]/60 p-6 sm:p-8 rounded-xl border border-[#e8dfd1]/60"
              >
                <div className="lg:col-span-8 space-y-3">
                  <span className="text-xs uppercase tracking-widest text-[#d36b00] font-bold">
                    {terroirPillars[activeTabTerroir].subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2c1810]">
                    {terroirPillars[activeTabTerroir].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#51443a] leading-relaxed">
                    {terroirPillars[activeTabTerroir].desc}
                  </p>
                </div>
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-[#e8dfd1] shadow-xs text-center">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#835423] block mb-1">
                    {terroirPillars[activeTabTerroir].metric}
                  </span>
                  <span className="text-xs text-[#837469] font-medium">
                    {terroirPillars[activeTabTerroir].metricLabel}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* SECTION 2: 5 Craft Stages (Farm-to-Cup Journey) */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#835423] font-bold block mb-2">
              QUY TRÌNH THỦ CÔNG 5 GIAI ĐOẠN KHẮT KHE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c1810] mb-3">
              Hành Trình Từ Nông Trại Đến Tách Cà Phê
            </h2>
            <p className="text-xs sm:text-sm text-[#51443a] leading-relaxed">
              Không có đường tắt trong nghệ thuật cà phê mộc. Mỗi hạt cà phê Lumina đều trải qua chu trình 5 bước nghiêm ngặt dưới sự giám sát của các chuyên gia Q-Grader.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeySteps.map((s, index) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-[#e8dfd1] shadow-[0_4px_16px_rgba(56,34,15,0.04)] hover:shadow-[0_12px_28px_rgba(56,34,15,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#835423] bg-[#faf6f0] px-3 py-1 rounded-md border border-[#e8dfd1]/60">
                      {s.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#fdd5b8]/40 flex items-center justify-center shrink-0">
                      {s.icon}
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2c1810] mb-1 leading-snug">
                    {s.title}
                  </h3>
                  <span className="text-[11px] text-[#ea7c1b] font-semibold block mb-3">
                    {s.subtitle}
                  </span>
                  <p className="text-xs text-[#51443a] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Sixth Card: Image CTA for farm */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-[#2c1810] to-[#201206] text-white rounded-2xl p-6 border border-white/10 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#ea7c1b]/20 flex items-center justify-center text-[#ffdcc3] mb-4">
                  <Sparkles className="w-5 h-5 text-[#ea7c1b]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  Trải Nghiệm Tại Xưởng Rang
                </h3>
                <p className="text-xs text-[#ffdcc3]/80 leading-relaxed mb-6">
                  Bạn luôn được chào đón tại các xưởng rang Lumina để tận mắt chứng kiến mẻ rang Probat ra lò và tự tay thử nếm cà phê cùng Barista.
                </p>
              </div>
              <button
                onClick={onOpenWorkshopModal}
                className="py-3 px-5 rounded-xl bg-[#ea7c1b] hover:bg-[#d36b00] text-white text-xs font-bold transition-all cursor-pointer text-center active:scale-95"
              >
                Đăng ký Workshop thử nếm
              </button>
            </motion.div>
          </div>
        </div>

        {/* SECTION 3: The Pure Coffee Pledge (Cam Kết 3 Không) */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-[#e8dfd1] p-8 sm:p-12 shadow-[0_8px_30px_rgba(56,34,15,0.06)]"
          >
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="text-xs uppercase tracking-[0.2em] text-[#d36b00] font-bold block mb-2">
                TUYÊN NGÔN TRỌN ĐỜI CỦA LUMINA
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c1810] mb-3">
                Cam Kết “3 KHÔNG” Tuyệt Đối Của Cà Phê Mộc
              </h2>
              <p className="text-xs sm:text-sm text-[#51443a] leading-relaxed">
                Chúng tôi cam kết bồi hoàn 200% nếu phát hiện bất kỳ hạt cà phê nào của Lumina bị sao tẩm hóa chất hay hương liệu công nghiệp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pledges.map((p, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#faf6f0] border border-[#e8dfd1]/80 space-y-3"
                >
                  <div className="flex items-center gap-2 text-[#d36b00]">
                    <XCircle className="w-5 h-5 text-[#d36b00] shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#835423]">
                      CAM KẾT 0{idx + 1}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#2c1810] leading-snug">
                    {p.pledge}
                  </h4>
                  <p className="text-xs text-[#51443a] leading-relaxed">
                    {p.reason}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: Direct Trade & Community Voices */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#201206] text-[#fcf9f8] rounded-2xl p-8 sm:p-12 mb-16 relative overflow-hidden border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 mb-10">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#ffdcc3] text-xs font-bold uppercase mb-4 border border-white/10">
                <HeartHandshake className="w-4 h-4 text-[#ea7c1b]" />
                <span>DIRECT TRADE • THUƠNG MẠI TRỰC TIẾP CÔNG BẰNG</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Cam Kết Thu Mua Cao Hơn 40% So Với Giá Thị Trường Tự Do
              </h2>
              <p className="text-sm text-[#ffdcc3]/85 leading-relaxed mb-6">
                Lumina liên kết chặt chẽ với 18 hộ nông dân đồng bào K’Ho tại thôn Đất Làng và sườn núi LangBiang. Bằng việc bao tiêu toàn bộ sản lượng đạt chuẩn Specialty với mức giá cao hơn tối thiểu 40% thị trường thương mại, chúng tôi giúp bà con ổn định sinh kế, kiên trì canh tác hữu cơ bền vững và bảo tồn mạch nước ngầm rừng nguyên sinh.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onSelectTab('locations')}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#ea7c1b] hover:bg-[#d36b00] text-white text-xs font-bold transition-all cursor-pointer active:scale-95"
                >
                  <span>Ghé thăm xưởng rang và kết nối nguồn hạt</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-8 rounded-2xl bg-white/[0.06] border border-white/10 text-center w-full max-w-xs backdrop-blur-sm shadow-xl space-y-6">
                <div>
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-[#ffdcc3] block mb-1">
                    18+
                  </span>
                  <span className="text-xs text-[#fcf9f8]/90 font-semibold">
                    Nông Hộ Đối Tác Trực Tiếp
                  </span>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-[#ea7c1b] block mb-1">
                    +42%
                  </span>
                  <span className="text-xs text-[#fcf9f8]/90 font-semibold">
                    Thu Nhập Nông Dân Tăng Thêm
                  </span>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-[#ffdcc3] block mb-1">
                    12.500
                  </span>
                  <span className="text-xs text-[#fcf9f8]/90 font-semibold">
                    Cây Bản Địa Trồng Phủ Rừng
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Artisan Testimonial / Story Quote inside Direct Trade */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-start gap-4">
              <Quote className="w-6 h-6 text-[#ea7c1b] shrink-0 opacity-80" />
              <div>
                <p className="text-xs text-[#ffdcc3]/90 italic leading-relaxed mb-3">
                  “Từ ngày làm cà phê hái chín cùng Lumina, tôi không còn phải lo giá rớt mùa mưa. Cây cà phê được sống tự nhiên dưới bóng cây dổi rừng, đất sạch và con cái được đi học đầy đủ.”
                </p>
                <div className="text-xs font-bold text-white">
                  Chú K’Nang — <span className="text-[#ffdcc3]/70 font-normal">Nông hộ 28 năm tại thôn Đất Làng, Cầu Đất</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-start gap-4">
              <Quote className="w-6 h-6 text-[#ea7c1b] shrink-0 opacity-80" />
              <div>
                <p className="text-xs text-[#ffdcc3]/90 italic leading-relaxed mb-3">
                  “Rang mộc không thể giấu giếm bất cứ khuyết tật nào của hạt. Nếu hạt ngon và hái chín chuẩn, ngọn lửa rang chỉ đóng vai trò đánh thức những nốt hoa quả tinh túy nhất mà đất trời đã ấp ủ.”
                </p>
                <div className="text-xs font-bold text-white">
                  Trần Hoàng Long — <span className="text-[#ffdcc3]/70 font-normal">Q-Grader &amp; Head Roaster tại Lumina</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
