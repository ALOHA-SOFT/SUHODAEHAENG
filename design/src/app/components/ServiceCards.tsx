import React from 'react';
import { FileText, Shield, FileCheck, Grid, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function ServiceCards() {
  const services = [
    {
      icon: FileText,
      title: '입주민 동의서',
      description: '아파트 입주 시 필요한 동의서 작성 및 제출 대행'
    },
    {
      icon: Shield,
      title: '승강기 기타 보양',
      description: '이사 및 공사 시 엘리베이터 보호 시공'
    },
    {
      icon: FileCheck,
      title: '행위허가',
      description: '인테리어 공사 행위허가 신청 및 승인 대행'
    },
    {
      icon: Grid,
      title: '방충망 시공',
      description: '새집 입주 시 맞춤형 방충망 설치 서비스'
    },
    {
      icon: Sparkles,
      title: '종합 청소',
      description: '입주 전후 전문 청소 서비스 제공'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            서비스 안내
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">수호대행의 전문 서비스를 만나보세요</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl" 
                     style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                />
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl mb-2 sm:mb-3 font-bold text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
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