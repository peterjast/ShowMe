import React from 'react';
import Button from 'react-bootstrap/Button';

class DeleteComment extends React.Component {
  render(){
    return(
      <Button 
        className="bg-danger text-light"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
        }} 
        onClick={()=>this.props.deleteComment(this.props.commentId)}>
        X
      </Button>
    )
  }
}

export default DeleteComment;