import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

type Props = {
  title: string;
  btnIdName: string;
  size: 'sm' | 'lg' | 'xl';
  children: React.ReactNode;
}

export default function CustomModal({
  title,
  btnIdName,
  size,
  children
}: Props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size={size}>
        <Modal.Header className="bg-theme border-0">
          {/* Title */}
          <h4 className="modal-title py-5 text-center title-with-x-btn">
            {title}
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
        <Modal.Body className="px-5 pb-5 bg-theme">
          {children}
        </Modal.Body>
      </Modal>

      <button
        onClick={()=>handleShow()}
        className="d-none"
        id={`${btnIdName}-modal-btn`}>
      </button>
    </>
  )
}
