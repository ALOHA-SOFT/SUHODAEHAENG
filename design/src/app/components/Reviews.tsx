import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Reviews() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const reviews = [
    {
      name: 'bein*',
      rating: 5,
      comment: '처음에 관리소에서 동의서가 필요 없다고 했다가 공사 일주일 전에 갑자기 동의서를 받아야 한다고 해서 정말 당황했어요. 직장인이라 시간도 없어서 급하게 대행을 맡겼는데, 촉박한 일정에도 불구하고 빠르게 동의 절차를 진행해 주셔서 너무 감사했습니다. 부재중 세대에는 공사 안내 메모까지 꼼꼼하게 부착해 주셔서 믿음이 갔어요. 덕분에 인테리어 공사도 큰 문제 없이 마무리 단계에 들어갔습니다. 다음에도 필요하면 꼭 다시 이용할게요!',
      avatar: 'https://i.imgur.com/yzYIOML.png',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'lemo*',
      rating: 5,
      comment: '일정이 너무 급해서 혹시나 문제가 생길까 걱정이 많았는데, 예상보다 훨씬 빠르게 처리해 주셔서 안심할 수 있었습니다. 진행 상황도 중간중간 안내해 주셔서 신뢰가 갔어요. 급한 분들께 정말 추천합니다.',
      avatar: 'https://i.imgur.com/yix19K3.png',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'ssag*',
      rating: 5,
      comment: '처음 상담부터 정말 친절하게 설명해 주셔서 좋았어요. 일정도 차질 없이 딱 맞춰서 진행해 주시고, 가격도 부담스럽지 않아서 만족도가 높았습니다. 입주민 동의서부터 행위허가까지 한 번에 해결돼서 너무 편했어요.',
      avatar: 'https://i.imgur.com/bdvat2t.png',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      name: 'sunb*',
      rating: 5,
      comment: '너무 친절하게 잘해주셨습니다. 진행 과정도 깔끔하고 불필요한 걱정 없이 맡길 수 있었어요. 다음에 또 인테리어나 관련 작업이 있으면 꼭 다시 이용하고 싶습니다.',
      avatar: 'https://i.imgur.com/DHXQOfE.png',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: 'hana*',
      rating: 5,
      comment: '승강기랑 공용부 보양 때문에 신경 쓸 게 많았는데, 하나하나 꼼꼼하게 처리해 주셔서 감사했어요. 관리사무소 대응도 대신 해주셔서 시간 절약이 많이 됐습니다. 직장인 분들께 특히 추천드려요.',
      avatar: 'https://i.imgur.com/w7HWWBi.png',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'june*',
      rating: 5,
      comment: '입주민 동의서 받는 게 이렇게 힘든 일인지 처음 알았네요. 직접 했으면 며칠은 더 걸렸을 텐데, 전문적으로 빠르게 진행해 주셔서 정말 도움 많이 받았습니다. 설명도 명확해서 믿고 맡길 수 있었어요.',
      avatar: 'https://i.imgur.com/nxx8Ps0.png',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      name: 'miri*',
      rating: 5,
      comment: '방충망 시공이랑 종합 청소까지 같이 맡겼는데 전체적으로 만족도가 높았습니다. 마무리까지 깔끔하게 해주셔서 입주 준비가 훨씬 수월했어요. 한 번에 여러 서비스를 이용할 수 있어서 좋았습니다.',
      avatar: 'https://i.imgur.com/IWFyOhq.png',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'dodo*',
      rating: 5,
      comment: '행위허가부터 공사 관련 안내까지 복잡한 부분을 전부 대신 처리해 주셔서 너무 편했습니다. 일정 관리도 잘해주시고, 소통도 빨라서 답답함이 없었어요. 주변에 인테리어 준비하는 지인에게도 추천했습니다.',
      avatar: 'https://i.imgur.com/IBoVkUn.png',
      gradient: 'from-teal-500 to-cyan-500'
    }
  ];

  // Responsive slides to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const maxSlide = reviews.length - slidesToShow;
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [slidesToShow, reviews.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = reviews.length - slidesToShow;
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = reviews.length - slidesToShow;
      return prev <= 0 ? maxSlide : prev - 1;
    });
  };

  const getVisibleReviews = () => {
    return reviews.slice(currentSlide, currentSlide + slidesToShow);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            고객 리뷰
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">고객님들의 생생한 후기를 확인하세요</p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative pb-12 sm:pb-16">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 lg:-ml-12 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-all group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 lg:-mr-12 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-all group"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-white" />
          </button>

          {/* Reviews Grid */}
          <div className={`grid gap-4 sm:gap-6 ${
            slidesToShow === 1 ? 'grid-cols-1' : 
            slidesToShow === 2 ? 'grid-cols-2' : 
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {getVisibleReviews().map((review, index) => (
              <motion.div
                key={`${currentSlide}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${review.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl sm:rounded-3xl blur-xl`} />
                
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 min-h-[400px] sm:min-h-[480px] flex flex-col">
                  <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 text-gray-200 group-hover:text-blue-200 transition-colors" />
                  
                  <div className="flex items-center mb-4 sm:mb-6">
                    <img 
                      src={review.avatar} 
                      alt={review.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl shadow-lg mr-3 sm:mr-4 object-cover"
                    />
                    <div>
                      <div className="font-bold text-gray-900 text-base sm:text-lg">{review.name} 님</div>
                      <div className="flex items-center mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed flex-1">{review.comment}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: reviews.length - slidesToShow + 1 }).map((_, index) => (
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
    </section>
  );
}
