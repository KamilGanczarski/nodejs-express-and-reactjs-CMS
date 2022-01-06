import React, { useEffect } from 'react'

export default function Preloader() {
  const loadPreloaderEvent = () => {
    document.addEventListener('readystatechange', (event) => {
      if (event.target.readyState === 'complete') {
        document.querySelector("#preloader").classList.add("hide");
      }
    });
  }

  useEffect(() => {
    loadPreloaderEvent()
  })

  return (
    <div id="preloader" className="preloader"></div>
  )
}
