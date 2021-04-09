import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class CommentForm extends React.Component {
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

  // reload = () => window.location.reload();
  // onExit={this.reload}
  // render() {
  //   return (
  //     <Modal show={this.props.show} onHide={this.props.handleClose} onExit={reload}>

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => this.props.addComment(e, this.state.user_rating, this.state.comment, this.props.movieId, this.props.email)}>
            <Form.Group controlId="title">
              <Form.Label>Comment</Form.Label>
              <Form.Control type="text" placeholder="Comment Here" onChange={(e)=>this.updateUserComment(e)}/>
            </Form.Group>

            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control as="select" type="number" placeholder="User Rating" onChange={(e) => this.updateUserRating(e)}>
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