import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatedDetailsAccordions } from '$components/accordions';
import { initBGColorChange } from '$components/bg-color-change';
import { initNavScripts } from '$components/nav';
import { TabAutoplay } from '$components/tabs-autoplay';

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.gsap.registerPlugin(ScrollTrigger);

window.Webflow?.push(() => {
  initNavScripts();
  initBGColorChange();
  animatedDetailsAccordions();
  initTabAutoplay();
});

function initTabAutoplay() {
  const TAB_COMPONENT_SELECTOR = '[data-el="tabs-component"]';
  const TAB_ITEM_DESCRIPTION_WRAPPER_SELECTOR = '[data-el="tab-item-description"]';
  const AUTOPLAY_INTERVAL_ATTRIBUTE = 'data-tabs-autoplay-interval';

  const tabComponentEl = document.querySelector(TAB_COMPONENT_SELECTOR);
  if (!tabComponentEl) {
    // console.debug('Tabs component not found', { tabComponentEl });
    return;
  }

  let interval = 5000;

  if (tabComponentEl.hasAttribute(AUTOPLAY_INTERVAL_ATTRIBUTE)) {
    interval = parseInt(tabComponentEl.getAttribute(AUTOPLAY_INTERVAL_ATTRIBUTE)!, 10);
  }

  new TabAutoplay(tabComponentEl, interval, TAB_ITEM_DESCRIPTION_WRAPPER_SELECTOR);
}
