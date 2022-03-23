interface Coordinates {
  left: number;
  top: number;
}

/**
 * Return an element's position relative to the whole page
 * @param {DOM} el
 * @returns { left, top } Position
 */
 export function getOffset(el: HTMLButtonElement): Coordinates {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

/**
 * Scroll to dom position
 * Usage: onClick="scrollTo('target')"
 * @param {string} target Id of dom element, which is target
 */
export const scrollTo = (target: string) => {
	const targetDOM: HTMLButtonElement = document.querySelector(target)!;
  if (targetDOM) {
    window.scrollTo({
      top: getOffset(targetDOM).top,
      behavior: 'smooth'
    });
  }
}
