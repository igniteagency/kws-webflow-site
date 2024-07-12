import { CountUp, type CountUpOptions } from 'countup.js';

const COUNTER_EL_ATTR = 'data-counter';
const COUNTER_DELAY_ATTR = 'data-counter-delay-ms';
const COUNTER_SUFFIX_ATTR = 'data-counter-suffix';

export function initNumberCounter() {
  const counterElList = document.querySelectorAll(`[${COUNTER_EL_ATTR}]`);
  const counterOption: CountUpOptions = {
    duration: 1,
    suffix: '',
    enableScrollSpy: true,
    scrollSpyDelay: 0,
    scrollSpyOnce: true,
  };

  counterElList.forEach((counterEl) => {
    const counterDelay = Number(counterEl.getAttribute(COUNTER_DELAY_ATTR));
    const counterSuffix = counterEl.getAttribute(COUNTER_SUFFIX_ATTR);

    if (counterDelay) {
      counterOption.scrollSpyDelay = counterDelay;
    }
    if (counterSuffix) {
      counterOption.suffix = counterSuffix;
    }

    const endNumber = parseInt(counterEl.textContent as string);

    new CountUp(counterEl, endNumber, counterOption).start();
  });
}
