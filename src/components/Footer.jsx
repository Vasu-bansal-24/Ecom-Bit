import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo.svg';
import './Footer.css';

const footerColumns = [
  {
    title: 'Ecombit Connect',
    type: 'contact',
  },
  {
    title: 'Services',
    links: [
      { label: 'Store Setup', href: '/#services' },
      { label: 'Product Research', href: '/#services' },
      { label: 'Ad Campaigns', href: '/#services' },
      { label: 'Brand Building', href: '/#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Results', href: '/#results' },
      { label: 'Reviews', href: '/#reviews' },
      { label: 'Partners', href: '/#partners' },
    ],
  },
  {
    title: 'Get Started',
    links: [
      { label: 'Book a Demo', action: 'modal' },
      { label: 'Contact Us', href: 'mailto:ecombitofficial@gmail.com' },
    ],
  },
];

const socials = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Brand row */}
        <div className="footer__brand-row">
          <Link to="/" className="footer__brand">
            <img src={logo} alt="ecombit" className="footer__logo-icon" />
            <div className="footer__brand-name">
              ecom<span>bit</span>
            </div>
          </Link>
        </div>

        {/* Column grid */}
        <div className="footer__grid">
          {/* Contact Column */}
          <div className="footer__column">
            <h4 className="footer__column-title">{footerColumns[0].title}</h4>
            <div className="footer__socials">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} className="footer__social-link" aria-label={s.label}>
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
            <div className="footer__contact-info">
              <p>📞 +91 96821 65725</p>
              <p>✉️ ecombitofficial@gmail.com</p>
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.slice(1).map((col) => (
            <div className="footer__column" key={col.title}>
              <h4 className="footer__column-title">{col.title}</h4>
              <ul className="footer__column-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.action === 'modal' ? (
                      <Link to="/onboarding" className="footer__link-btn">{link.label}</Link>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <p className="footer__copy">
          © {new Date().getFullYear()} Ecombit. All rights reserved.
        </p>
      </div>

      <button
        className={`footer__top-btn ${showTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
