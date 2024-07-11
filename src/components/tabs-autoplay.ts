import { TABS_CSS_CLASSES } from '@finsweet/ts-utils';

export class TabAutoplay {
  private tabComponent: HTMLElement;
  private tabs: NodeListOf<HTMLElement>;
  /** Sets height animation if a selector is passed */
  private descriptionWrapperSelector?: string;
  private interval: number;
  private defaultInterval = 5000;
  private animation: Animation | null = null;
  private currentIndex: number = 0;

  constructor(tabComponent: HTMLElement, interval?: number, descriptionWrapperSelector?: string) {
    this.tabComponent = tabComponent;
    this.tabs = tabComponent.querySelectorAll(`.${TABS_CSS_CLASSES.tabLink}`);
    this.interval = interval || this.defaultInterval;
    this.descriptionWrapperSelector = descriptionWrapperSelector;

    if (!this.tabs.length) {
      console.debug('No tabs found', { tabComponent });
      return;
    }

    if (this.tabs.length === 1) {
      console.debug('Only one tab found, not running autoplay', { tabComponent });
      return;
    }

    this.init();
  }

  private init(): void {
    this.addEventListeners();

    // start and pause when main element comes in and out of view, using intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.intersectionRatio < 0.2) {
              // Temp click to start the first tab again when it comes into view
              this.onTabClick(1);
            } else {
              this.onTabClick(0);
            }
          } else {
            this.resetAutoplay();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.2],
      }
    );
    observer.observe(this.tabComponent);
  }

  private addEventListeners(): void {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', (ev) => this.onTabClick(index, ev));
      tab.addEventListener('pointerenter', () => this.pauseAutoplay(index));
      tab.addEventListener('pointerleave', () => this.resumeAutoplay(index));
    });
  }

  private onTabClick(index: number, ev?: MouseEvent): void {
    this.deactivateCurrentTab();
    this.currentIndex = index;
    this.activateTab(index, !ev?.isTrusted || true);
    this.resetAutoplay();
  }

  // TODO: pause autoplay if the tab is already hovered before it becoming active
  private startAutoplay(): void {
    this.animation = new Animation(
      new KeyframeEffect(null, [{ opacity: 0 }, { opacity: 1 }], {
        duration: this.interval,
        iterations: 1,
      }),
      document.timeline
    );

    this.animation.onfinish = () => {
      this.switchToNextTab();
    };

    this.animation.play();
  }

  private pauseAutoplay(tabIndex: number): void {
    if (tabIndex !== this.currentIndex) {
      return;
    }
    this.animation?.pause();
  }

  private resumeAutoplay(tabIndex: number): void {
    if (tabIndex !== this.currentIndex) {
      return;
    }
    if (this.animation && this.animation.playState === 'paused') {
      this.animation.play();
    }
  }

  private resetAutoplay(): void {
    this.animation?.cancel();
    this.startAutoplay();
  }

  private switchToNextTab(): void {
    this.animation?.cancel();
    this.deactivateCurrentTab();
    this.currentIndex = (this.currentIndex + 1) % this.tabs.length;
    this.activateTab(this.currentIndex);
  }

  private activateTab(index: number, shouldTriggerClick: boolean = true): void {
    const tab = this.tabs[index];

    this.animateDescriptionWrapperHeight('show', index);

    if (shouldTriggerClick) {
      tab.click();
    }
  }

  private deactivateCurrentTab(): void {
    this.animateDescriptionWrapperHeight('hide');
  }

  private animateDescriptionWrapperHeight(type: 'show' | 'hide', tabIndex?: number): void {
    if (!this.descriptionWrapperSelector) {
      return;
    }

    const index = tabIndex || this.currentIndex;
    const descriptionWrapperEl = this.tabs[index].querySelector(
      this.descriptionWrapperSelector
    ) as HTMLElement;

    let startHeight, endHeight: number;

    if (type === 'show') {
      startHeight = 0;
      endHeight = descriptionWrapperEl.scrollHeight;
    } else {
      startHeight = descriptionWrapperEl.scrollHeight;
      endHeight = 0;
    }

    descriptionWrapperEl.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], {
      duration: 300,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
  }
}
