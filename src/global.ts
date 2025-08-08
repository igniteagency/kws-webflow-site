import Alpine from 'alpinejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animatedDetailsAccordions } from '$components/accordions';
import { announcementTracker } from '$components/announcements';
import { initBGColorChange } from '$components/bg-color-change';
import { enrolmentDownloadForm } from '$components/enrolmentDownloadForm';
import { initNavScripts } from '$components/nav';
import { setCurrentYear } from '$utils/current-year';
import handleExternalLinks from '$utils/external-link';
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

  setCurrentYear();

  handleExternalLinks();

  window.Alpine.start();
});
