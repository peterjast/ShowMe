import React from 'react';
import Button from 'react-bootstrap/Button';

class AddComment extends React.Component {
  render(){
    return(
      <Button key={this.props.idx} style={{float: 'left'}} className="float-left ml-5 bg-info" onClick={this.props.show}>Comment</Button>
    )
  }
}

export default AddComment;