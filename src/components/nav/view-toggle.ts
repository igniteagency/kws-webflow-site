/** Toggles the display of nav based on page scroll */
const NAV_SELECTOR = '[data-el="nav"]';
const NAV_SHOW_CLASS = 'is-shown';
const NAV_STATIC_CLASS = 'is-sticky';

const NAV_TYPE_CHANGE_TRIGGER_SELECTOR = '[data-el="nav-type-change-trigger"]';

export function initNavToggle() {
  const navEl = document.querySelector(NAV_SELECTOR);
  if (!navEl) {
    console.debug('Nav component not found', { navEl });
    return;
  }

  navToggleOnScroll(navEl);
  staticNavSetter(navEl);
}

function navToggleOnScroll(navEl: HTMLElement) {
  window.ScrollTrigger.create({
    start: 'top top',
    end: 'max',
    onUpdate: (self) => {
      if (self.direction === -1) {
        // scrolled up
        navEl.classList.add(NAV_SHOW_CLASS);
      } else {
        // scrolled down
        navEl.classList.remove(NAV_SHOW_CLASS);
      }
    },
  });
}

/** Sets white static nav on crossing threshold, on pages which don't have static nav by default */
function staticNavSetter(navEl: HTMLElement) {
  if (navEl.classList.contains(NAV_STATIC_CLASS)) {
    window.DEBUG('Nav is already static by default');
    return;
  }

  const triggerEl = document.querySelector(NAV_TYPE_CHANGE_TRIGGER_SELECTOR);
  if (!triggerEl) {
    console.debug(
      'Nav threshold trigger element not found',
      { triggerEl },
      { NAV_TYPE_CHANGE_TRIGGER_SELECTOR }
    );
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.debug('intersection!', entry.intersectionRatio);
        if (entry.isIntersecting) {
          navEl.classList.remove(NAV_STATIC_CLASS);
        } else {
          navEl.classList.add(NAV_STATIC_CLASS);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: [0, 1],
    }
  );
  observer.observe(triggerEl);
}
