'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Motion() {
  const pathname = usePathname();

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ease = 'power3.out';
    gsap.fromTo('.scroll-progress',
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .25 } });
    const hero = gsap.timeline({ paused: true, defaults: { ease } });

    if (document.querySelector('.hero')) {
      hero
        .fromTo('.hero-photo',
          { autoAlpha: 0, scale: 1.075, x: 34 },
          { autoAlpha: 1, scale: 1, x: 0, duration: 1.25, clearProps: 'all' }, 0)
        .fromTo('.hero-reveal',
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: .82, stagger: .13, clearProps: 'all' }, .12)
        .fromTo('.hero-inset',
          { autoAlpha: 0, y: 30, scale: .95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: .7, clearProps: 'all' }, .66)
        .fromTo('.hero-labels > *',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: .55, stagger: .07, clearProps: 'all' }, .78)
        .fromTo('.hero-curve path',
          { strokeDasharray: 500, strokeDashoffset: 500 },
          { strokeDashoffset: 0, duration: 1.1, clearProps: 'all' }, .4);
    } else {
      hero.fromTo('.inner-hero .eyebrow, .inner-hero h1, .inner-hero p, .detail-hero .copy > *, .detail-hero .image',
        { autoAlpha: 0, y: 34 },
        { autoAlpha: 1, y: 0, duration: .8, stagger: .12, clearProps: 'all' });
    }

    const revealItems = gsap.utils.toArray<HTMLElement>(
      '[data-reveal], .experience-inner > div, .explorer > .container > .eyebrow, .explorer > .container > .section-title, .service-tabs, .faq > .container > .eyebrow, .faq > .container > .section-title, .faq-list, .closing-inner > *, .inner-section .section-title, .inner-section .inner-image, .inner-section .inner-copy, .timeline article, .service-card, .detail-section .section-title, .detail-section .numbered article, .detail-section .detail-list li, .contact-form, .contact-links'
    );

    revealItems.forEach((element) => {
      gsap.fromTo(element,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: .78,
          ease,
          clearProps: 'all',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        });
    });

    if (document.documentElement.dataset.intro === 'ready') {
      const playAfterIntro = () => hero.play();
      window.addEventListener('tercel:intro-complete', playAfterIntro, { once: true });
      return () => window.removeEventListener('tercel:intro-complete', playAfterIntro);
    }
    hero.play();
  }, { dependencies: [pathname], revertOnUpdate: true });

  return null;
}
