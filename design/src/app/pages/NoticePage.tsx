import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bell, Search, ChevronRight, Calendar, Tag } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';

interface Notice {
  id: string;
  title: string;
  author: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function NoticePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // 공지사항 목록 가져오기
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/notices');
      
      if (!response.ok) {
        throw new Error('공지사항을 불러오는데 실패했습니다.');
      }
      
      const data = await response.json();
      setNotices(data);
    } catch (err) {
      console.error('공지사항 조회 오류:', err);
      setError('공지사항을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }).replace(/\. /g, '-').replace('.', '');
  };

  // 최근 7일 이내 게시물인지 확인
  const isNewNotice = (dateString: string) => {
    const noticeDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - noticeDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getCategoryColor = (status: string) => {
    switch(status) {
      case '공개': return 'from-blue-500 to-cyan-500';
      case '비공개': return 'from-gray-500 to-gray-600';
      default: return 'from-purple-500 to-pink-500';
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
        </div>
      </section>

      {/* Notices List */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">공지사항을 불러오는 중...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center"
            >
              <p className="text-red-700">{error}</p>
              <button
                onClick={fetchNotices}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                다시 시도
              </button>
            </motion.div>
          )}

          {/* Notices List */}
          {!isLoading && !error && (
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
                      <div className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${getCategoryColor(notice.status)} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(notice.status)} text-white text-xs font-bold rounded-full`}>
                            {notice.status}
                          </span>
                          {isNewNotice(notice.createdAt) && (
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
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(notice.createdAt)}
                          </div>
                          <div className="flex items-center">
                            <Tag className="w-4 h-4 mr-1" />
                            {notice.author}
                          </div>
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
          )}

          {/* No Results */}
          {!isLoading && !error && filteredNotices.length === 0 && (
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