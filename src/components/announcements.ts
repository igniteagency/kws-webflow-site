import Cookies from 'js-cookie';

export function announcementTracker() {
  const ANNOUNCEMENT_COMPONENT_SELECTOR = 'dialog[data-el="announcement-item"]';
  const ANNOUNCEMENT_BAR_LIST_WRAPPER_SELECTOR = '.announcement-bar_list-wrapper';
  const ANNOUNCEMENT_BAR_NOTICE_ICON_SELECTOR = '.announcement-bar_notice-icon';

  const dialogComponentEl = document.querySelector<HTMLDialogElement>(
    ANNOUNCEMENT_COMPONENT_SELECTOR
  );
  const heroSection = document.querySelector('.section_hero, .section_hero-text');

  const DIALOG_ANIMATION_DURATION_SECONDS = 0.5;
  const DIALOG_CONTENT_ANIMATION_DURATION_SECONDS = 0.2;

  if (!dialogComponentEl) {
    return;
  }

  if (Cookies.get(`announcement-closed`) === 'true') {
    console.debug(`Announcement item already closed`);
    return;
  }

  dialogComponentEl.show();

  let dialogHeight = dialogComponentEl.scrollHeight;
  let dialogWidth = dialogComponentEl.scrollWidth;

  dialogComponentEl.style.width = `${dialogWidth}px`;
  dialogComponentEl.style.height = `${dialogHeight}px`;

  let isCollapsed = false;

  // Create intersection observer
  if (heroSection) {
    window.gsap.to(heroSection, {
      scrollTrigger: {
        trigger: heroSection,
        start: 'center top',
        onEnter: () => {
          if (!isCollapsed) {
            isCollapsed = true;
            animateDialog(isCollapsed);
          }
        },
        onLeaveBack: () => {
          if (isCollapsed) {
            isCollapsed = false;
            animateDialog(isCollapsed);
          }
        },
      },
    });
  }

  dialogComponentEl.addEventListener('click', () => {
    if (isCollapsed) {
      isCollapsed = false;
      animateDialog(isCollapsed);
    }
  });

  dialogComponentEl.addEventListener('close', () => {
    window.gsap.killTweensOf(heroSection); // Remove scrolltrigger when announcement is closed
    window.gsap.killTweensOf(dialogComponentEl);
    Cookies.set(`announcement-closed`, 'true', {
      expires: 30,
      sameSite: 'None',
      secure: true,
    });
  });

  window.Webflow?.resize.on(() => {
    if (!isCollapsed) {
      console.debug('value recalc');
      // Temporarily remove size constraints
      dialogComponentEl.style.width = '';
      dialogComponentEl.style.height = '';

      // Get natural dimensions
      dialogHeight = dialogComponentEl.scrollHeight;
      dialogWidth = dialogComponentEl.scrollWidth;
    }
  });

  function animateDialog(isCollapsed: boolean) {
    if (isCollapsed) {
      window.gsap.to(dialogComponentEl, {
        duration: DIALOG_ANIMATION_DURATION_SECONDS,
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '50%',
        onStart: () => {
          const tl = window.gsap.timeline();
          tl.to(ANNOUNCEMENT_BAR_LIST_WRAPPER_SELECTOR, {
            duration: DIALOG_CONTENT_ANIMATION_DURATION_SECONDS,
            opacity: 0,
            display: 'none',
          });
          tl.to(ANNOUNCEMENT_BAR_NOTICE_ICON_SELECTOR, {
            duration: DIALOG_CONTENT_ANIMATION_DURATION_SECONDS,
            opacity: 1,
            display: 'flex',
          });
          tl.eventCallback('onComplete', () => {
            tl.kill();
          });
        },
      });
    } else {
      const tl = window.gsap.timeline();
      tl.to(
        ANNOUNCEMENT_BAR_NOTICE_ICON_SELECTOR,
        {
          duration: DIALOG_CONTENT_ANIMATION_DURATION_SECONDS,
          opacity: 0,
          display: 'none',
        },
        '-=0.1'
      );
      tl.to(dialogComponentEl, {
        duration: DIALOG_ANIMATION_DURATION_SECONDS,
        width: dialogWidth,
        height: dialogHeight,
        borderRadius: '0',
      });
      tl.to(
        ANNOUNCEMENT_BAR_LIST_WRAPPER_SELECTOR,
        {
          duration: DIALOG_CONTENT_ANIMATION_DURATION_SECONDS,
          opacity: 1,
          display: 'block',
        },
        '-=0.15'
      );
      tl.eventCallback('onComplete', () => {
        tl.kill();
      });
    }
  }
}
