/**
 * When sections with these classes come into view, body gets classes onto it which changes the BG color
 */

type ColorNames = 'blue' | 'navy' | 'white';
type ClassMap = Record<ColorNames, string>;

const CLASSES_MAP: ClassMap = {
  blue: '.bg-change-blue',
  navy: '.bg-change-navy',
  white: '.bg-change-white',
};
const allClassNamesList = Object.keys(CLASSES_MAP).map((color) =>
  getBodyClass(color as ColorNames)
);

export function initBGColorChange() {
  Object.keys(CLASSES_MAP).forEach((color) => {
    const colorName = color as ColorNames;
    const sectionClassSelector = CLASSES_MAP[colorName];

    const elList = document.querySelectorAll(sectionClassSelector);

    if (!elList.length) {
      return;
    }

    const currentBodyClass = getBodyClass(colorName as ColorNames);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.debug('intersecting section', entry.target);
            console.debug('class added', currentBodyClass);
            allClassNamesList.forEach((eachBodyClass) => {
              // Bail removal if the new class addition is the same as the existing class
              if (currentBodyClass == eachBodyClass) return;
              document.body.classList.remove(eachBodyClass);
            });
            document.body.classList.add(currentBodyClass);
          } else {
            document.body.classList.remove(currentBodyClass);
            console.debug('class removed', currentBodyClass);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the target is visible
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
