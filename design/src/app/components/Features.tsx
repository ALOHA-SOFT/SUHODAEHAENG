import React from 'react';
import { Zap, Clock, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: '빠른 신청 서비스',
      description: '복잡한 절차 없이 온라인으로 간편하게 신청하세요. 빠른 접수와 처리로 시간을 절약할 수 있습니다.',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Clock,
      title: '24시간 상담',
      description: '언제든지 편하게 문의하세요. 카카오톡 채널을 통해 24시간 실시간 상담이 가능합니다.',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Heart,
      title: '친절하고 책임감있는 서비스',
      description: '고객 만족을 최우선으로 생각합니다. 처음부터 끝까지 책임지고 관리해드립니다.',
      gradient: 'from-pink-400 to-red-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            차별화된 서비스
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">수호대행만의 특별한 장점</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.03 }}
                className="group relative h-full"
              >
                <div className="absolute inset-0 bg-white/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/50 h-full">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${feature.gradient} rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}