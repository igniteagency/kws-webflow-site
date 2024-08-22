import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatedDetailsAccordions } from '$components/accordions';
import { announcementTracker } from '$components/announcements';
import { initBGColorChange } from '$components/bg-color-change';
import { initNavScripts } from '$components/nav';
import { fadeUp } from '$utils/fade';

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.gsap.registerPlugin(ScrollTrigger);

window.Webflow?.push(() => {
  initNavScripts();
  initBGColorChange();
  animatedDetailsAccordions();
  announcementTracker();
  fadeUp();
});
