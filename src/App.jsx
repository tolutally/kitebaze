import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import useScrollReveal from './hooks/useScrollReveal.js';
import BackgroundVideo from './components/BackgroundVideo.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useScrollReveal();
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = document.querySelector(hash);
    target?.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);

  return (
    <>
      <BackgroundVideo />
      <Header />
      <main className="flex-grow z-20 bg-kb-canvas text-kb-ink">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
