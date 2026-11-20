import Link from 'next/link';

const audiences = [
  { number: '01', title: 'Organisations', text: 'Build capability, strengthen leadership and connect learning to business priorities.', href: '/services/executive-education' },
  { number: '02', title: 'Institutions', text: 'Shape career pathways and stronger links between education, industry and opportunity.', href: '/services/youth-employability' },
  { number: '03', title: 'Leaders', text: 'Find space for clearer decisions through focused coaching and strategic advisory.', href: '/services/coaching-advisory' },
];

export function Audiences() {
  return <section className="audiences light-section" id="who-we-work-with">
    <div className="container">
      <div className="audiences-heading" data-reveal>
        <div><div className="eyebrow">Who we work with</div><h2 className="section-title">Different ambitions.<br/><em>Shared potential.</em></h2></div>
        <p>Every engagement begins with the people, priorities and context behind the brief.</p>
      </div>
      <div className="audience-grid">
        {audiences.map(item => <Link className="audience-card" href={item.href} key={item.number} data-reveal>
          <span className="audience-number">{item.number}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <span className="audience-arrow" aria-hidden="true">↗</span>
        </Link>)}
      </div>
    </div>
  </section>;
}
