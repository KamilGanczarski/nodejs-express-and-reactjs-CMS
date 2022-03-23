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
                  className={`pb-2 text-move-${i+1} text-move-center prevent-user-select`}>
                  {text.content}
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}
