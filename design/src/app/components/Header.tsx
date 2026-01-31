import React, { useState } from 'react';
import { Menu, X, FileText, Shield, FileCheck, Grid, Sparkles, Edit, MessageCircle, Bell, Mail, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = [
    {
      title: '서비스',
      items: [
        { icon: FileText, name: '입주민 동의서', link: '#resident-consent' },
        { icon: Shield, name: '승강기 기타 보양', link: '#elevator-protection' },
        { icon: FileCheck, name: '행위허가', link: '#act-permit' },
        { icon: Grid, name: '방충망 시공', link: '#screen-installation' },
        { icon: Sparkles, name: '종합 청소', link: '#cleaning-service' }
      ]
    },
    {
      title: '바로 신청',
      items: [
        { icon: Edit, name: '신청서 작성하기', link: '/forms' },
        { icon: MessageCircle, name: '카톡 상담', link: 'https://pf.kakao.com/_qbqbn' }
      ]
    },
    {
      title: '고객지원',
      items: [
        { icon: Bell, name: '공지사항', link: '#notice' },
        { icon: Mail, name: '문의하기', link: '#inquiry' },
        { icon: Star, name: '고객리뷰', link: '#reviews' }
      ]
    }
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl shadow-lg z-50 border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a href="#">
                <img 
                  src="https://cdn.imweb.me/thumbnail/20251220/4f39b08ce75f8.png" 
                  alt="수호대행 로고" 
                  className="h-12 w-auto"
                />
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {menuItems.map((menu, index) => (
                <div 
                  key={index} 
                  className="relative"
                  onMouseEnter={() => setActiveMenu(menu.title)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className="text-gray-700 hover:text-blue-600 px-5 py-2 font-bold transition-colors relative text-lg">
                    {menu.title}
                    <motion.span 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                      initial={{ width: 0 }}
                      animate={{ width: activeMenu === menu.title ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                </div>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Desktop Mega Menu */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="hidden md:block fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl z-40 border-b border-gray-200"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {menuItems.map((menu) => (
                menu.title === activeMenu && (
                  <div key={menu.title}>
                    {/* 3 Column Grid */}
                    <div className="grid grid-cols-3 gap-4 justify-items-center max-w-4xl mx-auto">
                      {menu.items.map((item, itemIndex) => {
                        const Icon = item.icon;
                        return (
                          <motion.a
                            key={itemIndex}
                            href={item.link}
                            target={item.link.startsWith('http') ? '_blank' : '_self'}
                            rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="flex items-center p-4 rounded-xl bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all duration-200 group border border-gray-100 hover:border-blue-200 hover:shadow-lg w-full"
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:scale-110 transition-transform">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.name}
                            </div>
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Slide-in Menu from Right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <img 
                  src="https://cdn.imweb.me/thumbnail/20251220/4f39b08ce75f8.png" 
                  alt="수호대행 로고" 
                  className="h-10 w-auto"
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-700" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="p-6">
                {menuItems.map((menu, menuIndex) => (
                  <div key={menuIndex} className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      {menu.title}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {menu.items.map((item, itemIndex) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={itemIndex}
                            href={item.link}
                            target={item.link.startsWith('http') ? '_blank' : '_self'}
                            rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center p-3 rounded-xl bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all border border-gray-100 hover:border-blue-200 hover:shadow-md group"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 shadow-md group-hover:scale-110 transition-transform">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.name}
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden md:block fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            style={{ top: '5rem' }}
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}