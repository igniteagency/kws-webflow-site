import { TABS_CSS_CLASSES } from '@finsweet/ts-utils';

export class TabAutoplay {
  private tabs: NodeListOf<HTMLElement>;
  /** Sets height animation if a selector is passed */
  private descriptionWrapperSelector?: string;
  private interval: number;
  private defaultInterval = 5000;
  private animation: Animation | null = null;
  private currentIndex: number = 0;

  constructor(tabComponent: HTMLElement, interval?: number, descriptionWrapperSelector?: string) {
    this.tabs = tabComponent.querySelectorAll(`.${TABS_CSS_CLASSES.tabLink}`);
    this.interval = interval || this.defaultInterval;
    this.descriptionWrapperSelector = descriptionWrapperSelector;

    if (!this.tabs.length) {
      console.debug('No tabs found', { tabComponent });
      return;
    }

    this.init();
  }

  private init(): void {
    this.addEventListeners();
    this.startAutoplay();
  }

  private addEventListeners(): void {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', (ev) => this.onTabClick(index, ev));
      tab.addEventListener('mouseenter', () => this.pauseAutoplay(index));
      tab.addEventListener('mouseleave', () => this.resumeAutoplay(index));
    });
  }

  private onTabClick(index: number, ev: MouseEvent): void {
    this.deactivateCurrentTab();
    this.currentIndex = index;
    this.activateTab(index, !ev.isTrusted);
    this.resetAutoplay();
  }

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
