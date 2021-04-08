import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class CommentForm extends React.Component {
  
  render() {
    return (
      <Modal key={this.props.idx} show={this.props.handleShow} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form key={this.props.idx} onSubmit={() => this.props.updateComment(this.props.currentMovieId)}>
            <Form.Group controlId="title">
              <Form.Label>Comment</Form.Label>
              <Form.Control type="text" placeholder="Comment Here" onChange={(e)=>this.props.updateUserComment(e)}/>
            </Form.Group>

            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control as="select" type="number" placeholder="User Rating" onChange={(e)=>this.props.updateUserRating(e)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={this.props.handleClose} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default CommentForm;