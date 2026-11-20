import type { Metadata } from 'next';
import { Header, Footer } from '@/components/Shell';
import { Motion } from '@/components/Motion';
import { BackToTop } from '@/components/BackToTop';
import { IntroLoader } from '@/components/IntroLoader';
import './globals.css';
export const metadata: Metadata = {title:{default:'TERCEL Business Consultancy | Human Capital, Elevated',template:'%s | TERCEL'},description:'Dubai-based advisory for Emiratization, executive education, coaching and youth employability.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><script dangerouslySetInnerHTML={{__html:"try{if(!sessionStorage.getItem('tercel-intro-seen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.intro='ready';setTimeout(function(){document.documentElement.removeAttribute('data-intro');window.dispatchEvent(new Event('tercel:intro-complete'))},4000)}}catch(e){}"}} /></head><body><IntroLoader/><div className="scroll-progress" aria-hidden="true"/><Header/><Motion/><main id="main-content">{children}</main><Footer/><BackToTop/></body></html>}
