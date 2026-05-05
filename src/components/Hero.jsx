import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Globe from './Globe';
import { trackPixelEvent } from '../hooks/useMetaPixel';
import './Hero.css';

function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame;
    const duration = 2000;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__grid-bg"></div>
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      <div className="hero__layout">
        {/* Left Column — Text Content */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            International Dropshipping Agency
          </div>

          <h1 className="hero__title">
            Sell{' '}
            <span className="gradient-text">World Wide</span>{' '}
            Seamlessly
          </h1>

          <p className="hero__subtitle">
            We build, launch, and scale premium e-commerce stores worldwide.
            From product sourcing to ad campaigns — we handle everything so you
            can focus on growth.
          </p>

          <div className="hero__cta-group">
            <Link
              to="/onboarding"
              className="hero__cta-primary"
              id="hero-cta-demo"
              onClick={() => trackPixelEvent('Lead', { content_name: 'Book Free Demo' })}
            >
              Book Free Demo <ArrowRight size={18} />
            </Link>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-value">
                <AnimatedCounter target={50} suffix="K+" />
              </div>
              <div className="hero__stat-label">Revenue Generated</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value">
                <AnimatedCounter target={200} suffix="+" />
              </div>
              <div className="hero__stat-label">Stores Launched</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value">
                <AnimatedCounter target={15} suffix="+" />
              </div>
              <div className="hero__stat-label">Countries Served</div>
            </div>
          </div>
        </div>

        {/* Right Column — 3D Globe */}
        <div className="hero__globe">
          <Globe />
        </div>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
