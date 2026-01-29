import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Search, ChevronRight, Calendar, Tag } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';

interface Notice {
  id: number;
  category: '공지' | '이벤트' | '서비스';
  title: string;
  date: string;
  content: string;
  isNew: boolean;
}

export default function NoticePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const notices: Notice[] = [
    {
      id: 1,
      category: '공지',
      title: '수호대행 설 연휴 운영 안내',
      date: '2026-01-25',
      content: '설 연휴 기간(2월 5일~2월 9일) 동안 휴무입니다. 긴급 문의는 카카오톡 채널로 남겨주시면 연휴 이후 순차적으로 답변드리겠습니다.',
      isNew: true
    },
    {
      id: 2,
      category: '이벤트',
      title: '신규 고객 10% 할인 이벤트',
      date: '2026-01-20',
      content: '처음 수호대행을 이용하시는 고객님께 모든 서비스 10% 할인 혜택을 드립니다. 2월 말까지 진행되는 이벤트이니 놓치지 마세요!',
      isNew: true
    },
    {
      id: 3,
      category: '서비스',
      title: '방충망 시공 서비스 오픈',
      date: '2026-01-15',
      content: '고객님의 요청으로 방충망 시공 서비스를 새롭게 시작했습니다. 고품질 자재와 전문 시공으로 만족을 드리겠습니다.',
      isNew: true
    },
    {
      id: 4,
      category: '공지',
      title: '종합 청소 서비스 가격 안내',
      date: '2026-01-10',
      content: '평형별 종합 청소 서비스 가격이 업데이트되었습니다. 자세한 내용은 카카오톡 상담을 통해 문의해주세요.',
      isNew: false
    },
    {
      id: 5,
      category: '서비스',
      title: '승강기 보양 자재 업그레이드',
      date: '2026-01-05',
      content: '더욱 견고하고 안전한 보양 자재로 업그레이드되었습니다. 고객님의 재산을 더욱 안전하게 보호하겠습니다.',
      isNew: false
    },
    {
      id: 6,
      category: '이벤트',
      title: '고객 후기 이벤트 당첨자 발표',
      date: '2025-12-28',
      content: '12월 고객 후기 이벤트 당첨자를 발표합니다. 당첨되신 분들께는 개별 연락드리겠습니다.',
      isNew: false
    },
    {
      id: 7,
      category: '공지',
      title: '연말 운영 시간 안내',
      date: '2025-12-20',
      content: '연말 기간 동안 운영 시간이 변경됩니다. 평일 08:00-18:00로 운영되오니 참고 부탁드립니다.',
      isNew: false
    },
    {
      id: 8,
      category: '서비스',
      title: '입주민 동의서 온라인 신청 시스템 개선',
      date: '2025-12-15',
      content: '더욱 간편하게 입주민 동의서를 신청할 수 있도록 온라인 시스템이 개선되었습니다.',
      isNew: false
    }
  ];

  const categories = ['전체', '공지', '이벤트', '서비스'];

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = selectedCategory === '전체' || notice.category === selectedCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch(category) {
      case '공지': return 'from-blue-500 to-cyan-500';
      case '이벤트': return 'from-purple-500 to-pink-500';
      case '서비스': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
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
              <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              공지사항
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              수호대행의 새로운 소식과 중요한 안내사항을 확인하세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="pb-8 sm:pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="공지사항 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Notices List */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredNotices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => {
                    window.location.hash = `notice-detail-${notice.id}`;
                  }}
                  className="w-full p-6 sm:p-8 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Category Badge */}
                    <div className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${getCategoryColor(notice.category)} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Tag className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(notice.category)} text-white text-xs font-bold rounded-full`}>
                          {notice.category}
                        </span>
                        {notice.isNew && (
                          <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {notice.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {notice.content}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {notice.date}
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0">
                      <ChevronRight className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredNotices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-lg text-gray-600">검색 결과가 없습니다</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
}