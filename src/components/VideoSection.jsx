import { useScrollReveal } from '../hooks/useScrollReveal';
import './VideoSection.css';

export default function VideoSection() {
  const sectionRef = useScrollReveal();

  return (
    <section className="video-section" id="video" ref={sectionRef}>
      <div className="video-section__wrapper reveal">
        <div className="video-section__glow" />
        <div className="video-section__frame">
          <div className="video-section__iframe-wrapper">
            <iframe
              src="https://www.youtube.com/embed/uKoluixFuU4?si=kYPjipokboWDDZnE"
              title="Ecombit Case Study — 50K$ in 30 Days"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <p className="video-section__caption">
          🎬 Watch how we generated $50K+ in 30 days for our clients
        </p>
      </div>
    </section>
  );
}
