import React, { useEffect } from 'react';

type Props = {}

export default function SkewedSlider({}: Props) {
  const image0 = '/images/silesia-group/jINszO4Q.jpeg';
  const image1 = '/images/silesia-group/OliverOlson-Parter-1.jpg';

  const addEvents = () => {
    document.querySelectorAll('.slider__item').forEach(slider => {
      slider.addEventListener('mouseover', event => {
        document.querySelectorAll('.slider__item').forEach(slider_c => {
          slider_c.classList.remove('active');
        });
        const element = event.currentTarget as HTMLElement;
        element.classList.add('active');
      });
    });

    document.querySelectorAll('.slider__item').forEach(slider => {
      slider.addEventListener('mouseout', event => {
        document.querySelectorAll('.slider__item').forEach(slider_c => {
          slider_c.classList.remove('active');
        });
      });
    });
  }

  /**
    * Change active slide
    * @param {string} direction
    */
  const change_active_slide = (direction: string) => {
      const sliderItem = document.querySelector('.slider__item') as HTMLElement;
      sliderItem.classList.remove('active');
      if (direction == 'right') {
        document.querySelectorAll('.slider__item')[1].classList.add('active');
      } else {
        document.querySelectorAll('.slider__item')[0].classList.add('active');
      }
  }

  useEffect(() => {
    addEvents();
  }, []);

  return (
    <article className="Skewed-slider">
      <div className="slider h-100-md-vh">
        {/* Left slider */}
        <section className="slider__item">
          <div
            className="slider__img-gauche"
            style={{backgroundImage: `url(${image0})`}}>
            <div className="text-light slider__text">
              <div className="shown text-center">
                <img
                  src="/images/9literfilmy/logo/logobw.png"
                  alt="logobw"
                  className="logo" />
              </div>
              <div className="hidden">
                <h1>9LITER FILMY</h1>
                <h5 className="pb-5 m-0">
                  produkcja filmowa, spoty reklamowe, teledyski, rental
                </h5>
                <div className="w-100 row m-0 text-center">
                  <a
                    href="https://www.9literfilmy.pl/"
                    className="btn btn-sm w-auto btn-light mx-auto fw-bold btn-slide-icon">
                    <span>Visit us</span>
                    <i className="icon-right-open black"></i>
                  </a>
                </div>
                <div className="d-lg-none w-100 row pt-5 m-0 text-center">
                  <button
                    onClick={()=>change_active_slide('right')}
                    className="btn mx-auto text-hover-light">
                    <i className="icon-right-open h2 m-0"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right slider */}
        <section className="slider__item">
          <div
            className="slider__img-droite"
            style={{backgroundImage: `url(${image1})`}}>
            <div className="text-light slider__text">
              <div className="shown text-center">
                <img
                  src="/images/yfc/logo/YFC_Logo_białe.png"
                  alt="YFC_Logo_białe"
                  className="logo" />
              </div>
              <div className="hidden">
                <h1>YoungFreshCinema</h1>
                <h5 className="pb-5 m-0">
                  produkcja filmowa, spoty reklamowe, teledyski, rental
                </h5>
                <div className="w-100 row m-0 text-center">
                  <a
                    href="http://youngfreshcinema.pl/"
                    className="btn btn-sm w-auto btn-light mx-auto fw-bold btn-slide-icon">
                    <span>Visit us</span>
                    <i className="icon-right-open black"></i>
                  </a>
                </div>
                <div className="d-lg-none w-100 row pt-5 m-0 text-center">
                  <button
                    onClick={()=>change_active_slide('left')}
                    className="btn mx-auto text-hover-light">
                    <i className="icon-left-open h2 m-0"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}