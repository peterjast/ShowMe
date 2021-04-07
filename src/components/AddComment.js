import React from 'react';
import Button from 'react-bootstrap/Button';

class AddBook extends React.Component {
  render(){
    return(
      <Button style={{float: 'right'}} className="float-right mr-5 bg-info" onClick={this.props.show}>Comment</Button>
    )
  }
}

export default AddBook;