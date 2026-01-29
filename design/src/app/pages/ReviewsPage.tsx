import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, User, Calendar, ThumbsUp, Filter } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';

interface Review {
  id: number;
  name: string;
  service: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
  location: string;
}

export default function ReviewsPage() {
  const [selectedService, setSelectedService] = useState<string>('전체');
  const [sortBy, setSortBy] = useState<'latest' | 'rating'>('latest');

  const reviews: Review[] = [
    {
      id: 1,
      name: '김**',
      service: '입주민 동의서',
      rating: 5,
      date: '2026-01-25',
      content: '입주민 동의서를 받는 일이 생각보다 번거로웠는데, 수호대행에 맡기니 정말 편했습니다. 빠르고 정확하게 처리해주셔서 감사합니다!',
      likes: 24,
      location: '용인시 수지구'
    },
    {
      id: 2,
      name: '이**',
      service: '승강기 기타 보양',
      rating: 5,
      date: '2026-01-23',
      content: '이사하면서 승강기 보양이 걱정이었는데, 완벽하게 설치해주셨어요. 관리사무소에서도 칭찬할 정도로 꼼꼼했습니다. 강력 추천합니다!',
      likes: 32,
      location: '성남시 분당구'
    },
    {
      id: 3,
      name: '박**',
      service: '종합 청소',
      rating: 5,
      date: '2026-01-20',
      content: '입주 전 청소를 맡겼는데 정말 새집처럼 깨끗하게 해주셨어요. 창틀이나 환기구 같은 곳까지 세심하게 청소해주셔서 너무 만족합니다.',
      likes: 45,
      location: '용인시 기흥구'
    },
    {
      id: 4,
      name: '최**',
      service: '행위허가',
      rating: 5,
      date: '2026-01-18',
      content: '행위허가 서류 준비가 복잡했는데, 전문가답게 빠르게 처리해주셨습니다. 걱정 없이 공사를 진행할 수 있었어요. 감사합니다!',
      likes: 18,
      location: '수원시 영통구'
    },
    {
      id: 5,
      name: '정**',
      service: '방충망 시공',
      rating: 5,
      date: '2026-01-15',
      content: '방충망 시공 깔끔하게 해주셨어요. 창틀에 딱 맞게 제작해주셔서 틈새가 하나도 없습니다. 가격도 합리적이고 만족스럽습니다.',
      likes: 27,
      location: '화성시 동탄'
    },
    {
      id: 6,
      name: '강**',
      service: '입주민 동의서',
      rating: 5,
      date: '2026-01-12',
      content: '처음에는 직접 받으려고 했는데 시간이 너무 오래 걸릴 것 같아 맡겼습니다. 정말 빠르게 처리해주셔서 공사 일정에 차질이 없었어요.',
      likes: 21,
      location: '용인시 수지구'
    },
    {
      id: 7,
      name: '윤**',
      service: '종합 청소',
      rating: 5,
      date: '2026-01-10',
      content: '청소 퀄리티가 정말 좋았습니다. 전문 장비를 사용하셔서 그런지 일반 청소와는 차원이 다르네요. 돈이 아깝지 않았어요!',
      likes: 38,
      location: '성남시 분당구'
    },
    {
      id: 8,
      name: '조**',
      service: '승강기 기타 보양',
      rating: 5,
      date: '2026-01-08',
      content: '보양 자재도 좋고 시공도 꼼꼼하게 해주셨습니다. 이사 후 깨끗하게 철거까지 완료해주셔서 감사합니다. 다음에도 이용하겠습니다.',
      likes: 29,
      location: '용인시 처인구'
    },
    {
      id: 9,
      name: '한**',
      service: '행위허가',
      rating: 4,
      date: '2026-01-05',
      content: '행위허가 업무를 잘 처리해주셨어요. 중간중간 진행 상황도 알려주셔서 안심하고 기다릴 수 있었습니다.',
      likes: 15,
      location: '수원시 장안구'
    },
    {
      id: 10,
      name: '신**',
      service: '방충망 시공',
      rating: 5,
      date: '2026-01-03',
      content: '여름 대비해서 방충망 시공했는데 정말 잘한 선택이었습니다. 품질 좋은 자재에 기사님도 친절하셨어요. 추천합니다!',
      likes: 22,
      location: '화성시 병점'
    },
    {
      id: 11,
      name: '오**',
      service: '종합 청소',
      rating: 5,
      date: '2025-12-28',
      content: '입주 청소 전문가답게 구석구석 깨끗하게 해주셨습니다. 특히 욕실 청소가 정말 완벽했어요. 재이용 의사 100%입니다!',
      likes: 41,
      location: '용인시 수지구'
    },
    {
      id: 12,
      name: '배**',
      service: '입주민 동의서',
      rating: 5,
      date: '2025-12-25',
      content: '동의서 받는 데 걸리는 시간과 노력을 생각하면 정말 합리적인 가격입니다. 전문적으로 처리해주셔서 감사합니다.',
      likes: 19,
      location: '성남시 중원구'
    }
  ];

  const services = ['전체', '입주민 동의서', '승강기 기타 보양', '행위허가', '방충망 시공', '종합 청소'];

  const filteredReviews = reviews
    .filter(review => selectedService === '전체' || review.service === selectedService)
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.rating - a.rating;
      }
    });

  const averageRating = (
    filteredReviews.reduce((sum, review) => sum + review.rating, 0) / filteredReviews.length
  ).toFixed(1);

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: filteredReviews.filter(r => r.rating === rating).length,
    percentage: (filteredReviews.filter(r => r.rating === rating).length / filteredReviews.length) * 100
  }));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl sm:rounded-3xl mb-6 shadow-xl">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              고객 리뷰
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              수호대행을 이용하신 고객님들의 생생한 후기를 확인하세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rating Summary */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Average Rating */}
              <div className="text-center md:border-r border-gray-200">
                <div className="text-6xl font-bold text-gray-900 mb-2">{averageRating}</div>
                <div className="flex justify-center mb-2">
                  {renderStars(5)}
                </div>
                <p className="text-gray-600">총 {filteredReviews.length}개의 리뷰</p>
              </div>

              {/* Right: Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold">{rating}</span>
                    </div>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="pb-8 sm:pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Service Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-bold text-gray-700">서비스 필터</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`px-4 py-2 rounded-xl font-bold transition-all text-sm ${
                    selectedService === service
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-3"
          >
            <button
              onClick={() => setSortBy('latest')}
              className={`px-4 py-2 rounded-xl font-bold transition-all text-sm ${
                sortBy === 'latest'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-4 py-2 rounded-xl font-bold transition-all text-sm ${
                sortBy === 'rating'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              평점순
            </button>
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{review.name}</h3>
                      <p className="text-xs text-gray-500">{review.location}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full">
                    {review.service}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{review.rating}.0</span>
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  {review.content}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {review.date}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.likes}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
