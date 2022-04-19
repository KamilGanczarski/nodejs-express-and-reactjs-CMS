import React from 'react';

// Utils
import { componentContentModel } from '../../../../utils/interfaces';

// Components
import EditTextSlide from './EditTextSlide';

type Props = {
  textSlides: componentContentModel[][] | undefined;
  fetchHeroComponent: () => void;
}

export default function EditTextSlidess({
  textSlides,
  fetchHeroComponent
}: Props) {
  return (
    <section className="w-100 row pb-2 mx-0 mb-4">
      <h6 className="col-12 px-2 pt-3 pb-2 mx-auto">
        <span className="fw-bold">Additional information</span>
      </h6>
      {textSlides?.map((textArr, index) => {
        return (
          <EditTextSlide
            key={index}
            textSlide={textArr}
            fetchHeroComponent={fetchHeroComponent} />
        )
      })}
    </section>
  )
}
