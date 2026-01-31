import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, User, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';

export default function InquiryPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '일반 문의',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    '일반 문의',
    '서비스 문의',
    '견적 문의',
    '불만 및 개선사항',
    '제휴 문의',
    '기타'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // API 요청 데이터 준비 (InquiryApi.java에 맞게)
      const requestData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        title: `[${formData.category}] ${formData.subject}`,
        content: formData.message
      };

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        
        // 3초 후 폼 초기화
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            phone: '',
            email: '',
            category: '일반 문의',
            subject: '',
            message: ''
          });
        }, 3000);
      } else {
        setErrorMessage(result.message || '문의 접수에 실패했습니다.');
      }
    } catch (error) {
      console.error('문의 접수 오류:', error);
      setErrorMessage('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              문의하기
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              궁금하신 사항을 남겨주세요. 빠르게 답변드리겠습니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">전화 문의</h3>
              <p className="text-blue-600 font-bold text-lg">070-8057-6208</p>
              <p className="text-sm text-gray-500 mt-1">평일 07:00-19:00</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">카카오톡 상담</h3>
              <a 
                href="https://pf.kakao.com/_qbqbn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 font-bold text-lg hover:underline"
              >
                채팅 상담하기
              </a>
              <p className="text-sm text-gray-500 mt-1">실시간 상담 가능</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 sm:col-span-2 lg:col-span-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">이메일 문의</h3>
              <p className="text-blue-600 font-bold text-lg break-all">info@suhodaehang.com</p>
              <p className="text-sm text-gray-500 mt-1">24시간 접수 가능</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 에러 메시지 */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                  </motion.div>
                )}

                {/* Name */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    이름 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="이름을 입력해주세요"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-2 text-blue-500" />
                    연락처 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="010-1234-5678"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2 text-blue-500" />
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
                    문의 유형 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    제목 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="문의 제목을 입력해주세요"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    문의 내용 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="문의하실 내용을 자세히 입력해주세요"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className={`w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      제출 중...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      문의하기
                    </>
                  )}
                </motion.button>

                <p className="text-sm text-gray-500 text-center">
                  문의하신 내용은 영업일 기준 1-2일 내에 답변드립니다
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  문의가 접수되었습니다!
                </h3>
                <p className="text-gray-600">
                  빠른 시일 내에 답변드리겠습니다.<br />
                  감사합니다.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
