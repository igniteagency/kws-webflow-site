import { SCRIPTS_LOADED_EVENT } from 'src/constants';

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  const teamCardsElList = document.querySelectorAll('[data-el="team-card-item"]');

  teamCardsElList.forEach((cardEl) => {
    const triggerEl = cardEl.querySelector('[data-el="team-card-popover-trigger"]');
    const popoverEl = cardEl.querySelector<HTMLDialogElement>('dialog');

    if (!triggerEl || !popoverEl) {
      console.debug(
        'No trigger or popover found',
        'Looking for `[data-el="team-card-popover-trigger"]` and <dialog> in card',
        { cardEl }
      );
      return;
    }

    triggerEl.addEventListener('click', (ev) => {
      ev.preventDefault();
      popoverEl.showModal();
    });
  });
});
