'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Lazy-load heavy sections
const Hero     = dynamic(() => import('@/components/sections/Hero'),     { ssr: false });
const About    = dynamic(() => import('@/components/sections/About'),    { ssr: false });
const Skills   = dynamic(() => import('@/components/sections/Skills'),   { ssr: false });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false });
const Journey  = dynamic(() => import('@/components/sections/Journey'),  { ssr: false });
const Contact  = dynamic(() => import('@/components/sections/Contact'),  { ssr: false });

import Navbar        from '@/components/ui/Navbar';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = () => {
    setLoaded(true);
    setTimeout(() => setShowContent(true), 100);
  };

  // Prevent scrolling while loading
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />

      <div
        className="transition-opacity duration-700"
        style={{ opacity: showContent ? 1 : 0 }}
        aria-hidden={!showContent}
      >
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Contact />
        </main>
      </div>
    </>
  );
}
