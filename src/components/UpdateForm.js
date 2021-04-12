import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class UpdateForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
      comment: '',
      user_rating: 0
    }
  }

  updateUserComment = (e) => {
    this.setState({comment: e.target.value})
  }

  updateUserRating = (e) => {
    this.setState({user_rating: e.target.value})
  }
  
  render() {
    return (
      <Modal show={this.props.handleShow} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => this.props.updateComments(e, this.state.user_rating, this.state.comment, this.props.commentId, this.props.email)}>
            <Form.Group controlId="title">
              <Form.Label>Comment</Form.Label>
              <Form.Control type="text" placeholder={this.props.selectedComment} onChange={(e)=>this.updateUserComment(e)}/>
            </Form.Group>

            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control as="select" type="number" placeholder={this.props.currentRating} onChange={(e)=>this.updateUserRating(e)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
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

export default UpdateForm;