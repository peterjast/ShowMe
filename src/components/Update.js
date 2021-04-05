import React from 'react';
import Button from 'react-bootstrap/Button';

class Update extends React.Component {
  render(){
    return(
      <Button 
        className="bg-info text-light"
        style={{
          position: 'absolute',
          right: -25,
          top: -20,
        }} 
        onClick={() => this.props.displayUpdateForm(this.props.index)}>
        Update
      </Button>
    )
  }
}

export default Update;