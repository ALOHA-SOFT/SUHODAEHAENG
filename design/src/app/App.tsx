import React, { useState } from 'react';
import Header from '@/app/components/Header';
import HeroSlider from '@/app/components/HeroSlider';
import ServiceCards from '@/app/components/ServiceCards';
import Reviews from '@/app/components/Reviews';
import Features from '@/app/components/Features';
import QuickApply from '@/app/components/QuickApply';
import SiteMap from '@/app/components/SiteMap';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';
import ResidentConsentPage from '@/app/pages/ResidentConsentPage';
import ElevatorProtectionPage from '@/app/pages/ElevatorProtectionPage';
import ActPermitPage from '@/app/pages/ActPermitPage';
import ScreenInstallationPage from '@/app/pages/ScreenInstallationPage';
import CleaningServicePage from '@/app/pages/CleaningServicePage';
import NoticePage from '@/app/pages/NoticePage';
import NoticeDetailPage from '@/app/pages/NoticeDetailPage';
import InquiryPage from '@/app/pages/InquiryPage';
import ReviewsPage from '@/app/pages/ReviewsPage';
import ServicesPage from '@/app/pages/ServicesPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'resident-consent' | 'elevator-protection' | 'act-permit' | 'screen-installation' | 'cleaning-service' | 'notice' | 'notice-detail' | 'inquiry' | 'reviews' | 'services'>('home');
  const [noticeId, setNoticeId] = useState<number | null>(null);

  // Simple routing based on hash
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'resident-consent') {
        setCurrentPage('resident-consent');
      } else if (hash === 'elevator-protection') {
        setCurrentPage('elevator-protection');
      } else if (hash === 'act-permit') {
        setCurrentPage('act-permit');
      } else if (hash === 'screen-installation') {
        setCurrentPage('screen-installation');
      } else if (hash === 'cleaning-service') {
        setCurrentPage('cleaning-service');
      } else if (hash === 'notice') {
        setCurrentPage('notice');
      } else if (hash.startsWith('notice-detail-')) {
        const id = parseInt(hash.replace('notice-detail-', ''));
        setNoticeId(id);
        setCurrentPage('notice-detail');
      } else if (hash === 'inquiry') {
        setCurrentPage('inquiry');
      } else if (hash === 'reviews') {
        setCurrentPage('reviews');
      } else if (hash === 'services') {
        setCurrentPage('services');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'resident-consent') {
    return <ResidentConsentPage />;
  }

  if (currentPage === 'elevator-protection') {
    return <ElevatorProtectionPage />;
  }

  if (currentPage === 'act-permit') {
    return <ActPermitPage />;
  }

  if (currentPage === 'screen-installation') {
    return <ScreenInstallationPage />;
  }

  if (currentPage === 'cleaning-service') {
    return <CleaningServicePage />;
  }

  if (currentPage === 'notice') {
    return <NoticePage />;
  }

  if (currentPage === 'notice-detail' && noticeId) {
    return <NoticeDetailPage noticeId={noticeId} />;
  }

  if (currentPage === 'inquiry') {
    return <InquiryPage />;
  }

  if (currentPage === 'reviews') {
    return <ReviewsPage />;
  }

  if (currentPage === 'services') {
    return <ServicesPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSlider />
      <ServiceCards />
      <Reviews />
      <Features />
      <QuickApply />
      <SiteMap />
      <Footer />
      <FloatingButtons />
    </div>
  );
}