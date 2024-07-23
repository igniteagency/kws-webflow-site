import { SCRIPTS_LOADED_EVENT } from 'src/constants';

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  loadSearchTerm();
});

function loadSearchTerm() {
  const EL_SELECTOR = '[data-el="search-term"]';
  const el = document.querySelector(EL_SELECTOR);
  if (!el) {
    console.debug('Search term placeholder not found', `Looking for ${EL_SELECTOR}`);
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const searchTerm = searchParams.get('q');
  if (searchTerm) {
    el.textContent = searchTerm;
  }
}
