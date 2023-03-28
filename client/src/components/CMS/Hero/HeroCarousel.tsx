import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

// Utils
import {
  componentModel,
  componentContentModel
} from '../../../interfaces/interfaces';
import { baseApiUrl, axiosHeaders } from '../../../utils/tokenAPI';

// Components
import { scrollToEvent } from '../../Navbar/ScrollTo';
import TextSlide from './TextSlide';
import SocialMedia from './SocialMedia';
import EditHero from './Edit/EditHero';

type Props = {}

export default function HeroCarousel({}: Props) {
  const [component, setComponent] = useState<componentModel>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchHeroComponent = async () => {
    await axios.get(`${baseApiUrl}/api/v1/components`, {
        params: {
          page: '/index',
          componentName: 'hero-carousel'
        },
        headers: axiosHeaders.headers
      })
      .then(res => {
        // If no components
        if (!res.data.components || res.data.components.length === 0) {
          return;
        }

        setComponent(res.data.components[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleSelect = (
    selectedIndex: number,
    e: Record<string, unknown> | null
  ) => {
    setCurrentSlide(selectedIndex);
  };

  useEffect(() => {
    fetchHeroComponent();
  }, []);

  if (!component) {
    return <div></div>
  }

  return (
    <article className="Hero-parallax">
      {!component.disabled &&
        <>
          <Carousel
            controls={false}
            indicators={true}
            fade={true}
            onSelect={handleSelect}
            id="Hero-carousel"
            className="container-500">
            {/* Slides */}
            {component.files.map((file, index) => {
              return (
                <Carousel.Item
                  interval={5000}
                  key={index}
                  className="hero-img h-100"
                  style={{ backgroundImage: `url('${file.path}sizemd/${file.filename}')` }}>
                  <div className="h-100 bg-linear-hero"></div>
                </Carousel.Item>
              )
            })}
          </Carousel>

          {/* Text with slider */}
          {component.files &&
            <TextSlide
              files={component.files}
              currentSlide={currentSlide} />
          }

          {/* Social media */}
          <SocialMedia />

          {/* Scroll down */}
          <button
            onClick={()=>scrollToEvent('.over-hero')}
            className="btn arrows-animation center">
            <span></span><span></span><span></span>
          </button>

          <section className="over-hero"></section>
        </>
      }

      {/* Edit hero carousel */}
      <EditHero
        component={component}
        files={component.files}
        fetchHeroComponent={fetchHeroComponent} />
    </article>
  )
}
