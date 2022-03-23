import React, { EventHandler, useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

// Utils
import {
  componentModel,
  componentContentModel
} from '../../../utils/interfaces';
import { baseUrl, axiosHeaders } from '../../../utils/tokenAPI';

// Components
import { scrollTo } from '../../Navbar/ScrollTo';
import TextSlide from './TextSlide';
import SocialMedia from './SocialMedia';

type Props = {}

export default function HeroCarousel({}: Props) {
  const [ component, setComponent ] = useState<componentModel>();
  const [ currentSlide, setCurrentSlide ] = useState(0);
  const [ textSlide, setTextSlide ] = useState<componentContentModel[][]>();

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
    let descriptionArr: string[] = [contentArr[0].description];
    
    for (let i = 1; i < contentArr.length; i++) {
      // Find index of aleady added element
      let descIndex = descriptionArr.findIndex(desc =>
        desc === contentArr[i].description
      );
      
      // If already separate an element
      if (descIndex >= 0) {
        contentArrRes[descIndex].push(contentArr[i]);
      // If not found matching element
      } else {
        descriptionArr.push(contentArr[i].description)
        contentArrRes.push([]);
        descIndex = contentArrRes.length - 1;
        contentArrRes[descIndex].push(contentArr[i]);
      }
    }
    return contentArrRes;
  }

  const fetchPages = async () => {
    await axios.get(`${baseUrl}/api/v1/components`, {
        params: {
          page: '/index',
          componentName: 'hero-carousel'
        },
        headers: axiosHeaders.headers
      })
      .then(res => {
        if (res.data.components.length > 0) {
          setComponent(res.data.components[0]);

          const contentArr = separateToArrayByParameter(
            res.data.components[0].content
          );

          setTextSlide(contentArr);
        }
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
    fetchPages();
  }, []);

  if (!component) {
    return <div></div>
  }

  return (
    <article className="Hero-parallax">
      <Carousel
        controls={false}
        indicators={true}
        fade={true}
        onSelect={handleSelect}
        id="Hero-carousel"
        className="container-500">
        {/* Slides */}
        {component.file_info.map((file, index) => {
          return (
            <Carousel.Item
              interval={5000}
              key={index}
              className="hero-img h-100"
              style={{ backgroundImage: `url('${file.path}')` }}>
              <div className="h-100 bg-linear-hero"></div>
            </Carousel.Item>
          )
        })}
      </Carousel>

      {/* Text with slider */}
      {textSlide &&
        <TextSlide
          textSlides={textSlide}
          currentSlide={currentSlide} />
      }

      {/* Social media */}
      <SocialMedia />

      <section className="over-hero"></section>
    </article>
  )
}
