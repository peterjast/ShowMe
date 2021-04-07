import React from 'react';
import Button from 'react-bootstrap/Button';

class AddBook extends React.Component {
  render(){
    return(
      <Button style={{float: 'right'}} className="float-right mr-5 bg-info" onClick={(e)=>{
          this.props.showUpdateForm();
          this.props.updateCommentId(this.props.id);
          this.props.updateMovieId(this.props.movieId)
          }
        }
      >
      Edit
      </Button>
    )
  }
}

export default AddBook;