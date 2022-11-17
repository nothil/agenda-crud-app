import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Delete, closeEvent } from "../Helpers/Events";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { closeEvent } from "../Helpers/close";

const Modals = ({ open, handleClose, event, Delete, closeEvent, render }) => {
  const { title, describe, start, end, id } = event;
  const handleDelete = async () => {
    await Delete(event.id);
  };

  const Modalss = () => {
    return (
      <div>
        <Modal show={open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-capitalize">{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {describe ? (
              <p className="lead">{describe}</p>
            ) : (
              "No Dsecriptions Yet"
            )}
            <div className="row justify-content-between">
              <p className="col small text-muted text-center pb-0 mb-0">
                from: {start}
              </p>
              <p className="col small text-muted text-center pb-0 mb-0">
                to: {end}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Close
            </Button>
            <Link to={`/event/${id}/update`}>
              <Button variant="success">Update</Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  if (id) {
    return Modalss();
  } else {
    <p>there is no modal to preview</p>;
  }
};

// function mapStateToProps({ event }) {
//   return {
//     event,
//     //  modalStatus
//   };
// }

export { Delete, closeEvent, Modals };
