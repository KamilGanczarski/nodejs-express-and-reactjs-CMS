import React from 'react';

type Props = {}

export default function Hero({}: Props) {
  return (
    <article className="Hero-parallax bg-black">
      {/* Parallax effect */}
      <section className="parallax min-500">
        <div 
          className="carousel slide carousel-fade h-100"
          id="Hero-carousel"
          data-bs-ride="carousel">
          Hero
        </div>
      </section>
    </article>
  )
}
