import { componentsType } from '../../../utils/interfaces';

export const showModal = (component: componentsType) => {
  const DOMelement = document.querySelector(`#${component}-modal-btn`) as HTMLButtonElement;
  if (DOMelement) {
    DOMelement.click();
    return;
  }
  console.log(`No coponent like ${component}`);
}
