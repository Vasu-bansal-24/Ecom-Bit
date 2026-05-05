import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import OnboardingPage from './components/OnboardingPage';
import { trackPageView } from './hooks/useMetaPixel';

export default function App() {
  const location = useLocation();

  // Fire a Meta Pixel PageView on every SPA route change
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
      <Footer />
    </>
  );
}

