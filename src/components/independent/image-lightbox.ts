/**
 * Image Lightbox with Slider
 */
import { SCRIPTS_LOADED_EVENT } from 'src/constants';
import Swiper from 'swiper';
import { Navigation, EffectFade, A11y } from 'swiper/modules';

const DATA_COMPONENT_SELECTOR = '[data-el="image-lightbox-component"]';

const LIGHTBOX_DATA_NAME_PREFIX = 'data-image-lightbox';
const OPEN_TRIGGER_SELECTOR = `[${LIGHTBOX_DATA_NAME_PREFIX}-trigger="open"]`;
const CLOSE_TRIGGER_SELECTOR = `[${LIGHTBOX_DATA_NAME_PREFIX}-trigger="close"]`;
const IMAGES_WRAPPER_SELECTOR = '[data-lightbox-image-list]';

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  initImageLightboxes();
});

function initImageLightboxes() {
  const componentsList = document.querySelectorAll(DATA_COMPONENT_SELECTOR);
  componentsList.forEach((componentEl) => {
    const openTriggersList = componentEl.querySelectorAll(OPEN_TRIGGER_SELECTOR);
    const closeTriggersList = componentEl.querySelectorAll(CLOSE_TRIGGER_SELECTOR);

    const dialogEl = componentEl.querySelector<HTMLDialogElement>('dialog');

    const imagesWrapperEl = componentEl.querySelector(IMAGES_WRAPPER_SELECTOR);

    if (!dialogEl) {
      console.debug('No modal dialog found', 'Looking for <dialog>');
      return;
    }

    if (!imagesWrapperEl) {
      console.debug('No modal images found', `Looking for ${IMAGES_WRAPPER_SELECTOR}`);
      return;
    }

    const imagesList = imagesWrapperEl.children;
    let swiperInstance: Swiper | null = null;

    openTriggersList.forEach((openTriggerEl) => {
      openTriggerEl.addEventListener('click', () => {
        dialogEl.showModal();

        if (imagesList.length > 1) {
          const swiperParentEl = imagesWrapperEl.parentElement as HTMLElement;

          swiperInstance = new Swiper(swiperParentEl, {
            modules: [Navigation, EffectFade, A11y],
            effect: 'fade',
            loop: true,
            fadeEffect: {
              crossFade: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        }
      });
    });

    closeTriggersList.forEach((closeTriggerEl) => {
      closeTriggerEl.addEventListener('click', () => {
        dialogEl.close();
      });
    });

    dialogEl.addEventListener('close', () => {
      if (swiperInstance) {
        swiperInstance.destroy();
      }
    });
  });
}
