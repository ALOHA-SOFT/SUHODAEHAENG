import React from 'react';
import { MapPin, Phone, Clock, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Company Info & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <img 
              src="https://cdn.imweb.me/thumbnail/20251220/4f39b08ce75f8.png" 
              alt="수호대행 로고" 
              className="h-10 sm:h-12 mb-4 sm:mb-6 brightness-0 invert"
            />
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              전문적인 인테리어 대행 서비스
            </p>
            
            {/* Contact Info under logo */}
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex items-start text-gray-400 hover:text-white transition-colors group">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-blue-400 group-hover:scale-110 transition-transform" />
                <a href="tel:070-8057-6208" className="hover:underline text-sm sm:text-base">070-8057-6208</a>
              </div>
              <div className="flex items-start text-gray-400 hover:text-white transition-colors group">
                <Clock className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm sm:text-base">영업시간: 07:00 - 19:00</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
              <span className="px-3 py-1 bg-blue-500/20 rounded-full">인테리어</span>
              <span className="px-3 py-1 bg-purple-500/20 rounded-full">전문서비스</span>
            </div>
          </motion.div>

          {/* Address & Business Info - Wider Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Address */}
              <div>
                <h3 className="text-lg sm:text-xl mb-4 sm:mb-6 font-bold text-white">
                  주소
                </h3>
                <div className="flex items-start text-gray-400 hover:text-white transition-colors group">
                  <MapPin className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="leading-relaxed text-sm sm:text-base">
                    경기도 용인시 수지구<br />
                    풍덕천로139번길 10-6<br />
                    (풍덕천동)
                  </span>
                </div>
              </div>

              {/* Business Info */}
              <div>
                <h3 className="text-lg sm:text-xl mb-4 sm:mb-6 font-bold text-white">
                  사업자 정보
                </h3>
                <div className="space-y-3 text-gray-400">
                  <div className="flex items-start hover:text-white transition-colors group">
                    <FileText className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <div className="leading-relaxed space-y-1 text-sm sm:text-base">
                      <p className="font-semibold text-white">대표: 김영만</p>
                      <p className="text-sm">사업자등록번호</p>
                      <p className="font-mono">368-39-00473</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-700/50 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center"
        >
          <p className="text-gray-400 text-sm sm:text-base">
            &copy; 2024 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 font-bold">수호대행</span>. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}