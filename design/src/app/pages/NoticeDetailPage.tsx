import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag, Share2, MessageCircle } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';

interface Notice {
  id: number;
  category: '공지' | '이벤트' | '서비스';
  title: string;
  date: string;
  content: string;
  isNew: boolean;
  detailedContent?: string;
}

interface NoticeDetailPageProps {
  noticeId: number;
}

export default function NoticeDetailPage({ noticeId }: NoticeDetailPageProps) {
  const notices: Notice[] = [
    {
      id: 1,
      category: '공지',
      title: '수호대행 설 연휴 운영 안내',
      date: '2026-01-25',
      content: '설 연휴 기간(2월 5일~2월 9일) 동안 휴무입니다. 긴급 문의는 카카오톡 채널로 남겨주시면 연휴 이후 순차적으로 답변드리겠습니다.',
      isNew: true,
      detailedContent: `안녕하세요, 수호대행입니다.

2026년 설 연휴 운영 일정을 안내드립니다.

【 휴무 기간 】
• 2월 5일(목) ~ 2월 9일(월)

【 정상 운영 재개 】
• 2월 10일(화)부터 정상 운영

연휴 기간 중에는 전화 상담이 어려우나, 카카오톡 채널을 통한 문의는 24시간 접수 가능합니다.
남겨주신 문의사항은 연휴 종료 후 순차적으로 답변드리겠습니다.

불편을 드려 죄송하며, 더욱 좋은 서비스로 보답하겠습니다.
새해 복 많이 받으세요!

감사합니다.`
    },
    {
      id: 2,
      category: '이벤트',
      title: '신규 고객 10% 할인 이벤트',
      date: '2026-01-20',
      content: '처음 수호대행을 이용하시는 고객님께 모든 서비스 10% 할인 혜택을 드립니다. 2월 말까지 진행되는 이벤트이니 놓치지 마세요!',
      isNew: true,
      detailedContent: `🎉 신규 고객 환영 이벤트 🎉

수호대행을 처음 이용하시는 고객님들을 위한 특별한 혜택을 준비했습니다!

【 이벤트 내용 】
• 전 서비스 10% 할인
• 입주민 동의서, 승강기 보양, 행위허가, 방충망 시공, 종합 청소 모두 적용

【 이벤트 기간 】
• 2026년 1월 20일 ~ 2월 28일

【 참여 방법 】
1. 카카오톡 채널 또는 전화로 상담 신청
2. 신규 고객임을 말씀해주세요
3. 견적서에 할인가 자동 적용

【 유의사항 】
• 수호대행을 처음 이용하시는 고객님에 한함
• 다른 할인과 중복 적용 불가
• 서비스별 최소 금액 기준 있음

이 기회를 놓치지 마시고, 수호대행의 전문 서비스를 경험해보세요!

문의: 070-8057-6208 / 카카오톡 채널`
    },
    {
      id: 3,
      category: '서비스',
      title: '방충망 시공 서비스 오픈',
      date: '2026-01-15',
      content: '고객님의 요청으로 방충망 시공 서비스를 새롭게 시작했습니다. 고품질 자재와 전문 시공으로 만족을 드리겠습니다.',
      isNew: true,
      detailedContent: `안녕하세요, 수호대행입니다.

고객님들의 많은 요청에 따라 방충망 시공 서비스를 새롭게 시작하게 되었습니다!

【 서비스 특징 】
✓ 맞춤형 제작: 창틀 사이즈에 정확히 맞춰 제작
✓ 고품질 자재: 내구성이 뛰어난 프리미엄 원단 사용
✓ 전문 시공: 숙련된 기사님의 깔끔한 설치
✓ A/S 보증: 시공 후 1년 무상 A/S

【 시공 가능 종류 】
• 미서기 방충망
• 여닫이 방충망
• 롤 방충망
• 플리세 방충망

【 시공 절차 】
1. 현장 방문 및 견적 (무료)
2. 주문 제작 (2-3일 소요)
3. 방문 시공 (1-2시간)
4. 사용법 안내 및 점검

【 서비스 지역 】
• 용인시, 수원시, 성남시, 화성시 일대
• 기타 지역은 별도 문의

여름철 모기와 벌레 걱정 없이 쾌적한 생활 환경을 만들어드리겠습니다.

문의 및 상담: 070-8057-6208`
    },
    {
      id: 4,
      category: '공지',
      title: '종합 청소 서비스 가격 안내',
      date: '2026-01-10',
      content: '평형별 종합 청소 서비스 가격이 업데이트되었습니다. 자세한 내용은 카카오톡 상담을 통해 문의해주세요.',
      isNew: false,
      detailedContent: `종합 청소 서비스 가격 안내

입주 전후 전문 청소 서비스의 평형별 가격을 안내드립니다.

【 기본 청소 (입주 전 청소) 】
• 10평대: 150,000원~
• 20평대: 200,000원~
• 30평대: 250,000원~
• 40평대: 300,000원~
• 50평대 이상: 별도 견적

【 포함 항목 】
✓ 전체 바닥 청소 및 왁스
✓ 거실/방 전체 청소
✓ 주방 기름때 제거
✓ 욕실 물때 및 곰팡이 제거
✓ 창문/창틀 청소
✓ 베란다 청소
✓ 등기구 청소

【 추가 옵션 】
• 베란다 확장 청소: +50,000원
• 새시 틈새 청소: +30,000원
• 에어컨 청소: 대당 50,000원
• 세탁기 청소: 50,000원

【 특별 할인 】
• 3개 서비스 이상 동시 이용 시 10% 할인
• 재이용 고객 5% 할인

정확한 견적은 현장 상황에 따라 달라질 수 있습니다.
무료 방문 견적을 신청하시면 정확한 금액을 안내해드립니다.

상담 및 견적 문의: 카카오톡 채널 또는 070-8057-6208`
    },
    {
      id: 5,
      category: '서비스',
      title: '승강기 보양 자재 업그레이드',
      date: '2026-01-05',
      content: '더욱 견고하고 안전한 보양 자재로 업그레이드되었습니다. 고객님의 재산을 더욱 안전하게 보호하겠습니다.',
      isNew: false,
      detailedContent: `승강기 보양 자재 업그레이드 안내

고객님의 소중한 재산을 더욱 안전하게 보호하기 위해 보양 자재를 업그레이드했습니다.

【 업그레이드 내용 】

1. 보양판 강화
• 기존: 5T 합판
• 변경: 8T 고밀도 합판
• 효과: 충격 흡수력 40% 향상

2. 코너 보호대 추가
• 엘리베이터 모서리 전용 보호대 설치
• 가구 이동 시 발생하는 충격 완벽 차단

3. 바닥 보양재 개선
• 기존: 일반 PE 매트
• 변경: 고밀도 완충 매트
• 효과: 바닥 스크래치 방지 강화

4. 고정 방식 개선
• 자국이 남지 않는 특수 테이프 사용
• 설치/철거 시간 30% 단축

【 추가 비용 없음 】
자재 업그레이드에 따른 추가 비용은 없습니다.
기존 가격으로 더욱 향상된 서비스를 이용하실 수 있습니다.

【 서비스 절차 】
1. 이사/공사 1일 전 보양 설치
2. 작업 완료 후 보양 철거
3. 청소 및 원상 복구 확인

더욱 안전하고 믿을 수 있는 수호대행이 되겠습니다.

문의: 070-8057-6208`
    },
    {
      id: 6,
      category: '이벤트',
      title: '고객 후기 이벤트 당첨자 발표',
      date: '2025-12-28',
      content: '12월 고객 후기 이벤트 당첨자를 발표합니다. 당첨되신 분들께는 개별 연락드리겠습니다.',
      isNew: false,
      detailedContent: `고객 후기 이벤트 당첨자 발표

12월 한 달간 진행된 고객 후기 이벤트에 참여해주신 모든 분들께 감사드립니다.

【 이벤트 내용 】
• 기간: 2025년 12월 1일 ~ 12월 31일
• 참여 방법: 서비스 이용 후 후기 작성
• 경품: 스타벅스 기프티콘 (총 10명)

【 당첨자 발표 】
1등 (5만원권): 김*민님
2등 (3만원권): 이*수님, 박*영님
3등 (1만원권): 최*진님, 정*희님, 강*우님, 윤*아님, 조*호님, 한*나님, 신*준님

당첨되신 분들께는 등록하신 연락처로 개별 연락드리겠습니다.
경품은 영업일 기준 3일 이내에 발송됩니다.

【 1월 이벤트 예고 】
새해를 맞아 더욱 푸짐한 경품으로 찾아뵙겠습니다.
많은 참여 부탁드립니다!

당첨되신 분들 축하드리며, 참여해주신 모든 분들께 감사드립니다.

문의: 070-8057-6208`
    },
    {
      id: 7,
      category: '공지',
      title: '연말 운영 시간 안내',
      date: '2025-12-20',
      content: '연말 기간 동안 운영 시간이 변경됩니다. 평일 08:00-18:00로 운영되오니 참고 부탁드립니다.',
      isNew: false,
      detailedContent: `연말 운영 시간 안내

연말연시 운영 일정을 안내드립니다.

【 변경 운영 시간 】
• 기간: 2025년 12월 25일 ~ 2026년 1월 3일
• 평일: 08:00 ~ 18:00
• 주말: 휴무

【 정상 운영 재개 】
• 2026년 1월 6일(월)부터 정상 운영
• 평일: 07:00 ~ 19:00

【 긴급 상담 】
• 카카오톡 채널: 24시간 문의 접수 가능
• 긴급 문의는 순차적으로 답변 드립니다

【 서비스 예약 】
• 연말연시 기간은 예약이 많습니다
• 서비스가 필요하신 경우 최소 1주일 전 예약 권장

고객님들의 양해 부탁드리며,
새해 복 많이 받으세요!`
    },
    {
      id: 8,
      category: '서비스',
      title: '입주민 동의서 온라인 신청 시스템 개선',
      date: '2025-12-15',
      content: '더욱 간편하게 입주민 동의서를 신청할 수 있도록 온라인 시스템이 개선되었습니다.',
      isNew: false,
      detailedContent: `입주민 동의서 온라인 신청 시스템 개선

더욱 편리한 서비스 이용을 위해 온라인 신청 시스템을 개선했습니다.

【 개선 사항 】

1. 신청 프로세스 간소화
• 기존: 5단계 → 변경: 3단계
• 신청 소요 시간 50% 단축

2. 실시간 진행 상황 확인
• 신청 → 방문 → 진행 중 → 완료
• 각 단계별 알림톡 발송

3. 모바일 최적화
• 스마트폰으로 언제 어디서나 신청 가능
• 서류 업로드 간편화

4. 자동 견적 시스템
• 평형, 세대 수 입력 시 자동 견적
• 실시간 할인 정보 확인 가능

【 온라인 신청 방법 】
1. 수호대행 카카오톡 채널 접속
2. '입주민 동의서 신청' 메뉴 클릭
3. 필수 정보 입력
4. 신청 완료 및 견적 확인

【 기존 전화/방문 신청도 가능 】
온라인 신청이 어려우신 분들은 기존과 같이 전화나 방문 상담도 가능합니다.

더욱 빠르고 편리한 서비스로 찾아뵙겠습니다.

문의: 070-8057-6208 / 카카오톡 채널`
    }
  ];

  const notice = notices.find(n => n.id === noticeId);

  if (!notice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">공지사항을 찾을 수 없습니다</h1>
          <a href="#notice" className="text-blue-600 hover:underline">목록으로 돌아가기</a>
        </div>
        <Footer />
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch(category) {
      case '공지': return 'from-blue-500 to-cyan-500';
      case '이벤트': return 'from-purple-500 to-pink-500';
      case '서비스': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      
      {/* Back Button */}
      <section className="pt-32 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.a
            href="#notice"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            목록으로 돌아가기
          </motion.a>
        </div>
      </section>

      {/* Notice Content */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 md:p-10 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`px-4 py-1.5 bg-gradient-to-r ${getCategoryColor(notice.category)} text-white text-sm font-bold rounded-full`}>
                  {notice.category}
                </span>
                {notice.isNew && (
                  <span className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full">
                    NEW
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {notice.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{notice.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>{notice.category}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 md:p-10">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                  {notice.detailedContent || notice.content}
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 sm:p-8 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: notice.title,
                          text: notice.content,
                          url: window.location.href
                        });
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-medium">공유하기</span>
                  </motion.button>

                  <motion.a
                    href="https://pf.kakao.com/_qbqbn"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">문의하기</span>
                  </motion.a>
                </div>

                <a
                  href="#notice"
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  목록으로
                </a>
              </div>
            </div>
          </motion.article>

          {/* Related Notices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 sm:mt-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">다른 공지사항</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notices
                .filter(n => n.id !== notice.id && n.category === notice.category)
                .slice(0, 2)
                .map((relatedNotice) => (
                  <motion.a
                    key={relatedNotice.id}
                    href={`#notice-detail-${relatedNotice.id}`}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(relatedNotice.category)} text-white text-xs font-bold rounded-full`}>
                        {relatedNotice.category}
                      </span>
                      {relatedNotice.isNew && (
                        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {relatedNotice.title}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {relatedNotice.date}
                    </p>
                  </motion.a>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
