import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {services,serviceHref} from '@/lib/content';
export const metadata:Metadata={title:'Services'};
export default function Services(){return <><section className="inner-hero dark-section gold-swoop"><div className="container"><div className="eyebrow">Our expertise</div><h1>Human capital,<br/><em>thoughtfully developed.</em></h1><p>Four connected practices help organisations develop national talent, strengthen leaders and build pathways into the future of work.</p></div></section><section className="inner-section dark-section"><div className="container cards-grid">{services.map(s=><article className="service-card" key={s.slug}><div className="card-photo"><Image src={s.image} alt="Illustrative service photograph" fill sizes="(max-width: 768px) 100vw, 50vw"/></div><div className="card-copy"><span>{s.number}</span><h2>{s.title}</h2><p>{s.short}</p><Link href={serviceHref(s.slug)}>Explore this service ↗</Link></div></article>)}</div></section></>}
