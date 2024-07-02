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

export function initBGColorChange() {
  Object.keys(CLASSES_MAP).forEach((color) => {
    const colorName = color as ColorNames;
    const SECTION_BG_CLASSNAME = CLASSES_MAP[colorName];

    const elList = document.querySelectorAll(`.${SECTION_BG_CLASSNAME}`);

    if (!elList.length) {
      return;
    }

    const currentBodyClass = getBodyClass(colorName as ColorNames);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            allClassNamesList.forEach((eachBodyClass) => {
              // Bail removal if the new class addition is the same as the existing class
              if (currentBodyClass == eachBodyClass) return;
              document.body.classList.remove(eachBodyClass);
            });

            if (document.body.classList.contains(currentBodyClass)) {
              return;
            }
            document.body.classList.add(currentBodyClass);
          } else {
            // do not remove existing background color class when the previous or next section (depending on entry/exit) has the same BG color change
            if (entry.boundingClientRect.y < 0) {
              // page scroll down, section going up, out of view
              const nextSiblingSectionEl = entry.target.nextElementSibling;
              if (
                nextSiblingSectionEl &&
                nextSiblingSectionEl.classList.contains(SECTION_BG_CLASSNAME)
              ) {
                return;
              }
            } else {
              // page scroll up, section going down, out of view
              const previousSiblingSectionEl = entry.target.previousElementSibling;
              if (
                previousSiblingSectionEl &&
                previousSiblingSectionEl.classList.contains(SECTION_BG_CLASSNAME)
              ) {
                return;
              }
            }

            if (!document.body.classList.contains(currentBodyClass)) {
              return;
            }
            document.body.classList.remove(currentBodyClass);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the target is visible
      }
    );

    elList.forEach((bgChangeEl) => {
      observer.observe(bgChangeEl);
    });
  });
}

function getBodyClass(color: ColorNames): string {
  return `body-bg-${color}`;
}
