import React from 'react';
import Button from 'react-bootstrap/Button';
import '../assets/delete.css';

class Delete extends React.Component {
  render(){
    return(
      <Button 
        size="sm"
        className="bg-danger text-light"
        onClick={()=>this.props.deleteMovie(this.props.movieId)}>
        Remove From Watchlist
      </Button>
    )
  }
}

export default Delete;