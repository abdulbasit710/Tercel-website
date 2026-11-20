'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { services, serviceHref } from '@/lib/content';

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Book', '/book'],
  ['Contact', '/contact'],
];

function Brand() {
  return <Link href="/" className="brand" aria-label="Tercel home">
    <Image src="/images/tercel-logo-dark.png" alt="TERCEL Business Consultancy F.Z.C." width={1620} height={571} priority />
  </Link>;
}

function Chevron() {
  return <svg className="nav-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="m3.5 5.25 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function Header() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(false);
  const [compact, setCompact] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const servicesButton = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!drop) return;
    const onOutsideClick = (event: PointerEvent) => {
      if (!dropdown.current?.contains(event.target as Node)) setDrop(false);
    };
    document.addEventListener('pointerdown', onOutsideClick);
    return () => document.removeEventListener('pointerdown', onOutsideClick);
  }, [drop]);

  useEffect(() => {
    if (!menu) return;
    const previous = document.activeElement as HTMLElement;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenu(false);
        menuButton.current?.focus();
      }
      if (event.key === 'Tab' && panel.current) {
        const nodes = [...panel.current.querySelectorAll<HTMLElement>('a,button')];
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    panel.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [menu]);

  return <>
    <a href="#main-content" className="skip">Skip to content</a>
    <header className={`site-header ${compact ? 'compact' : ''}`}>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link className={path === '/' ? 'active' : ''} href="/">Home</Link>
          <Link className={path === '/about' ? 'active' : ''} href="/about">About</Link>
          <div
            className="nav-dropdown"
            ref={dropdown}
            onMouseEnter={() => setDrop(true)}
            onMouseLeave={() => { if (!dropdown.current?.contains(document.activeElement)) setDrop(false); }}
            onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDrop(false); }}
            onKeyDown={event => {
              if (event.key === 'Escape') { setDrop(false); servicesButton.current?.focus(); }
            }}
          >
            <button
              ref={servicesButton}
              type="button"
              className={`services-trigger ${path.startsWith('/services') ? 'active' : ''} ${drop ? 'is-open' : ''}`}
              aria-expanded={drop}
              aria-controls="services-menu"
              onClick={() => setDrop(!drop)}
              onKeyDown={event => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  setDrop(true);
                  requestAnimationFrame(() => dropdown.current?.querySelector<HTMLElement>('.dropdown-panel a')?.focus());
                }
              }}
            >Services <Chevron /></button>
            <div className="dropdown-panel" id="services-menu" hidden={!drop}>
              <span className="dropdown-kicker">Explore our expertise</span>
              <Link href="/services" className="dropdown-all" onClick={() => setDrop(false)}>All services <span aria-hidden="true">↗</span></Link>
              <div className="dropdown-divider" />
              {services.map(service => <Link
                key={service.slug}
                href={serviceHref(service.slug)}
                className={path === serviceHref(service.slug) ? 'current' : ''}
                aria-current={path === serviceHref(service.slug) ? 'page' : undefined}
                onClick={() => setDrop(false)}
              ><span>{service.tab}</span><span className="dropdown-link-arrow" aria-hidden="true">↗</span></Link>)}
            </div>
          </div>
          <Link className={path === '/book' ? 'active' : ''} href="/book">Book</Link>
          <Link className={path === '/contact' ? 'active' : ''} href="/contact">Contact</Link>
        </nav>
        <Link href="/contact" className="btn gold header-cta">Book a consultation <span aria-hidden="true">↗</span></Link>
        <button className="menu-toggle" ref={menuButton} type="button" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}><span /><span /></button>
      </div>
    </header>
    {menu && <div className="mobile-overlay" ref={panel} onClick={event => { if ((event.target as HTMLElement).closest('a')) setMenu(false); }}>
      <nav aria-label="Mobile navigation">
        {links.map(([label, href]) => <Link key={href} href={href}>{label}<span aria-hidden="true">↗</span></Link>)}
        <div className="mobile-services">{services.map(service => <Link href={serviceHref(service.slug)} key={service.slug}>{service.tab}</Link>)}</div>
        <Link className="btn gold" href="/contact">Book a consultation ↗</Link>
      </nav>
    </div>}
  </>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-inner">
      <Brand />
      <nav aria-label="Footer navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <div className="footer-contact">
        <a href="mailto:drvidya@tercelae.com">✉ &nbsp;drvidya@tercelae.com</a>
        <a href="tel:+971527774163">✦ &nbsp;+971 52 777 4163</a>
        <span>♧ &nbsp;Dubai, UAE</span>
      </div>
    </div>
    <div className="footer-bottom">© {new Date().getFullYear()} TERCEL Business Consultancy F.Z.C.</div>
  </footer>;
}
