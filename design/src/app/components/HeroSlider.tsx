import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      title: '입주민 동의서',
      description: '아파트 입주 시 필요한 동의서 작성 및 제출 대행',
      image: 'https://i.imgur.com/gTj4GE3.png'
    },
    {
      title: '승강기 기타 보양',
      description: '이사 및 공사 시 엘리베이터 보호 시공',
      image: 'https://i.imgur.com/DzNuCZA.png'
    },
    {
      title: '행위허가',
      description: '인테리어 공사 행위허가 신청 및 승인 대행',
      image: 'https://i.imgur.com/vZEOomB.png'
    },
    {
      title: '방충망 시공',
      description: '새집 입주 시 맞춤형 방충망 설치 서비스',
      image: 'https://i.imgur.com/1tajQxk.png'
    },
    {
      title: '종합 청소',
      description: '입주 전후 전문 청소 서비스 제공',
      image: 'https://i.imgur.com/RWzhcpm.png'
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [services.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section className="mt-16 sm:mt-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Title, Description, CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-lg">
                전문 인테리어 대행 서비스
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800">
                빠르고 정확한
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                수호대행
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
            >
              입주민 동의서부터 행위허가, 청소까지<br />
              인테리어의 모든 것을 한번에 해결하세요
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="http://www.suhodaehaeng.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-2">
                  바로 신청하기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>

              <button
                onClick={() => {
                  window.location.hash = 'services';
                }}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-blue-300"
              >
                서비스 둘러보기
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                  1,000+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">완료 건수</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  24시간
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">상담 가능</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">만족도</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative order-2"
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl opacity-20 blur-2xl"></div>

              {/* Slider Container */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100">
                      {/* 4:3 Aspect Ratio Container */}
                      <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                        <img
                          src={services[currentSlide].image}
                          alt={services[currentSlide].title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        
                        {/* Text Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                            {services[currentSlide].title}
                          </h3>
                          <p className="text-blue-100 text-xs sm:text-sm md:text-base line-clamp-2">
                            {services[currentSlide].description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows - Hidden on small screens */}
                <button
                  onClick={prevSlide}
                  className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full items-center justify-center transition-all shadow-lg z-10"
                  aria-label="Previous slide"
                >
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 transform rotate-180" />
                </button>
                <button
                  onClick={nextSlide}
                  className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full items-center justify-center transition-all shadow-lg z-10"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>

                {/* Slider Dots */}
                <div className="hidden md:flex absolute -bottom-8 left-0 right-0 justify-center items-center gap-2">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSlide 
                          ? 'w-8 h-3 bg-blue-500' 
                          : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}