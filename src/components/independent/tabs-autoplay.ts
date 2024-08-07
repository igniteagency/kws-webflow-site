import { TabAutoplay } from '$components/tabs-autoplay';

window.Webflow?.push(() => {
  initTabAutoplay();
});

function initTabAutoplay() {
  const TAB_COMPONENT_SELECTOR = '[data-el="tabs-component"]';
  const TAB_ITEM_DESCRIPTION_WRAPPER_SELECTOR = '[data-el="tab-item-description"]';
  const AUTOPLAY_INTERVAL_ATTRIBUTE = 'data-tabs-autoplay-interval';

  const tabComponentEl = document.querySelector(TAB_COMPONENT_SELECTOR);
  if (!tabComponentEl) {
    console.warn('Tabs component not found for autoplay', { tabComponentEl });
    console.debug('Looking for', TAB_COMPONENT_SELECTOR);
    return;
  }

  let interval = 5000;

  if (tabComponentEl.hasAttribute(AUTOPLAY_INTERVAL_ATTRIBUTE)) {
    interval = parseInt(tabComponentEl.getAttribute(AUTOPLAY_INTERVAL_ATTRIBUTE)!, 10);
  }

  new TabAutoplay(tabComponentEl, interval, TAB_ITEM_DESCRIPTION_WRAPPER_SELECTOR);
}
