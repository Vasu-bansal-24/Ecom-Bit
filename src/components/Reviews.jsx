import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Reviews.css';

const reviews = [
  {
    text: "Working with ECOM BIT completely transformed our online business. We were struggling to expand beyond India, but their expertise with Shopify and Amazon Global helped us enter the US and UK markets seamlessly. Highly recommended!",
    name: 'Rohit Sharma',
    initials: 'RS',
    role: 'E-Commerce Founder',
    platform: 'Amazon Global',
    stars: 5,
  },
  {
    text: "The team at ECOM BIT made international selling feel incredibly simple. From store setup to scaling, they handled everything with precision. Our revenue has grown by over 3x in just 6 months!",
    name: 'Neha Gupta',
    initials: 'NG',
    role: 'Business Owner',
    platform: 'Shopify',
    stars: 5,
  },
  {
    text: "I had no idea how to start selling globally, but ECOM BIT guided me step-by-step. Their Walmart integration and optimization strategies worked wonders for my brand.",
    name: 'Amit Verma',
    initials: 'AV',
    role: 'Brand Owner',
    platform: 'Walmart',
    stars: 5,
  },
  {
    text: "Professional, reliable, and results-driven. ECOM BIT helped us optimize our Shopify store and expand internationally without the usual headaches. Truly a game-changer for our business.",
    name: 'Pooja Mehta',
    initials: 'PM',
    role: 'Shopify Store Owner',
    platform: 'Shopify',
    stars: 5,
  },
  {
    text: "What sets ECOM BIT apart is their deep understanding of global ecommerce. They didn’t just build our store—they built a scalable international business.",
    name: 'Karan Malhotra',
    initials: 'KM',
    role: 'E-Commerce Entrepreneur',
    platform: 'Global Strategy',
    stars: 5,
  },
  {
    text: "Their end-to-end service is exactly what growing brands need. From product listing to global logistics strategy, ECOM BIT delivered beyond expectations.",
    name: 'Sneha Kapoor',
    initials: 'SK',
    role: 'Brand Founder',
    platform: 'Logistics',
    stars: 5,
  },
  {
    text: "We saw immediate improvements in conversions after ECOM BIT optimized our store. Expanding to international markets was smoother than we ever imagined.",
    name: 'Vikas Jain',
    initials: 'VJ',
    role: 'Store Owner',
    platform: 'Optimization',
    stars: 5,
  },
];

export default function Reviews() {
  const sectionRef = useScrollReveal();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 300;
      const gap = 24;
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="reviews" id="reviews" ref={sectionRef}>
      <div className="reviews__header">
        <div className="section-badge reveal">⭐ Client Testimonials</div>
        <h2 className="section-title reveal">
          What Our <span className="green">Clients Say</span>
        </h2>
        <p className="section-subtitle reveal">
          Real feedback from entrepreneurs we've helped scale globally
        </p>
      </div>

      <div className="reviews__carousel-wrapper reveal reveal-delay-1">
        <button className="reviews__scroll-btn left" onClick={() => scroll('left')} aria-label="Scroll left">
          <ChevronLeft size={24} />
        </button>

        <div className="reviews__grid" ref={scrollRef}>
          {reviews.map((review, i) => (
            <div className="reviews__card" key={i}>
              <div className="reviews__quote">"</div>
              <div className="reviews__stars" aria-label={`${review.stars} stars`}>
                {Array.from({ length: review.stars }).map((_, si) => (
                  <span key={si}>★</span>
                ))}
              </div>
              <p className="reviews__text">{review.text}</p>
              <span className="reviews__platform">{review.platform}</span>
              <div className="reviews__author">
                <div className="reviews__avatar">{review.initials}</div>
                <div className="reviews__author-info">
                  <div className="reviews__author-name">{review.name}</div>
                  <div className="reviews__author-role">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="reviews__scroll-btn right" onClick={() => scroll('right')} aria-label="Scroll right">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
