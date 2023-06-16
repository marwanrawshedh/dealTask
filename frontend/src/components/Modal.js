import Modal from "react-bootstrap/Modal";

function Example({ show, handleClose, children, header }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body> {children}</Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
