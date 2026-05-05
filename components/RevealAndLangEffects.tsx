'use client';

import { useEffect } from 'react';

export function RevealAndLangEffects() {
  useEffect(() => {
    const onScroll = () => {
      const nav = document.getElementById('nav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 70);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const btn = document.querySelector('.lang-toggle');
    if (!btn) return;
    const onClick = () => {
      document.body.classList.toggle('en-mode');
      btn.textContent = document.body.classList.contains('en-mode') ? 'JA' : 'EN';
    };
    btn.addEventListener('click', onClick);
    return () => btn.removeEventListener('click', onClick);
  }, []);

  return null;
}
