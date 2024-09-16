import { SCRIPTS_LOADED_EVENT } from 'src/constants';

const navEl = document.querySelector('[data-el="nav"]');
const headingChunksEl = document.querySelectorAll('[data-el="hero-heading-chunk"]');
const descriptionEl = document.querySelector('[data-el="hero-description"]');
const ctaButtonsEl = document.querySelector('[data-el="hero-buttons"]');

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  window.gsap.set(navEl, { yPercent: -200 });
  window.gsap.set(headingChunksEl, { yPercent: 100 });
  window.gsap.set([descriptionEl, ctaButtonsEl], { opacity: 0 });

  const tl = window.gsap.timeline({
    delay: 1.5,
    defaults: {
      duration: 0.5,
      ease: 'power2.out',
    },
    onComplete: () => {
      window.gsap.set(navEl, { clearProps: 'all' });
    },
  });

  tl.to(navEl, {
    yPercent: 0,
  })
    .to(headingChunksEl, {
      yPercent: 0,
      stagger: 0.75,
      delay: 0.6,
    })
    .to(descriptionEl, {
      opacity: 1,
      delay: 0.4,
    })
    .to(
      ctaButtonsEl,
      {
        opacity: 1,
      },
      '<'
    );
});
