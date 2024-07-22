import { SCRIPTS_LOADED_EVENT } from 'src/constants';

import { initNumberCounter } from '$components/number-counter';

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  initNumberCounter();
});
