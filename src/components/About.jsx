import { Target } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

export default function About() {
  const sectionRef = useScrollReveal();

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about__header">
        <div className="section-badge reveal">🏢 Who We Are</div>
        <h2 className="section-title reveal">
          About <span className="green">Ecombit</span>
        </h2>
      </div>

      <div className="about__description reveal">
        <p className="about__lead">
          <strong>Ecombit</strong> is a premier international dropshipping and e-commerce
          marketing agency dedicated to empowering businesses in the digital
          marketplace.
        </p>
        <p>
          We specialize in creating visually stunning, high-performing premium online 
          stores tailored to your brand's identity. Whether you're looking to launch 
          a white-label brand or start a successful dropshipping business, Ecombit 
          offers end-to-end support, ensuring you have the tools and strategies needed 
          to thrive. Our expertise extends to boosting sales on leading platforms 
          like Amazon and eBay, helping you maximize your reach and revenue.
        </p>
      </div>

      <div className="about__mission reveal reveal-delay-1">
        <div className="about__mission-icon">
          <Target size={28} />
        </div>
        <h4 className="about__mission-title">Our Mission</h4>
        <p className="about__mission-text">
          "To democratize international e-commerce by providing world-class
          dropshipping infrastructure, mentorship, and marketing expertise
          — enabling entrepreneurs worldwide to build profitable,
          location-independent businesses."
        </p>
      </div>
    </section>
  );
}
