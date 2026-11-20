'use client';

import { useState } from 'react';

const items = [
  ['Which service is right for our organisation?', 'We begin with your priorities, context and goals, then recommend a focused starting point or a combination of services.'],
  ['Do you work with institutions and government entities?', 'Yes. Tercel works across organisational, education and public sector contexts, with each engagement shaped around its mandate and people.'],
  ['Can programmes be tailored to our needs?', 'Yes. The scope, format and evaluation approach are designed around your people, operating context and desired outcomes.'],
  ['How do you measure whether learning makes a difference?', 'We agree on useful outcomes at the start, then shape evaluation around learning transfer, workplace application and the goals of the engagement.'],
  ['Is executive coaching confidential?', 'Coaching begins with a discussion about objectives, boundaries and confidentiality so leaders can work in a considered setting.'],
  ['How does a new engagement begin?', 'Send a short note about your priorities. We will arrange a conversation to understand the need and discuss a suitable next step.'],
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return <section className="faq dark-section" id="faq">
    <div className="container">
      <div className="eyebrow">Frequently asked questions</div>
      <h2 className="section-title">Start with the <em>right questions.</em></h2>
      <div className="faq-list">
        {items.map(([question, answer], index) => {
          const expanded = open === index;
          return <div className={`faq-item ${expanded ? 'open' : ''}`} key={question}>
            <h3><button type="button" id={`faq-q-${index}`} aria-expanded={expanded} aria-controls={`faq-a-${index}`} onClick={() => setOpen(expanded ? -1 : index)}>{question}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button></h3>
            <div id={`faq-a-${index}`} role="region" aria-labelledby={`faq-q-${index}`} aria-hidden={!expanded} className="faq-answer-wrap"><div className="faq-answer"><p>{answer}</p></div></div>
          </div>;
        })}
      </div>
    </div>
  </section>;
}
