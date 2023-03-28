import React from 'react';

// Utils
import { componentFileModel } from '../../../interfaces/interfaces';

type Props = {
  files: componentFileModel[];
  currentSlide: number;
}

export default function TextSlide({ files, currentSlide }: Props) {
  return (
    <>
      {files?.map((file, index) => {
        return (
          <div
            key={index}
            className={`text-middle header-slider prevent-user-select ${currentSlide === index ? 'active' : ''}`}>
            {file.file_content.map((text, i) => {
              return (
                <div
                  key={i}
                  className={`pb-2 ${text.text_size} text-size-center prevent-user-select`}>
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
