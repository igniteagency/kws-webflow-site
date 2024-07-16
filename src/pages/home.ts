import { SCRIPTS_LOADED_EVENT } from 'src/constants';

import { initNewsSlider } from '$components/home/news-slider';
import { initNumberCounter } from '$components/number-counter';
import { TabAutoplay } from '$components/tabs-autoplay';

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  initTabAutoplay();
  initNewsSlider();
  initNumberCounter();
});

function initTabAutoplay() {
  const TAB_COMPONENT_SELECTOR = '[data-el="tabs-component"]';
  const TAB_ITEM_DESCRIPTION_WRAPPER_SELECTOR = '[data-el="tab-item-description"]';
  const AUTOPLAY_INTERVAL_ATTRIBUTE = 'data-tabs-autoplay-interval';

  const tabComponentEl = document.querySelector(TAB_COMPONENT_SELECTOR);
  if (!tabComponentEl) {
    console.debug('Tabs component not found', { tabComponentEl });
    return;
  }

  let interval = undefined;

  if (tabComponentEl.hasAttribute(AUTOPLAY_INTERVAL_ATTRIBUTE)) {
    interval = parseInt(tabComponentEl.getAttribute(AUTOPLAY_INTERVAL_ATTRIBUTE)!, 10);
  }

  new TabAutoplay(tabComponentEl, interval, TAB_ITEM_DESCRIPTION_WRAPPER_SELECTOR);
}
