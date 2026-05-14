import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Popup {
  no: number;
  id: string;
  type: string;
  name: string;
  url: string;
  link: string;
  seq: number;
  content: string;
  startedAt: string;
  endedAt: string;
  isShow: boolean;
}

// 쿠키 유틸
function setCookie(name: string, value: string, hours: number) {
  const d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60 * 1000);
  document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/';
}

function getCookie(name: string): string | null {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

export default function PopupModal() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  // 팝업 데이터 로드
  useEffect(() => {
    if (getCookie('hideMainPopup')) return;

    fetch('/api/popup/open?type=MAIN')
      .then((res) => {
        if (!res.ok) throw new Error('팝업 조회 실패');
        return res.json();
      })
      .then((data: Popup[]) => {
        if (data && data.length > 0) {
          setPopups(data);
          setIsOpen(true);
        }
      })
      .catch(() => {
        // 팝업 로드 실패 시 무시
      });
  }, []);

  const handleClose = useCallback(() => {
    if (dontShowToday) {
      setCookie('hideMainPopup', '1', 24);
    }
    setIsOpen(false);
  }, [dontShowToday]);

  const handleDontShowChange = (checked: boolean) => {
    setDontShowToday(checked);
    if (checked) {
      setCookie('hideMainPopup', '1', 24);
    } else {
      setCookie('hideMainPopup', '', -1);
    }
  };

  if (!isOpen || popups.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={handleClose}
        >
          {/* 배경 오버레이 */}
          <div className="absolute inset-0 bg-black/50" />

          {/* 모달 컨텐츠 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-[90vw] max-w-[400px] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 슬라이드 영역 (3:4 비율) */}
            <div className="relative w-full bg-black" style={{ aspectRatio: '3/4' }}>
              <Swiper
                modules={[Autoplay, Pagination]}
                loop={popups.length > 1}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="w-full h-full popup-swiper"
              >
                {popups.map((popup) => (
                  <SwiperSlide key={popup.id} className="flex items-center justify-center bg-black">
                    {popup.link ? (
                      <a
                        href={popup.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <img
                          src={popup.url || 'https://placehold.co/400x530?text=Popup'}
                          alt={popup.name || '팝업 이미지'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://i.imgur.com/LM6famM.png';
                          }}
                        />
                      </a>
                    ) : (
                      <img
                        src={popup.url || 'https://placehold.co/400x530?text=Popup'}
                        alt={popup.name || '팝업 이미지'}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* 하단 푸터 */}
            <div className="flex items-center justify-between bg-gray-100 px-4 py-2.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={dontShowToday}
                  onChange={(e) => handleDontShowChange(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">오늘 하루 보지 않기</span>
              </label>
              <button
                onClick={handleClose}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
                닫기
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
