/**
 * Return an element's position relative to the whole page
 * @param {DOM} el
 * @returns { left, top } Position
 */
export function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

/**
 * Scroll to dom position
 * Usage: onclick="scroll_to('target')"
 * @param {string} target Id of dom element, which is target
 */
export function scrollTo(target) {
	const targetDOM = document.querySelector(target);
  window.scrollTo({
		top: getOffset(targetDOM).top,
		behavior: 'smooth'
	});
}
