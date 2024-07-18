import { SCRIPTS_LOADED_EVENT } from 'src/constants';

import { initNewsSlider } from '$components/home/news-slider';
import { initNumberCounter } from '$components/number-counter';

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  initNewsSlider();
  initNumberCounter();
});
