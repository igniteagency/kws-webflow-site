const PARAGRAPH_SELECTOR = '[data-el="hero-intro-text"]';

export function textReveal() {
  const paragraphEl = document.querySelector(PARAGRAPH_SELECTOR);

  if (!paragraphEl) {
    console.debug('Home intro paragraph not found');
    return;
  }

  window.gsap.set(paragraphEl, { backgroundSize: '0% 100%' });

  const tl = window.gsap.timeline({
    scrollTrigger: {
      trigger: paragraphEl,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: true,
      id: 'home-intro',
      markers: window.IS_DEBUG_MODE,
    },
  });

  tl.fromTo(
    paragraphEl,
    {
      backgroundSize: '0% 100%',
    },
    {
      backgroundSize: '110% 100%',
    }
  );
}
