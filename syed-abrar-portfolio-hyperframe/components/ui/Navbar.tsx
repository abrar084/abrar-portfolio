'use client';

import { useEffect, useState } from 'react';
import { PERSONAL } from '@/lib/data';

const NAV_LINKS = [
  { label: 'About',    href: '#about',    num: '01' },
  { label: 'Skills',   href: '#skills',   num: '02' },
  { label: 'Projects', href: '#projects', num: '03' },
  { label: 'Journey',  href: '#journey',  num: '04' },
  { label: 'Contact',  href: '#contact',  num: '05' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let current = -1;
      NAV_LINKS.forEach(({ href }, i) => {
        const el = document.getElementById(href.slice(1));
        if (el && window.scrollY >= el.offsetTop - 140) current = i;
      });
      setActiveIdx(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080a0f]/90 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* { SA } logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 focus:outline-none group"
          aria-label="Back to top"
        >
          <span className="font-mono text-[11px] text-white/25 group-hover:text-violet-400 transition-colors">{'{'}</span>
          <span className="font-display font-bold text-sm tracking-[0.28em] text-white">SA</span>
          <span className="font-mono text-[11px] text-white/25 group-hover:text-violet-400 transition-colors">{'}'}</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center" role="list">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className={`relative flex items-center gap-1.5 px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-200 focus:outline-none ${
                  activeIdx === i ? 'text-white' : 'text-white/40 hover:text-white/75'
                }`}
              >
                {/* active dot */}
                {activeIdx === i && (
                  <span className="w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                )}
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Resume pill */}
        <a
          href={PERSONAL.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.1] text-[11px] font-medium tracking-[0.14em] uppercase text-white/50 hover:border-violet-500/50 hover:text-white hover:bg-violet-500/10 transition-all duration-300 focus:outline-none"
        >
          Resume
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2 focus:outline-none"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-px bg-white/60 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-px bg-white/60 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white/60 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        aria-hidden={!menuOpen}
      >
        <div className="border-t border-white/[0.06] bg-[#080a0f]/95 backdrop-blur-xl px-6 py-4 flex flex-col">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="flex items-center gap-4 py-3.5 border-b border-white/[0.05] last:border-0 text-left focus:outline-none group"
            >
              <span className="font-mono text-[10px] text-white/25 group-hover:text-violet-400 transition-colors w-5">{link.num}</span>
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/55 group-hover:text-white transition-colors">{link.label}</span>
            </button>
          ))}
          <a
            href={PERSONAL.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-[11px] font-medium tracking-widest uppercase text-violet-400"
          >
            Resume ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
