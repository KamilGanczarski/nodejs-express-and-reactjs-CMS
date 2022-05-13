import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

// Utils
import {
  componentModel,
  componentContentModel
} from '../../../utils/interfaces';
import { baseUrl, axiosHeaders } from '../../../utils/tokenAPI';

// Components
import { scrollToEvent } from '../../Navbar/ScrollTo';
import TextSlide from './TextSlide';
import SocialMedia from './SocialMedia';
import EditHero from './Edit/EditHero';

type Props = {}

export default function HeroCarousel({}: Props) {
  const [component, setComponent] = useState<componentModel>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textSlides, setTextSlides] = useState<componentContentModel[][]>();

  const separateToArrayByParameter = (
    contentArr: componentContentModel[]
  ): componentContentModel[][] => {
    // Check if empty array
    if (contentArr.length === 0) {
      return [];
    }

    //  Add first element
    let contentArrRes: componentContentModel[][] = [[contentArr[0]]];
    // Add first parametr to compare
    let nameArr: string[] = [contentArr[0].name];

    for (let i = 1; i < contentArr.length; i++) {
      // Find index of aleady added element
      let nameIndex = nameArr.findIndex(name =>
        name === contentArr[i].name
      );

      // If already separate an element
      if (nameIndex >= 0) {
        contentArrRes[nameIndex].push(contentArr[i]);
      // If not found matching element
      } else {
        nameArr.push(contentArr[i].name)
        contentArrRes.push([]);
        nameIndex = contentArrRes.length - 1;
        contentArrRes[nameIndex].push(contentArr[i]);
      }
    }
    return contentArrRes;
  }

  const fetchHeroComponent = async () => {
    await axios.get(`${baseUrl}/api/v1/components`, {
        params: {
          page: '/index',
          componentName: 'hero-carousel'
        },
        headers: axiosHeaders.headers
      })
      .then(res => {
        // If no components
        if (!res.data.components || res.data.components.length === 0) {
          setTextSlides([]);
          return;
        }

        setComponent(res.data.components[0]);

        // If no content
        if (!res.data.components[0].content) {
          setTextSlides([]);
          return;
        }

        const contentArr = separateToArrayByParameter(
          res.data.components[0].content
        );
        setTextSlides(contentArr);
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
          {textSlides &&
            <TextSlide
              textSlides={textSlides}
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
        textSlides={textSlides}
        fetchHeroComponent={fetchHeroComponent} />
    </article>
  )
}
