import React from 'react';
import { MessageCircle, Phone, Edit } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingButtons() {
  return (
    <>
      {/* Left Floating Buttons */}
      <div className="fixed left-2 sm:left-4 md:left-8 bottom-6 sm:bottom-8 z-50 flex flex-col gap-2 sm:gap-3">
        {/* KakaoTalk Button */}
        <motion.a
          href="https://pf.kakao.com/_qbqbn"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-2xl flex items-center justify-center hover:shadow-yellow-400/50 transition-all"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" />
          {/* Tooltip */}
          <div className="hidden sm:block absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            카톡 상담
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
          </div>
        </motion.a>

        {/* Phone Button */}
        <motion.a
          href="tel:070-8057-6208"
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center hover:shadow-green-500/50 transition-all"
        >
          <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          {/* Tooltip */}
          <div className="hidden sm:block absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            전화 상담
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
          </div>
        </motion.a>
      </div>

      {/* Floating Apply Button - Desktop & Mobile */}
      <motion.a
        href="http://www.suhodaehaeng.com"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-20 sm:bottom-24 md:bottom-28 right-4 sm:right-6 md:right-8 z-40 group"
      >
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
          
          {/* Button */}
          <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl sm:rounded-3xl shadow-2xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 hover:shadow-blue-500/50 transition-all">
            <div className="flex items-center gap-2 sm:gap-3">
              <Edit className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              <div className="text-white">
                <div className="font-bold text-base sm:text-lg md:text-xl leading-tight">바로 신청</div>
              </div>
            </div>
          </div>
        </div>
      </motion.a>
    </>
  );
}