import Swiper from 'swiper';
import { Navigation, Pagination, EffectCreative, A11y } from 'swiper/modules';

export function initNewsSlider() {
  const SELECTOR = '[data-el="news-slider"]';
  const componentEl = document.querySelector(SELECTOR);

  if (!componentEl) {
    console.debug('News slider component not found', `Looking for ${SELECTOR}`);
    return;
  }

  const swiper = new Swiper(componentEl, {
    modules: [Navigation, Pagination, EffectCreative, A11y],
    effect: 'creative',
    loop: true,
    loopAddBlankSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 32,
    creativeEffect: {
      perspective: true,
      prev: {
        scale: 0.9,
        translate: [0, 12, -1], // Move previous slides to the left
        opacity: 0.66,
        origin: 'bottom center',
      },
      next: {
        translate: ['108%', 0, 0], // Move next slides to the right
      },
      limitProgress: 8,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
