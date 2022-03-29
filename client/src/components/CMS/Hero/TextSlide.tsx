import React from 'react';

// Utils
import { componentContentModel } from '../../../utils/interfaces';

type Props = {
  textSlides: componentContentModel[][];
  currentSlide: number;
}

export default function TextSlide({ textSlides, currentSlide }: Props) {
  return (
    <>
      {textSlides?.map((textArr, index) => {
        return (
          <div
            key={index}
            className={`text-middle header-slider prevent-user-select ${currentSlide === index ? 'active' : ''}`}>
            {textArr.map((text, i) => {
              return (
                <div
                  key={i}
                  className={`pb-2 ${text.description} text-size-center prevent-user-select`}>
                  <span>{text.content}</span>
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}
