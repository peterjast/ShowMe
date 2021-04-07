import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import AddComment from "./AddComment";
import CommentForm from "./CommentForm";
// import { useAuth0 } from "@auth0/auth0-react";

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            show: false
        }
    }

    componentDidMount = async() => {
        try{
            await this.props.getUser();
        } catch(err){
            console.log(err.message)
        }
      }

          

    handleAddComment = () => {
        this.setState({ show: true })
    }

    handleClose = () => {
        this.setState({ show: false })
    }
    
      render(){
        return (
            <>
            <div className="mx-auto">
            <div className="row align-items-center profile-header">
                <div className="col-md-2 mb-3">
                <img
                    src={this.props.properties.auth0.user.picture}
                    alt="Profile"
                    className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                />
                </div>
                <div className="col-md text-center text-md-left">
                <h2>{this.props.properties.auth0.user.name}</h2>
                <p className="lead text-dark">{this.props.properties.auth0.user.email}</p>
                </div>
            </div>
            </div>
            <hr></hr>
            <h1>My Watch List</h1>
            {!this.props.watchList.length > 0 ?
            <h3>Nothing to see here...</h3>
            :
            this.props.watchList.map((mediaObj) => (
                <Jumbotron key={mediaObj._id}>
                    <Row>
                        <h1>{mediaObj.title}</h1>
                        <Button>x</Button>
                    </Row>
                <Row>
                    <Col>
                        <Card key={mediaObj._id} className="mx-auto mb-5 float-left" bg="dark" text="light">
                            <Card.Img variant="top" alt={mediaObj.title} src={`https://www.themoviedb.org/t/p/original${mediaObj.poster_path}`} />
                        </Card>
                    </Col>
                    <Col>
                        <h3>{mediaObj.title}</h3>
                        <p>
                            {`Release Date: ${mediaObj.release_date}`}
                        </p>
                        <p>
                            {`Rating ${mediaObj.rating}`}
                        </p>
                        <p>
                            {`Overview: ${mediaObj.overview}`}
                        </p>
                    </Col>
                </Row>
                  {mediaObj.comments.map((commentObj)=> 
                    <Card key={commentObj._id}>
                    <Card.Header>
                    <div className="mx-auto">
                    <div className="row align-items-center">
                        <div className="col-md-2 mb-3">
                        <img
                            src={this.props.properties.auth0.user.picture}
                            alt="Profile"
                            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                        />
                        </div>
                        <div className="col-md text-center text-md-left">
                        <h2>{this.props.properties.auth0.user.name}</h2>
                        <p className="lead text-dark">{this.props.properties.auth0.user.email}</p>
                        </div>
                        <Button>x</Button>
                    </div>
                    </div>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{commentObj.user_rating}</Card.Title>
                      <Card.Text>
                          {commentObj.comment}
                      </Card.Text>
                      <Button variant="primary">Edit</Button>
                    </Card.Body>
                  </Card>
                  )}
                <AddComment show={this.handleAddComment}>Comment</AddComment>
                {this.state.show && 
                <CommentForm movieId={mediaObj._id} show={this.state.show} addComment={this.props.addComment} handleClose={this.handleClose} email={this.props.properties.auth0.user.email}/>
                }
                </Jumbotron>
                ))
                }
            </>
          );
      }
};

export default Profile;