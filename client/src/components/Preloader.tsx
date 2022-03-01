import React, { useEffect } from 'react';

type Props = {};

export default function Preloader({}: Props) {
  const loadPreloaderEvent = () => {
    document.addEventListener('readystatechange', (event) => {
      if (document.readyState === 'complete') {
        const preloader = document.querySelector("#preloader")!;
        preloader.classList.add("hide");
      }
    });
  }

  useEffect(() => {
    loadPreloaderEvent()
  }, []);

  return (
    <div id="preloader" className="preloader"></div>
  );
}
