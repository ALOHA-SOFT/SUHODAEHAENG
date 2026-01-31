import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
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

interface NoticeDetailPageProps {
  noticeId: string;
}

export default function NoticeDetailPage({ noticeId }: NoticeDetailPageProps) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchNoticeDetail();
  }, [noticeId]);

  const fetchNoticeDetail = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log(`noticeId : ${noticeId}`);
      
      const response = await fetch(`/api/notices/${noticeId}`);
      
      if (!response.ok) {
        throw new Error('공지사항을 불러오는데 실패했습니다.');
      }
      
      const data = await response.json();
      setNotice(data);
    } catch (err) {
      console.error('공지사항 상세 조회 오류:', err);
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
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">공지사항을 불러오는 중...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
          <a href="#notice" className="text-blue-600 hover:underline">목록으로 돌아가기</a>
        </div>
        <Footer />
      </div>
    );
  }

  // 공지사항이 없을 때
  if (!notice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">공지사항을 찾을 수 없습니다</h1>
          <a href="#notice" className="text-blue-600 hover:underline">목록으로 돌아가기</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      
      {/* Back Button */}
      <section className="pt-32 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.a
            href="#notice"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            목록으로 돌아가기
          </motion.a>
        </div>
      </section>

      {/* Notice Content */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 md:p-10 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold rounded-full">
                  공지사항
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {notice.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(notice.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{notice.author || '관리자'}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 md:p-10">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                  {notice.content}
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 sm:p-8 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4 justify-end items-center">
                <a
                  href="#notice"
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  목록으로
                </a>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
