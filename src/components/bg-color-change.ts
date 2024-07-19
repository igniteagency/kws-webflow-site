/**
 * When sections with these classes come into view, body gets classes onto it which changes the BG color
 */

type ColorNames = 'blue' | 'navy' | 'white';
type ClassMap = Record<ColorNames, string>;

const CLASSES_MAP: ClassMap = {
  blue: 'bg-change-blue',
  navy: 'bg-change-navy',
  white: 'bg-change-white',
};
const allClassNamesList = Object.keys(CLASSES_MAP).map((color) =>
  getBodyClass(color as ColorNames)
);

const LANDSCAPE_ANIM_ENTRY_THRESHOLD = 0.3; /* when 30% of the viewport visible on desktop */
const PORTRAIT_ANIM_ENTRY_THRESHOLD = 0.5; /* when 50% of viewport is visible on mobile */

export function initBGColorChange() {
  // when width is greater than viewport height
  const threshold =
    window.innerWidth > window.innerHeight
      ? LANDSCAPE_ANIM_ENTRY_THRESHOLD
      : PORTRAIT_ANIM_ENTRY_THRESHOLD;

  const thresholdPercent = threshold * 100;

  Object.keys(CLASSES_MAP).forEach((color) => {
    const colorName = color as ColorNames;
    const SECTION_BG_CLASSNAME = CLASSES_MAP[colorName];

    const elList = document.querySelectorAll(`.${SECTION_BG_CLASSNAME}`);

    if (!elList.length) {
      return;
    }

    const currentBodyClass = getBodyClass(colorName as ColorNames);

    // implement with gsap scrolltrigger using onenter, etc. functions
    elList.forEach((sectionEl) => {
      window.ScrollTrigger.create({
        trigger: sectionEl,
        start: `top ${100 - thresholdPercent}%`,
        end: `bottom ${100 - thresholdPercent}%`,
        onEnter: () => {
          document.body.classList.add(currentBodyClass);
        },
        onLeave: () => {
          document.body.classList.remove(currentBodyClass);
        },
        onEnterBack: () => {
          document.body.classList.add(currentBodyClass);
        },
        onLeaveBack: () => {
          document.body.classList.remove(currentBodyClass);
        },
      });
    });
  });
}

function getBodyClass(color: ColorNames): string {
  return `body-bg-${color}`;
}
