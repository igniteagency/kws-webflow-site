import Cookies from 'js-cookie';

export function announcementTracker() {
  const announcementItemsList = document.querySelectorAll('[data-announcement-slug]');

  announcementItemsList.forEach((itemEl) => {
    const slug = itemEl.dataset.announcementSlug;
    const itemDialogEl = itemEl.querySelector<HTMLDialogElement>(
      'dialog[data-el="announcement-item"]'
    );

    if (!itemDialogEl) {
      return;
    }

    if (Cookies.get(`announcement-${slug}-closed`) === 'true') {
      console.debug(`Announcement item '${slug}' already closed`);
      itemEl.classList.add('hide');
    }

    itemDialogEl?.addEventListener('close', () => {
      Cookies.set(`announcement-${slug}-closed`, 'true', { expires: 30 });
    });
  });
}
