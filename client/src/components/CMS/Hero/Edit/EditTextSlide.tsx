import React, { useState } from 'react';
import { Collapse, Button } from 'react-bootstrap';

// Utils
import { componentContentModel } from '../../../../utils/interfaces';

// Component
import EditText from './EditText';

type Props = {
  textSlide: componentContentModel[] | undefined;
  fetchPages: () => void;
}

export default function EditTextSlide({ textSlide, fetchPages }: Props) {
  const [open, setOpen] = useState(false);

  if (!textSlide) {
    return (<></>);
  }

  return (
    <div className="col-12 col-lg-11 px-0 pb-3 mx-auto">
      <Button
        onClick={() => setOpen(!open)}
        aria-controls={`edit-text-slide-collapse-${textSlide[0].id}`}
        aria-expanded={open}
        className="w-100 ps-4 pe-0 d-flex align-items-center bg-transparent text-hover-theme rounded-0 border-0 border-bottom border-theme collapsed right-rotate">
        <span className="fw-bold">{textSlide[0].name}</span>
        <i className="icon-right-open text-h5 m-0 collapse-icon-rotate ms-auto me-3"></i>
      </Button>
      <Collapse in={open}>
        <div id={`edit-text-slide-collapse-${textSlide[0].id}`}>
          <div className="p-3 pt-4">
            {textSlide.map((textObj, index) => {
              return (
                <EditText
                  key={index}
                  textObj={textObj}
                  fetchPages={fetchPages} />
              )
            })}
          </div>
        </div>
      </Collapse>
    </div>
  )
}
