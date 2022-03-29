import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

type Props = {}

export default function EditHero({}: Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="xl">
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
