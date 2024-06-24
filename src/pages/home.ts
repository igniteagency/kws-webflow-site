import { SCRIPTS_LOADED_EVENT } from 'src/constants';

import { textReveal } from '$components/home/intro-text-reveal';

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  console.debug('hello');
  textReveal();
});
