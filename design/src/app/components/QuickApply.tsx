import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export default function QuickApply() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            바로신청 서비스
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left - Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative group order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group-hover:shadow-3xl transition-all duration-300">
              <ImageWithFallback
                src="https://i.imgur.com/DFLYK2M.png"
                alt="바로신청 서비스"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
                "수호대행만의"
                <br />
                빠른 바로 신청 서비스!
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                필요하신 서비스 맞춤형 양식으로 빠르게 바로 접수를 도와드려요~!
              </p>
            </div>

            {/* Additional Info */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">간편한 온라인 접수</h4>
                <p className="text-sm sm:text-base text-gray-600">복잡한 절차 없이 몇 분 만에 신청 완료!</p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="/forms"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group font-bold text-base sm:text-lg"
            >
              바로신청
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}