import React from 'react';

// Utils
import { componentContentModel } from '../../../../utils/interfaces';

// Components
import EditTextSlide from './EditTextSlide';

type Props = {
  pageName: string;
  textSlides: componentContentModel[][] | undefined;
  fetchHeroComponent: () => void;
}

export default function EditTextSlidess({
  pageName,
  textSlides,
  fetchHeroComponent
}: Props) {
  return (
    <section className="w-100 row pb-2 mx-0 mb-4">
      <h5 className="col-12 px-2 pt-3 pb-2 mx-auto">
        <span className="fw-bold">Additional information</span>
      </h5>
      {textSlides?.map((textArr, index) => {
        return (
          <EditTextSlide
            key={index}
            pageName={pageName}
            textSlide={textArr}
            fetchHeroComponent={fetchHeroComponent} />
        )
      })}
    </section>
  )
}
