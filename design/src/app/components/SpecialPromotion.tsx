import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import confetti from 'canvas-confetti';

const prices = [
  { 
    title: '입주민 동의서', 
    price: '90,000원~',
    image: 'https://i.imgur.com/ztYghLe.png',
    gradient: 'from-blue-500 to-purple-600'
  },
  { 
    title: '승강기 보양', 
    price: '80,000원~',
    image: 'https://i.imgur.com/EfhRAS3.png',
    gradient: 'from-purple-500 to-pink-600'
  },
  { 
    title: '행위허가', 
    price: '300,000원~',
    image: 'https://i.imgur.com/cO2CJ4N.png',
    gradient: 'from-pink-500 to-red-600'
  },
];

export default function SpecialPromotion() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const confettiTriggered = useRef(false);

  const fullText = '수호파트너스는 국내최저가에 도전합니다!';

  // 타이핑 이펙트
  useEffect(() => {
    if (!isInView) return;

    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isInView, fullText]);

  // Confetti 이펙트
  useEffect(() => {
    if (isInView && !confettiTriggered.current) {
      confettiTriggered.current = true;
      
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 2;
        
        // 왼쪽에서 발사
        confetti({
          particleCount,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
          ticks: 200,
          gravity: 1,
          decay: 0.94,
          startVelocity: 30,
          scalar: randomInRange(0.8, 1.2),
        });
        
        // 오른쪽에서 발사
        confetti({
          particleCount,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
          ticks: 200,
          gravity: 1,
          decay: 0.94,
          startVelocity: 30,
          scalar: randomInRange(0.8, 1.2),
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {displayedText}
              <span className="animate-pulse">|</span>
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"
          />
        </motion.div>

        {/* 가격 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {prices.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2 + 1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              {/* 카드 배경 글로우 */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300`}></div>
              
              {/* 카드 */}
              <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                {/* 이미지 */}
                <motion.div
                  animate={isInView ? {
                    rotate: [0, 10, -10, 10, 0],
                  } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2 + 1.5,
                  }}
                  className="mb-6 flex justify-center"
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-32 h-32 object-contain drop-shadow-lg"
                  />
                </motion.div>

                {/* 타이틀 */}
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
                  {item.title}
                </h3>

                {/* 가격 */}
                <div className={`text-center bg-gradient-to-r ${item.gradient} bg-clip-text`}>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.2 + 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="text-4xl font-extrabold text-transparent"
                  >
                    {item.price}
                  </motion.p>
                </div>

                {/* 장식 요소 */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-full opacity-10`}
                ></motion.div>

                {/* Sparkle 효과 */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
                  <motion.div
                    animate={{
                      x: ['-100%', '100%'],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    style={{ transform: 'skewX(-20deg)' }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 추가 강조 텍스트 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 font-medium">
            지금 바로 문의하시고 특별 할인 혜택을 받아보세요!
          </p>
        </motion.div>

        {/* 카톡 & 전화 & 신청 이미지 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.3 }}
          className="flex flex-wrap justify-center items-center gap-6 mt-12"
        >
          {/* 카카오톡 버튼 */}
          <motion.a
            href="https://pf.kakao.com/_qbqbn"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative cursor-pointer"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-2 shadow-lg">
              <img 
                src="https://i.imgur.com/Z51HaWH.png" 
                alt="카카오톡 상담"
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
          </motion.a>

          {/* 전화 버튼 */}
          <motion.a
            href="tel:070-8057-6208"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative cursor-pointer"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-2 shadow-lg">
              <img 
                src="https://i.imgur.com/zb2JPcW.png" 
                alt="전화 상담"
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
          </motion.a>

          {/* 신청 버튼 */}
          <motion.a
            href="/forms"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative cursor-pointer"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-2 shadow-lg">
              <img 
                src="https://i.imgur.com/ztYghLe.png" 
                alt="온라인 신청"
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
