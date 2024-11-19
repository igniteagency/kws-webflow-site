/** Set [data-el="nav-menu-item"] on each accordion details element */

const ITEM_SELECTOR = '[data-el="nav-menu-item"]';
const TOGGLE_SELECTOR = 'summary';
const CONTENT_SELECTOR = 'summary + div';

const ANIMATION_DURATION_IN_MS = 300;

export function initNavMenuAccordions() {
  const accordionsList = document.querySelectorAll<HTMLDetailsElement>(ITEM_SELECTOR);

  const isTabletAndBelow = window.matchMedia('max-width: 991px').matches;

  accordionsList.forEach((accordionEl) => {
    const accordionToggleEl = accordionEl.querySelector(TOGGLE_SELECTOR);
    const accordionContentEl = accordionEl.querySelector(CONTENT_SELECTOR);

    if (!accordionToggleEl || !accordionContentEl) {
      console.error('Accordion toggle or content not found', accordionToggleEl, accordionContentEl);
      return;
    }

    if (!isTabletAndBelow) {
      // accordionEl.addEventListener('toggle', () => {
      //   if (accordionEl.open) {
      //     console.debug('already open');
      //     return;
      //   }
      // });

      return;
    }

    /** Height open animation on tablet and below screens */
    accordionToggleEl.addEventListener('click', (event) => {
      event.preventDefault();

      const isOpening = !accordionEl.open;

      if (isOpening) {
        accordionEl.open = true;
        const height = accordionContentEl.scrollHeight;
        accordionContentEl.style.height = '0px';
        accordionContentEl.animate([{ height: '0px' }, { height: `${height}px` }], {
          duration: ANIMATION_DURATION_IN_MS,
          fill: 'forwards',
        });

        accordionsList.forEach((otherAccordion) => {
          if (otherAccordion !== accordionEl && otherAccordion.open) {
            otherAccordion.querySelector(TOGGLE_SELECTOR)?.click();
          }
        });
      } else {
        const height = accordionContentEl.scrollHeight;
        const animation = accordionContentEl.animate(
          [{ height: `${height}px` }, { height: '0px' }],
          {
            duration: ANIMATION_DURATION_IN_MS,
            fill: 'forwards',
          }
        );

        animation.onfinish = () => {
          accordionEl.open = false;
        };
      }
    });
  });
}
