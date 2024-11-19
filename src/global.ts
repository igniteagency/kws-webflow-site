import Alpine from 'alpinejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatedDetailsAccordions } from '$components/accordions';
import { announcementTracker } from '$components/announcements';
import { initBGColorChange } from '$components/bg-color-change';
import { enrolmentDownloadForm } from '$components/enrolmentDownloadForm';
import { initNavScripts } from '$components/nav';
import { fadeUp } from '$utils/fade';

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.gsap.registerPlugin(ScrollTrigger);
window.Alpine = Alpine;

window.Webflow?.push(() => {
  initNavScripts();
  initBGColorChange();

  enrolmentDownloadForm();

  animatedDetailsAccordions();

  announcementTracker();

  fadeUp();

  window.Alpine.start();
});
