import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class UpdateForm extends React.Component {
  render() {
    return (
        <Form onSubmit={(e) => this.props.updateABook(e)}>
        <Form.Group controlId="updateTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder={this.props.selectedBook.name} onChange={(e) => this.props.updateBookName(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="updateDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder={this.props.selectedBook.description} onChange={(e) => this.props.updateBookDescription(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="updateStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" placeholder={this.props.selectedBook.status} onChange={(e) => this.props.updateBookStatus(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    )
  }
}

export default UpdateForm;