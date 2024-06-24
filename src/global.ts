import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatedDetailsAccordions } from '$components/accordions';
import { initNavScripts } from '$components/nav';

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.gsap.registerPlugin(ScrollTrigger);

window.Webflow?.push(() => {
  initNavScripts();
  animatedDetailsAccordions();
});
