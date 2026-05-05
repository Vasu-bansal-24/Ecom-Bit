import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Results from './Results';
import { trackPixelEvent } from '../hooks/useMetaPixel';
import './OnboardingPage.css';

export default function OnboardingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Scroll to top when landing on this page
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append('access_key', '99391002-f18d-4573-be48-755452454013');
    formData.append('subject', 'New Onboarding Application from Ecombit');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        // Fire Meta Pixel conversion event
        trackPixelEvent('CompleteRegistration', {
          content_name: 'Onboarding Application',
          status: true,
        });
        setIsSubmitted(true);
        // Optional: scroll to success message
        window.scrollTo(0, 0);
      } else {
        console.error('Submission failed', data);
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      alert('An error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-page__container">
        {isSubmitted ? (
          <div className="success-state">
            <CheckCircle size={64} className="success-icon" />
            <h3>Application Received!</h3>
            <p>
              Thank you for choosing Ecombit. Our team will review your details and reach out shortly to schedule your personalized demo.
            </p>
          </div>
        ) : (
          <div className="onboarding-page__form-wrapper">
            <div className="onboarding-page__header">
              <h1 className="onboarding-page__title">Get Started with Ecombit</h1>
              <p className="onboarding-page__subtitle">
                Fill out the form below and we'll contact you to build your international e-commerce strategy.
              </p>
            </div>

            <form className="onboarding-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name <span>*</span></label>
                <input type="text" name="name" className="form-input" placeholder="John Doe" required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone No. <span>*</span></label>
                  <input type="tel" name="phone" className="form-input" placeholder="+1 (555) 000-0000" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Alternate No. <span>*</span></label>
                  <input type="tel" name="alternate_phone" className="form-input" placeholder="+1 (555) 111-1111" required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Address <span>*</span></label>
                <textarea name="address" className="form-textarea" placeholder="Street Address, City, State, ZIP..." required></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Seller Type <span>*</span></label>
                  <select name="seller_type" className="form-select" required defaultValue="">
                    <option value="" disabled>Select your type...</option>
                    <option value="Dropshipper">Dropshipper</option>
                    <option value="Marketplace seller">Marketplace Seller</option>
                    <option value="Brand">Brand</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Region <span>*</span></label>
                  <select name="target_region" className="form-select" required defaultValue="">
                    <option value="" disabled>Select target market...</option>
                    <option value="USA, CANADA, AUSTRALIA">USA, Canada, Australia</option>
                    <option value="EUROPE">Europe</option>
                    <option value="GULF MARKET">Gulf Market</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Do you own an LLC? <span>*</span></label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input type="radio" name="llc" value="yes" required /> Yes
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="llc" value="no" required /> No
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Daily Ad Budget (USD) <span>*</span></label>
                  <input type="number" name="daily_ad_budget_usd" min="0" className="form-input" placeholder="e.g. 50" required />
                </div>
              </div>

              <button type="submit" className="form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending Application...' : 'Submit Application'}
              </button>
            </form>
          </div>
        )}
      </div>
      
      <div className="onboarding-page__results">
        <Results />
      </div>
    </div>
  );
}
