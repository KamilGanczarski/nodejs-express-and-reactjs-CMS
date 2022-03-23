import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

// Utils
import { componentModel } from '../../utils/interfaces';
import { baseUrl, axiosHeaders } from '../../utils/tokenAPI';

// Components
import HeroCarousel from './Hero/HeroCarousel';
import SkewedSlider from './SkewedSlider/SkewedSlider';
import GoogleMap from './Map/GoogleMap';
import Footer from './Footer/Footer';
import FooterLarge from './Footer/FooterLarge';

type Props = {
  pageName: string;
}

export default function CMS({ pageName }: Props) {
  const [ components, setComponents ] = useState<componentModel[]>([]);

  const fetchComponents = async () => {
    await axios.get(`${baseUrl}/api/v1/components`, {
        params: { page: pageName },
        headers: axiosHeaders.headers
      })
      .then((response) => {
        setComponents(response.data.components);
      })
      .catch(error => {
        if (error.response.data.msg) {
          console.log(error.response.data.msg);
        }
      });
  }

  useEffect(() => {
    pageName = `/${pageName}`
    fetchComponents();
  }, []);

  return (
    <article>
      {components.map(component => {
        return (
          <div key={component.id}>
            {{
              'hero-carousel': <HeroCarousel />,
              'hero-video': <div>{component.path}</div>,
              // 'skewed-slider': <SkewedSlider />,
              'custom-text': <div>{component.path}</div>,
              'carousel-3-2-1': <div>{component.path}</div>,
              'carousel-4-3-2-1': <div>{component.path}</div>,
              'carousel-awards': <div>{component.path}</div>,
              'gallery': <div>{component.path}</div>,
              'youtube-films': <div>{component.path}</div>,
              'youtube-films-counter': <div>{component.path}</div>,
              'navigation-around-website': <div>{component.path}</div>,
              'navigation-around-website-1': <div>{component.path}</div>,
              'chessboard': <div>{component.path}</div>,
              'collapsing-description': <div>{component.path}</div>,
              'portfolio-history-wedding': <div>{component.path}</div>,
              'intro-about-us': <div>{component.path}</div>,
              'intro-contact': <div>{component.path}</div>,
              // 'google-map': <GoogleMap />,
              // 'footer': <Footer />,
              // 'footer-large': <FooterLarge />,
            }[component.path]}
          </div>
        )
      })}
    </article>
  )
}
