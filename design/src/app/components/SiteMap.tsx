import React from 'react';
import { 
  FileText, 
  Shield, 
  FileCheck, 
  Grid, 
  Sparkles,
  Edit,
  MessageCircle,
  Bell,
  Mail,
  Star,
  Phone,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function SiteMap() {
  const categories = [
    { title: '서비스' },
    { title: '바로 신청' },
    { title: '고객 지원' }
  ];

  const directLinks = [
    {
      icon: FileText,
      title: '서비스 알아보기',
      link: '#services'
    },
    {
      icon: MessageCircle,
      title: '카카오톡 상담',
      link: 'https://pf.kakao.com/_qbqbn'
    },
    {
      icon: Phone,
      title: '유선 상담',
      link: 'tel:070-8057-6208'
    },
    {
      icon: Bell,
      title: '공지사항',
      link: '#notice'
    },
    {
      icon: Mail,
      title: '문의하기',
      link: '#inquiry'
    },
    {
      icon: Star,
      title: '고객 리뷰',
      link: '#reviews'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl mb-4 font-bold text-gray-900">
            사이트맵
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">원하시는 메뉴를 빠르게 찾아보세요</p>
        </motion.div>

        {/* Category Titles */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12"
        >
          {categories.map((category, index) => (
            <div 
              key={index}
              className="inline-block bg-gray-900 text-white text-base sm:text-xl md:text-2xl font-bold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl shadow-xl"
            >
              {category.title}
            </div>
          ))}
        </motion.div>

        {/* Direct Links Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {directLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={index}
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : '_self'}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl sm:rounded-3xl blur-xl" />
                
                {/* Card */}
                <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 group-hover:border-blue-200 overflow-hidden min-h-[140px] sm:min-h-[160px] flex flex-col justify-between">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon className="w-full h-full text-gray-400" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                  </div>

                  {/* Arrow Link */}
                  <div className="relative z-10 flex items-center text-gray-600 group-hover:text-gray-900 transition-colors font-medium text-sm sm:text-base">
                    <span>바로가기</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}