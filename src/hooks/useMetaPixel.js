/**
 * Meta Pixel helper utilities.
 *
 * The base pixel script is loaded in index.html (init + first PageView).
 * These helpers let React components fire additional events for SPA navigation
 * and conversion tracking.
 */

/**
 * Fire a standard Meta Pixel event.
 * @param {string} eventName  — e.g. 'PageView', 'Lead', 'CompleteRegistration'
 * @param {object} [params]   — optional event parameters
 */
export function trackPixelEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
}

/**
 * Fire a PageView event — call this on every SPA route change.
 */
export function trackPageView() {
  trackPixelEvent('PageView');
}
