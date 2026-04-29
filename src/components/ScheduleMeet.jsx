import { CalendarDays } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './ScheduleMeet.css';

export default function ScheduleMeet() {
  const sectionRef = useScrollReveal();

  return (
    <section className="schedule" id="schedule" ref={sectionRef}>
      <div className="reveal">
        <a href="https://calendly.com/ecombitofficial/30min" className="schedule__btn" target="_blank" rel="noopener noreferrer">
          <CalendarDays size={22} />
          Schedule a Meet Now
        </a>
        <p className="schedule__subtext">
          🔥 Limited slots available — <span>Book your free consultation</span>
        </p>
      </div>
    </section>
  );
}
