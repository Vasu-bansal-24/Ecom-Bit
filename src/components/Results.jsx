import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import logo from '../assets/logo.svg';
import './Results.css';

const resultCards = [
  {
    title: 'Shopify Sales',
    subtitle: '31 Orders in 24 Hours',
    flags: ['🇺🇸', '🇬🇧'],
    image: '/5.png'
  },
  {
    title: 'Shopify Sales',
    subtitle: '6X ROAS in England Dropshipping',
    flags: ['🇬🇧', '🇺🇸'],
    image: '/6.png'
  },
  {
    title: 'Shopify Sales',
    subtitle: 'TikTok Ads Result',
    flags: ['🇺🇸', '🇦🇪'],
    image: '/7.png'
  },
  {
    title: 'Shopify Sales',
    subtitle: '26 Orders in 24 Hours',
    flags: ['🇺🇸', '🇬🇧'],
    image: '/8.png'
  },
  {
    title: 'Shopify Sales',
    subtitle: 'UAE Drop-Shipping — 2 Orders',
    flags: ['🇦🇪', '🇺🇸'],
    image: '/9.png'
  },
  {
    title: 'Shopify Sales',
    subtitle: '7 Orders in 24 Hours',
    flags: ['🇺🇸', '🇬🇧'],
    image: '/10.png'
  },
  {
    title: 'Video Marketing',
    subtitle: 'YouTube Thumbnail & Growth',
    flags: ['🌐'],
    image: '/Red Bold Finance YouTube Thumbnail (16).png',
    large: true
  }
];



function TiltCard({ children, className }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s ease-out';
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.5s ease-out' }}
    >
      {children}
    </div>
  );
}



export default function Results() {
  const sectionRef = useScrollReveal();
  const carouselRef = useRef(null);

  const scroll = (dir) => {
    const track = carouselRef.current;
    if (!track) return;
    const scrollAmount = 340;
    track.scrollBy({ left: dir === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="results" id="results" ref={sectionRef}>
      <div className="results__header reveal">
        <h2 className="results__title">
          Results We Have{' '}
          <span className="gradient-text">Generated</span>
        </h2>
      </div>

      {/* Result Cards Grid */}
      <div className="results__grid">
        {resultCards.map((card, i) => (
          <TiltCard className={`results__card reveal reveal-delay-${(i % 6) + 1} ${card.large ? 'results__card--large' : ''}`} key={i}>
            <div className="results__card-screenshot">
              <img
                src={card.image}
                alt={`${card.title} screenshot`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div className="results__card-content">
              <div className="results__card-title">{card.title}</div>
              <div className="results__card-subtitle">{card.subtitle}</div>
            </div>
          </TiltCard>
        ))}
      </div>



    </section>
  );
}
