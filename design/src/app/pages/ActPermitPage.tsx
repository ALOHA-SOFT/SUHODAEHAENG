import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { 
  FileText, 
  CheckCircle, 
  CreditCard, 
  Search,
  CheckSquare,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';

export default function ActPermitPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    {
      src: 'https://i.imgur.com/3s4LUqO.png',
      alt: '행위허가서 1'
    },
    {
      src: 'https://i.imgur.com/D2yHYqC.png',
      alt: '행위허가서 2'
    },
    {
      src: 'https://i.imgur.com/7j8rMCG.png',
      alt: '행위허가서 3'
    },
    {
      src: 'https://i.imgur.com/nEaLzAM.png',
      alt: '행위허가서 4'
    },
    {
      src: 'https://i.imgur.com/Fy43Eoz.png',
      alt: '행위허가서 5'
    },
    {
      src: 'https://i.imgur.com/3uZYEDH.png',
      alt: '행위허가서 6'
    },
    {
      src: 'https://i.imgur.com/m3dDfn0.png',
      alt: '행위허가서 7'
    },
    {
      src: 'https://i.imgur.com/NFWNRNV.png',
      alt: '행위허가서 8'
    },
    {
      src: 'https://i.imgur.com/DF8mVxc.png',
      alt: '행위허가서 9'
    },
    {
      src: 'https://i.imgur.com/r73JGZg.png',
      alt: '행위허가서 10'
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
      icon: Search,
      title: '검토 업무 진행',
      description: '전문가가 서류를 검토하고 처리합니다',
      color: 'from-teal-500 to-emerald-500'
    },
    {
      icon: CheckSquare,
      title: '완료 후 내용확인 전달',
      description: '처리 완료 후 결과를 상세히 전달드립니다',
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
            src="https://i.imgur.com/U3wCgX1.png"
            alt="행위허가 서비스"
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
                  전문 행정 대행 서비스
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              >
                행위허가
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed"
              >
                복잡한 행위허가 절차를 전문가가 대신 처리해드립니다.<br className="hidden sm:block" />
                빠르고 정확한 서류 처리로 시간과 비용을 절약하세요!
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

      {/* Section 2: Why Act Permit is Needed */}
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
                  src="https://i.imgur.com/rQguy2a.png"
                  alt="행위허가 절차"
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
                왜 행위허가가<br />필요할까요?
              </h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  아파트 내 <span className="font-bold text-blue-600">구조 변경, 발코니 확장, 샷시 교체</span> 등의 공사는 반드시 행위허가를 받아야 합니다.
                </p>
                <p>
                  관리사무소와의 협의, 서류 준비, 제출 등 <span className="font-bold text-blue-600">복잡한 절차</span>가 필요합니다.
                </p>
                <p className="font-bold text-gray-900">
                  수호대행이 전문적으로 처리하여 빠르고 정확하게 완료해드립니다!
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
                전문가가<br />빠르게 처리합니다
              </h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  <span className="font-bold text-blue-600">풍부한 경험</span>을 바탕으로 서류 작성부터 제출까지 완벽하게 진행합니다.
                </p>
                <p>
                  관리사무소 협의, 필요 서류 준비, <span className="font-bold text-blue-600">행정 절차 대행</span>까지 모든 과정을 책임집니다.
                </p>
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                  <p className="font-bold text-blue-900">
                    ⚡ 신속한 처리!<br />
                    <span className="font-normal text-sm sm:text-base">복잡한 행정 업무를 간편하게 해결하세요.</span>
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
                  src="https://i.imgur.com/W4qRR2B.png"
                  alt="전문 행정 대행"
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

      {/* Section 5: Document Gallery */}
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
              고객님을 위해 완벽하게 처리한 행위허가 서류들입니다
            </p>
          </motion.div>

          {/* Masonry Grid Gallery */}
          <Masonry columns={3} gutter="16px">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => openImageModal(index)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto"
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
          </Masonry>
        </div>
      </section>

      {/* Section 6: CTA Section */}
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
              복잡한 행위허가 절차를 전문가에게 맡기세요.<br className="hidden sm:block" />
              빠르고 정확한 처리로 시간과 비용을 절약하세요!
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