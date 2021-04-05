import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class DetailsModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">{this.props.movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{this.props.movie.rating}</p>
            <p>{this.props.movie.release_date}</p>
            <p>{this.props.movie.overview}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.handleClose} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DetailsModal;