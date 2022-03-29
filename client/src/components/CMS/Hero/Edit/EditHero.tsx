import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

// Utils
import {
  componentContentModel
} from '../../../../utils/interfaces';

// Components
import EditTextSlides from './EditTextSlides';

type Props = {
  textSlides: componentContentModel[][] | undefined;
  fetchPages: () => void;
}

export default function EditHero({ textSlides, fetchPages }: Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="xl"
        className="rounded">
        <Modal.Header className="bg-theme border-0">
          {/* Title */}
          <h4 className="modal-title py-5 text-center title-with-x-btn">
            Hero banner
          </h4>
          {/* Close window */}
          <button
            className="btn btn-sm p-2 bg-transparent text-hover-theme"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}>
            <i className="icon-cancel h4 m-0"></i>
          </button>
        </Modal.Header>
        <Modal.Body className="bg-theme">
          <EditTextSlides textSlides={textSlides} fetchPages={fetchPages} />
        </Modal.Body>
      </Modal>

      <button
        onClick={()=>handleShow()}
        className="d-none"
        id="hero-carousel-modal-btn">
      </button>
    </>
  )
}
