import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import Swal from 'sweetalert2';
import { 
  FileText, 
  CheckCircle, 
  CreditCard, 
  Wrench,
  ClipboardCheck,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';

export default function ScreenInstallationPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    Swal.fire({
      title: '서비스 준비 중',
      html: '보다 나은 서비스 제공을 위해 현재 준비 중입니다.<br />빠른 시일 내에 더욱 안정된 모습으로 찾아뵙겠습니다.',
      icon: 'info',
      confirmButtonText: '확인',
      confirmButtonColor: '#3b82f6',
      backdrop: true,
      allowOutsideClick: true
    });
  }, []);

  const galleryImages = [
    {
      src: 'https://i.imgur.com/zYE5EiI.png',
      alt: '방충망 시공 사례 1'
    },
    {
      src: 'https://i.imgur.com/wXkE67n.png',
      alt: '방충망 시공 사례 2'
    },
    {
      src: 'https://i.imgur.com/TKmneY1.png',
      alt: '방충망 시공 사례 3'
    }
  ];

  const procedures = [
    {
      icon: FileText,
      title: '신청서 작성',
      description: '온라인으로 간편하게 신청서를 작성해주세요',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: CheckCircle,
      title: '신청서 확인',
      description: '제출하신 신청 내용을 꼼꼼히 확인합니다',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: CreditCard,
      title: '결제 안내 및 입금 확인',
      description: '견적 확인 후 결제를 진행해주세요',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Wrench,
      title: '방충망 시공',
      description: '전문 기사님이 직접 방문하여 시공합니다',
      color: 'from-teal-500 to-emerald-500'
    },
    {
      icon: ClipboardCheck,
      title: '시공 점검 및 확인',
      description: '완벽한 시공을 위해 최종 점검합니다',
      color: 'from-green-500 to-lime-500'
    }
  ];

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(galleryImages[index].src);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex].src);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex].src);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Section 1: Hero Section with Background Image */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] mt-20 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://i.imgur.com/NdpXT7Y.png"
            alt="방충망 시공 서비스"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-4 sm:mb-6"
              >
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-lg">
                  쾌적한 생활 환경 조성
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              >
                방충망 시공
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed"
              >
                고품질 방충망으로 쾌적하고 안전한 실내 환경을 만들어드립니다.<br className="hidden sm:block" />
                전문 기술력과 합리적인 가격으로 만족을 드립니다!
              </motion.p>
              
              <motion.a
                href="/forms"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group font-bold text-base sm:text-lg"
              >
                바로 신청하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Screen Installation is Important */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://i.imgur.com/NjSeQHD.png"
                  alt="방충망의 중요성"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4 sm:space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                왜 방충망이<br />필요할까요?
              </h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  여름철 <span className="font-bold text-blue-600">모기와 해충</span>으로부터 가족의 건강을 지켜주는 필수 아이템입니다.
                </p>
                <p>
                  창문을 열어도 벌레 걱정 없이 <span className="font-bold text-blue-600">자연 환기</span>가 가능하여 실내 공기를 쾌적하게 유지할 수 있습니다.
                </p>
                <p>
                  특히 아이가 있는 가정이나 <span className="font-bold text-blue-600">1층 세대</span>에는 더욱 필수적입니다.
                </p>
                <p className="font-bold text-gray-900">
                  수호대행이 품질 좋은 방충망을 합리적인 가격에 설치해드립니다!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Professional Service */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4 sm:space-y-6 order-2 lg:order-1"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                전문가의 손길로<br />완벽한 시공을
              </h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  <span className="font-bold text-blue-600">숙련된 전문 기사님</span>이 직접 방문하여 정밀하게 측정하고 시공합니다.
                </p>
                <p>
                  창틀에 딱 맞는 <span className="font-bold text-blue-600">맞춤 제작</span>으로 틈새 없이 완벽하게 설치합니다.
                </p>
                <p>
                  내구성이 뛰어난 고품질 소재를 사용하여 <span className="font-bold text-blue-600">오래도록 사용</span>할 수 있습니다.
                </p>
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                  <p className="font-bold text-blue-900">
                    🛡️ A/S 보증!<br />
                    <span className="font-normal text-sm sm:text-base">시공 후에도 문제 발생 시 신속하게 조치해드립니다.</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group order-1 lg:order-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://i.imgur.com/joSMAaO.png"
                  alt="전문 방충망 시공"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Process Steps */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              진행 절차
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              간편한 5단계 프로세스로 빠르게 진행합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {procedures.map((procedure, index) => {
              const Icon = procedure.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="relative group"
                >
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-xl z-10">
                    <span className="text-black font-bold text-base sm:text-lg">{index + 1}</span>
                  </div>

                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${procedure.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      {procedure.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {procedure.description}
                    </p>
                  </div>

                  {/* Connector Arrow */}
                  {index < procedures.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-300">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      
      {/* Section 5: Pricing Table */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              가격 안내
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              고객님의 상황에 맞는 합리적인 가격을 제공합니다
            </p>
          </motion.div>

          {/* Pricing Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 sm:mb-12"
          >
            {/* Table Header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 sm:px-8 py-6 sm:py-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
                방충망 시공 가격표
              </h3>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-4 sm:px-6 py-4 sm:py-6 text-left text-sm sm:text-base md:text-lg font-bold text-gray-900">
                      서비스
                    </th>
                    <th className="px-4 sm:px-6 py-4 sm:py-6 text-center text-sm sm:text-base md:text-lg font-bold text-gray-900">
                      금액
                    </th>
                    <th className="px-4 sm:px-6 py-4 sm:py-6 text-center text-sm sm:text-base md:text-lg font-bold text-orange-600">
                      이벤트가
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                      방충망 시공
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-6 text-center text-sm sm:text-base md:text-lg text-gray-700">
                      고객 센터 별도 문의
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-6 text-center text-sm sm:text-base md:text-lg text-gray-700">
                      -
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Callout Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* VAT Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-2xl text-center"
            >
              <p className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
                💰 부가세 별도
              </p>
              <p className="text-base sm:text-lg text-gray-700">
                VAT(부가세) 별도
              </p>
            </motion.div>

            {/* Contact Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 sm:p-8 rounded-2xl text-center"
            >
              <p className="text-xl sm:text-2xl font-bold text-purple-900 mb-2">
                📞 가격 상담
              </p>
              <p className="text-base sm:text-lg text-gray-700">
                구체적인 가격 상담은<br />카카오톡 또는 고객센터로<br />연락 부탁드립니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6: Installation Gallery */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              수호대행의 숨겨진 땀들
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              고객님을 위해 완벽하게 시공한 방충망 사례들입니다
            </p>
          </motion.div>

          {/* Consistent Grid Gallery */}
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => openImageModal(index)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 aspect-[3/4]"
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <p className="text-white font-semibold text-sm sm:text-base">{image.alt}</p>
                  </div>
                </div>
                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-500 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              지금 바로 신청해보세요!
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed">
              쾌적하고 안전한 실내 환경을 위해<br className="hidden sm:block" />
              전문 방충망 시공 서비스를 경험해보세요!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/forms"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-white text-blue-600 rounded-2xl shadow-2xl hover:shadow-white/50 transition-all duration-300 group font-bold text-base sm:text-lg"
              >
                바로 신청하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="https://pf.kakao.com/_qbqbn"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl shadow-xl hover:bg-white/20 transition-all duration-300 font-bold text-base sm:text-lg"
              >
                카톡 상담하기
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-7xl max-h-[90vh] overflow-auto"
            >
              <img
                src={selectedImage}
                alt="확대 이미지"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
