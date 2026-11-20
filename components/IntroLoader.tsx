'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export function IntroLoader() {
  const overlay = useRef<HTMLDivElement>(null);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (document.documentElement.dataset.intro !== 'ready' || !overlay.current) return;

    const main = document.getElementById('main-content');
    const header = document.querySelector('.site-header');
    const footer = document.querySelector('.site-footer');
    const previousOverflow = document.body.style.overflow;
    main?.setAttribute('inert', '');
    header?.setAttribute('inert', '');
    footer?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.documentElement.removeAttribute('data-intro');
      main?.removeAttribute('inert');
      header?.removeAttribute('inert');
      footer?.removeAttribute('inert');
      document.body.style.overflow = previousOverflow;
      try { sessionStorage.setItem('tercel-intro-seen', '1'); } catch { /* Storage may be disabled. */ }
      window.dispatchEvent(new Event('tercel:intro-complete'));
    };
    finishRef.current = finish;
    const safety = window.setTimeout(finish, 3500);

    const timeline = gsap.timeline({ onComplete: finish });
    timeline
      .fromTo('.intro-logo', { autoAlpha: 0, y: 28, scale: .92 }, { autoAlpha: 1, y: 0, scale: 1, duration: .72, ease: 'power3.out' }, 0)
      .fromTo('.intro-eyebrow', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .48, ease: 'power2.out' }, .35)
      .fromTo('.intro-line', { scaleX: 0 }, { scaleX: 1, duration: .75, ease: 'power2.inOut' }, .42)
      .fromTo('.intro-tagline', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .5, ease: 'power2.out' }, .72)
      .to(overlay.current, { autoAlpha: 0, y: -20, duration: .5, ease: 'power2.inOut' }, 1.55);

    return () => {
      window.clearTimeout(safety);
      timeline.kill();
      if (!finished) {
        main?.removeAttribute('inert');
        header?.removeAttribute('inert');
        footer?.removeAttribute('inert');
        document.body.style.overflow = previousOverflow;
      }
    };
  }, []);

  return <div ref={overlay} className="intro-loader" role="status" aria-label="Opening Tercel website">
    <button type="button" className="intro-skip" onClick={() => finishRef.current()}>Skip intro <span aria-hidden="true">↗</span></button>
    <div className="intro-inner">
      <div className="intro-eyebrow">Dubai · Human capital advisory</div>
      <Image className="intro-logo" src="/images/tercel-logo-dark.png" alt="TERCEL Business Consultancy F.Z.C." width={1620} height={571} priority />
      <div className="intro-track"><span className="intro-line" /></div>
      <p className="intro-tagline">Human capital, elevated.</p>
    </div>
  </div>;
}
