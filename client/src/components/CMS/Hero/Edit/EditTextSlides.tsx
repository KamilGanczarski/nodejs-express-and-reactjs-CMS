import React, { useState } from 'react';
import { Collapse, Button } from 'react-bootstrap';

// Utils
import { componentContentModel } from '../../../../utils/interfaces';

// Components
import EditTextSlide from './EditTextSlide';

type Props = {
  textSlides: componentContentModel[][] | undefined;
  fetchPages: () => void;
}

export default function EditTextSlidess({ textSlides, fetchPages }: Props) {
  return (
    <section className="w-100 row pb-2 mx-0 mb-4">
      <h5 className="col-12 col-lg-11 px-0 pb-3 pb-lg-2 mx-auto">
        <span className="fw-bold">Additional information</span>
      </h5>
      {textSlides?.map((textArr, index) => {
        return (
          <EditTextSlide
            key={index}
            textSlide={textArr}
            fetchPages={fetchPages} />
        )
      })}
    </section>
  )
}
