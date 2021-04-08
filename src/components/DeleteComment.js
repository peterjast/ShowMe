import React from 'react';
import Button from 'react-bootstrap/Button';

class DeleteComment extends React.Component {
  render(){
    return(
      <Button 
        className="bg-info text-light"
        onClick={()=>this.props.deleteComment(this.props.movieId, this.props.comment, this.props.idx)}>
        x
      </Button>
    )
  }
}

export default DeleteComment;