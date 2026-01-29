import React from 'react';
import { motion } from 'motion/react';
import { FileText, Shield, FileCheck, Grid, Sparkles, ArrowRight } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';

export default function ServicesPage() {
  const services = [
    {
      icon: FileText,
      title: '입주민 동의서',
      description: '입주 공사를 위한 입주민 동의서를 빠르고 정확하게 받아드립니다',
      features: ['빠른 처리', '전문 상담', '100% 보장'],
      color: 'from-blue-500 to-cyan-500',
      link: '#resident-consent'
    },
    {
      icon: Shield,
      title: '승강기 기타 보양',
      description: '이사 및 공사 시 승강기와 공용 공간을 안전하게 보호합니다',
      features: ['완벽한 보양', '시공 전문가', '손해 예방'],
      color: 'from-purple-500 to-pink-500',
      link: '#elevator-protection'
    },
    {
      icon: FileCheck,
      title: '행위허가',
      description: '복잡한 행위허가 절차를 전문가가 대신 처리해드립니다',
      features: ['서류 대행', '빠른 승인', '절차 간소화'],
      color: 'from-orange-500 to-red-500',
      link: '#act-permit'
    },
    {
      icon: Grid,
      title: '방충망 시공',
      description: '고품질 방충망으로 쾌적하고 안전한 실내 환경을 만들어드립니다',
      features: ['맞춤 제작', '전문 시공', 'A/S 보증'],
      color: 'from-teal-500 to-emerald-500',
      link: '#screen-installation'
    },
    {
      icon: Sparkles,
      title: '종합 청소',
      description: '입주 전 완벽한 청소로 새 출발을 준비하세요',
      features: ['구석구석 청소', '친환경 세제', '만족 보증'],
      color: 'from-green-500 to-lime-500',
      link: '#cleaning-service'
    }
  ];

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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm sm:text-base font-semibold shadow-xl">
                수호대행의 모든 서비스
              </div>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              서비스 둘러보기
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              입주부터 이사, 인테리어까지<br className="sm:hidden" /> 모든 과정을 책임지는 전문 서비스
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.a
                  key={index}
                  href={service.link}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl sm:rounded-3xl blur-2xl`} />
                  
                  {/* Card */}
                  <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 group-hover:border-blue-200 overflow-hidden h-full flex flex-col">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Icon className="w-full h-full text-gray-400" />
                    </div>

                    {/* Icon */}
                    <div className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${service.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed flex-1">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="relative z-10 space-y-2 mb-4 sm:mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-2`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="relative z-10 flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        자세히 보기
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                어떤 서비스가 필요하신가요?
              </h2>
              <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8">
                궁금한 점이 있으시면 언제든지 문의해주세요
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://pf.kakao.com/_qbqbn"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  카카오톡 상담하기
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                
                <motion.a
                  href="tel:070-8057-6208"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all"
                >
                  전화 상담하기
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
