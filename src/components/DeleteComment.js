import React from 'react';
import Button from 'react-bootstrap/Button';

class DeleteComment extends React.Component {
  render(){
    return(
      <Button 
        className="bg-danger text-light"
        onClick={()=>this.props.deleteComment(this.props.commentId)}>
        X
      </Button>
    )
  }
}

export default DeleteComment;