import React from 'react';
import Button from 'react-bootstrap/Button';

class Delete extends React.Component {
  render(){
    return(
      <Button 
        className="bg-info text-light"
        style={{
          position: 'absolute',
          left: -20,
          top: -20,
        }} 
        onClick={() => this.props.deleteBook(this.props.index)}>
        X
      </Button>
    )
  }
}

export default Delete;