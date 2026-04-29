import {
  ShoppingBag,
  Megaphone,
  FileText,
  Store,
  Globe,
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Services.css';

const services = [
  {
    icon: Megaphone,
    title: 'TikTok & Meta Ads Management',
    desc: 'High-ROAS Facebook, Instagram, and TikTok ad campaigns managed by experts to drive consistent sales.',
  },
  {
    icon: ShoppingBag,
    title: 'International Store Setup',
    desc: 'We build stunning, conversion-optimized stores tailored for global markets — ready to start selling in days.',
  },
  {
    icon: FileText,
    title: 'LLC Registration',
    desc: 'Complete support for USA and UK LLC registration to ensure your international business is legally compliant.',
  },
  {
    icon: Store,
    title: 'Walmart, Amazon & eBay Account Setup',
    desc: 'Expand your revenue streams with multi-platform selling. We handle complete account creation and setup.',
  },
  {
    icon: Globe,
    title: 'Marketplace & International Dropshipping',
    desc: 'End-to-end dropshipping solutions and global product sourcing to scale your e-commerce business globally.',
  },
];

export default function Services() {
  const sectionRef = useScrollReveal();

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="services__glow" />

      <div className="services__header">
        <div className="section-badge reveal">💼 What We Offer</div>
        <h2 className="section-title reveal">
          Our <span className="green">Services</span>
        </h2>
        <p className="section-subtitle reveal">
          End-to-end dropshipping solutions designed to take you from zero
          to a thriving international e-commerce business.
        </p>
      </div>

      <div className="services__grid">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <div
              className={`services__card reveal reveal-delay-${i + 1}`}
              key={i}
            >
              <div className="services__card-icon">
                <Icon size={26} />
              </div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-desc">{service.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
