import React from 'react';
import Button from 'react-bootstrap/Button';

class Update extends React.Component {
  render(){
    return(
      <Button 
      key ={this.props.idx}
      style={{float: 'right'}} 
      className="float-right mr-5 bg-info" 
      onClick={()=>this.props.displayUpdateForm(this.props.movieId, this.props.idx)}
      >
      Edit
      </Button>
    )
  }
}

export default Update;