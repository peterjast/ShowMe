import React from 'react';
import Button from 'react-bootstrap/Button';

class AddComment extends React.Component {
  render(){
    return(
      <Button style={{float: 'left'}} className=" ml-5 mr-5 bg-success" onClick={() => this.props.handleAddComment(this.props.movieId)}>Comment</Button>
    )
  }
}

export default AddComment;