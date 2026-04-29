import { useScrollReveal } from '../hooks/useScrollReveal';
import './Partners.css';

/* ── Inline SVG logo components ── */

const SpocketLogo = () => (
  <svg viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="partners__logo-svg">
    <circle cx="16" cy="20" r="12" stroke="#6C5CE7" strokeWidth="2.5" fill="none" />
    <circle cx="16" cy="20" r="5" fill="#6C5CE7" />
    <path d="M22 14 L28 8" stroke="#6C5CE7" strokeWidth="2.5" strokeLinecap="round" />
    <text x="38" y="26" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="18" fill="#E2E8F0">spocket</text>
  </svg>
);

const PayoneerLogo = () => (
  <svg viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="partners__logo-svg">
    <circle cx="16" cy="20" r="13" fill="#FF4800" />
    <path d="M10 20 L16 14 L22 20 L16 26 Z" fill="white" />
    <text x="36" y="26" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="17" fill="#E2E8F0">Payoneer</text>
  </svg>
);

const AmazonGlobalLogo = () => (
  <svg viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="partners__logo-svg">
    <text x="4" y="24" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="17" fill="#E2E8F0">amazon</text>
    <text x="88" y="24" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="13" fill="#FF9900"> global</text>
    <path d="M4 28 Q50 36 140 28" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M130 24 L140 28 L130 32" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const WalmartLogo = () => (
  <svg viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="partners__logo-svg">
    {/* Spark icon */}
    <g transform="translate(16,20)">
      <line x1="0" y1="-10" x2="0" y2="10" stroke="#FFC220" strokeWidth="3" strokeLinecap="round" />
      <line x1="-8.66" y1="-5" x2="8.66" y2="5" stroke="#FFC220" strokeWidth="3" strokeLinecap="round" />
      <line x1="-8.66" y1="5" x2="8.66" y2="-5" stroke="#FFC220" strokeWidth="3" strokeLinecap="round" />
      <circle cx="0" cy="-10" r="2" fill="#FFC220" />
      <circle cx="0" cy="10" r="2" fill="#FFC220" />
      <circle cx="-8.66" cy="-5" r="2" fill="#FFC220" />
      <circle cx="8.66" cy="5" r="2" fill="#FFC220" />
      <circle cx="-8.66" cy="5" r="2" fill="#FFC220" />
      <circle cx="8.66" cy="-5" r="2" fill="#FFC220" />
    </g>
    <text x="36" y="26" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="17" fill="#E2E8F0">Walmart</text>
  </svg>
);

const EtsyLogo = () => (
  <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="partners__logo-svg">
    <text x="10" y="28" fontFamily="Georgia, serif" fontWeight="700" fontSize="26" fontStyle="italic" fill="#F1641E">Etsy</text>
  </svg>
);

const MetaBusinessLogo = () => (
  <svg viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="partners__logo-svg">
    {/* Infinity-like Meta icon */}
    <path
      d="M8 20 C8 12, 14 8, 18 14 C22 20, 26 32, 30 32 C34 32, 38 24, 38 20 C38 16, 34 12, 30 12 C26 12, 22 20, 18 28 C14 36, 8 28, 8 20 Z"
      stroke="#0081FB" strokeWidth="3" fill="none" strokeLinecap="round"
    />
    <text x="48" y="25" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="17" fill="#E2E8F0">Meta</text>
    <text x="90" y="25" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="12" fill="#94A3B8"> Business</text>
  </svg>
);

const ShopifyBusinessLogo = () => (
  <svg viewBox="0 0 220 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="partners__logo-svg">
    {/* Shopping bag icon */}
    <path d="M10 12 L14 6 L22 6 L26 12 L26 34 L10 34 Z" fill="none" stroke="#96BF48" strokeWidth="2" strokeLinejoin="round" />
    <path d="M14 12 L14 8 C14 4, 22 4, 22 8 L22 12" stroke="#96BF48" strokeWidth="2" strokeLinecap="round" fill="none" />
    <text x="34" y="25" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="17" fill="#E2E8F0">Shopify</text>
    <text x="106" y="25" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="12" fill="#94A3B8"> Business</text>
  </svg>
);

const TemuLogo = () => (
  <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="partners__logo-svg">
    <text x="8" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="24" fill="#FB6238">T</text>
    <text x="24" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="24" fill="#FFA41B">e</text>
    <text x="42" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="24" fill="#E2E8F0">m</text>
    <text x="66" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="24" fill="#00B4D8">u</text>
  </svg>
);

const AutoDSLogo = () => (
  <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="partners__logo-svg">
    <rect x="4" y="8" width="26" height="24" rx="5" fill="#3B82F6" />
    <text x="9" y="27" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="16" fill="white">A</text>
    <text x="36" y="27" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="19" fill="#E2E8F0">AutoDS</text>
  </svg>
);

/* ── Partner data ── */
const partners = [
  { id: 'spocket', name: 'Spocket', Logo: SpocketLogo },
  { id: 'payoneer', name: 'Payoneer', Logo: PayoneerLogo },
  { id: 'amazon-global', name: 'Amazon Global', Logo: AmazonGlobalLogo },
  { id: 'walmart', name: 'Walmart', Logo: WalmartLogo },
  { id: 'etsy', name: 'Etsy', Logo: EtsyLogo },
  { id: 'meta-business', name: 'Meta Business', Logo: MetaBusinessLogo },
  { id: 'shopify-business', name: 'Shopify Business', Logo: ShopifyBusinessLogo },
  { id: 'temu', name: 'Temu', Logo: TemuLogo },
  { id: 'autods', name: 'AutoDS', Logo: AutoDSLogo },
];

/* ── Component ── */
export default function Partners() {
  const sectionRef = useScrollReveal();

  // Duplicate the list so the marquee seamlessly loops
  const duplicated = [...partners, ...partners];

  return (
    <section className="partners" id="partners" ref={sectionRef}>
      <div className="partners__header reveal">
        <span className="partners__badge">
          <span className="partners__badge-icon">🤝</span>
          Trusted Ecosystem
        </span>
        <h2 className="partners__title">
          Our <span className="green">Business Partners</span>
        </h2>
        <p className="partners__subtitle">
          Powering global e-commerce with industry-leading platforms and services
        </p>
      </div>

      {/* Single row — scrolls left */}
      <div className="partners__marquee-wrapper reveal reveal-delay-2">
        <div className="partners__marquee-track" aria-label="Business partner logos">
          {duplicated.map((p, i) => (
            <div className="partners__logo-card" key={`${p.id}-${i}`} title={p.name}>
              <p.Logo />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
