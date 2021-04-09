import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap/Col";
import AddComment from "./AddComment";
import CommentForm from "./CommentForm";
import { withAuth0 } from '@auth0/auth0-react';
import Delete from './Delete';
import axios from 'axios';
import DeleteComment from './DeleteComment';
import Update from './Update';
import UpdateForm from './UpdateForm';

class Profile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            show: false,
            showUpdate: false,
            comment: '',
            user_rating: 0,
            movieId: '',
            idx: 0,
            comments: [],
            commentId: ''
        }
    }

    componentDidMount = async () => {
        try {
            await this.props.getUser();
            this.setState({comments: this.props.comments})
            console.log(this.state.comments, this.props.comments)
        } catch (err) {
            console.log(err.message)
        }
    }

    updateUserComment = (e) => {
        e.preventDefault();
        try{
        this.setState({ comment: e.target.value })
        } catch(err){
            console.log(err.message);
        }
    }

    updateUserRating = (e) => {
        e.preventDefault();
        try{
        this.setState({ user_rating: e.target.value })
        } catch(err){
            console.log(err.message)
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    deleteMovie = async (movieId) => {
        try {
            console.log('movie id', movieId);
            const newWatchList = this.props.watchList.filter(movie => movie._id !== movieId);
            console.log('new watch list', newWatchList)
            // this.props.handleWatchList(newWatchList);
            const server = process.env.REACT_APP_SERVER;
            const newMovies = await axios.delete(`${server}/watchlist/movie/${movieId}`, { params: { email: this.props.properties.auth0.user.email } });
            console.log('NEW', newMovies);
            this.props.handleWatchList(newWatchList);
            // const newMoviesArr = newMovies.data;
            // this.props.handleWatchList(newMoviesArr);
            this.props.getUser();
        } catch (err) {
            console.log(err.message);
        }
    }

    deleteComment = async(commentId) => {
        try {

            // eslint-disable-next-line no-undef
            const newCommentsArr = this.props.comments.filter(comment => comment._id !== commentId);
            const server = process.env.REACT_APP_SERVER;
            const newComments = await axios.delete(`${server}/watchlist/comment/${commentId}`, { params: { email: this.props.properties.auth0.user.email } });
            console.log('NEW COMMENTS', newComments);
            this.props.handleComments(newCommentsArr);
            this.props.getUser();
        } catch (err) {
            console.log(err.message);
        }
    };

    //   handleSubmit = async(e) => {
    //       e.preventDefault();
    //       try{
    //         await this.props.updateComment(this.state.comment, this.state.user_rating, this.state.currentMovieId, this.state.currentCommentId, this.props.properties.auth0.user.email);
    //       } catch(err){
    //           console.log(err.message)
    //       }
    //   }

    // updateCommentId = (id) => {
    //     this.setState({ currentCommentId: id});
    // }

    updateMovieId = (movieId) => {
        this.setState({ movieId });
    }

    handleUpdateComment = () => {
        this.setState({ showUpdate: true })
    }

    handleCloseUpdateForm = () => {
        this.setState({ showUpdate: false })
    }

    handleAddComment = () => {
        this.setState({ show: true })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    updateComments = async (commentId) => {
        console.log("inside update")
        try {
            // const commArr = this.props.comments;
            // const index = commArr.indexOf((this.props.comments.filter(comment => comment._id === commentId))[0]);
            // const comm = {user_rating: this.props.user_rating, comment: this.props.comment};
            // commArr.splice(index, 1, comm);

            // this.props.watchList[this.props.movieIndex].comments.splice([this.state.idx], 1);
            const server = process.env.REACT_APP_SERVER;
            await axios.put(`${server}/comment/${commentId}`, {comment: this.state.comment, rating: this.state.user_rating, email: this.props.properties.auth0.user.email});
            // const newCommentArr = newComments.data;
            // console.log(newCommentArr);
            // this.props.handleComments(newCommentArr);
            await this.props.getUser();
        } catch (err) {
            console.log(err.message);
        }
    }

    displayUpdateForm = (commentId) => {
        this.setState({ commentId, showUpdate: true })
    };


    render() {
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
                {this.props.watchList === undefined ?
                    <h3>Nothing to see here...</h3>
                    :
                    this.props.watchList.map((mediaObj, idx) => (
                        <Jumbotron key={mediaObj._id} index={idx}>
                            <Row>
                                <h1>{mediaObj.title}</h1>
                                <Delete deleteMovie={this.deleteMovie} movieId={mediaObj._id}>x</Delete>
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
                                <AddComment
                                    key={idx}
                                    idx={idx}
                                    show={this.handleAddComment}>
                                    Comment
                                </AddComment>
                                {this.state.show &&
                                    <CommentForm
                                        movieId={idx}
                                        idx={idx}
                                        show={this.state.show}
                                        addComment={this.props.addComment}
                                        updateUserComment={this.props.updateUserComment}
                                        updateUserRating={this.props.updateUserRating}
                                        handleClose={this.handleClose}
                                        email={this.props.properties.auth0.user.email} />
                                }
                            </Row>
                            </Jumbotron>
                            ))}
                            <Jumbotron>
                                <Row>
                                    {this.props.comments === undefined ?
                                        "Leave your first comment!"
                                        :
                                        this.props.comments.map((commentObj, idx) => (
                                            <Card key={commentObj._id} index={idx}>
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
                                                            <DeleteComment deleteComment={this.deleteComment} commentId={commentObj._id}>x</DeleteComment>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Title>{commentObj.user_rating}</Card.Title>
                                                    <Card.Text>
                                                        {commentObj.comment}
                                                    </Card.Text>
                                                    <Update
                                                        key={commentObj._id}
                                                        comment={commentObj}
                                                        idx={idx}
                                                        movieId={this.state.movieId}
                                                        displayUpdateForm={this.displayUpdateForm}
                                                    />
                                                    {this.state.showUpdate &&
                                                        <UpdateForm
                                                            key={commentObj._id}
                                                            updateComment={this.updateComment}
                                                            handleShow={this.state.showUpdate}
                                                            handleClose={this.handleCloseUpdateForm}
                                                            updateUserComment={this.updateUserComment}
                                                            updateUserRating={this.updateUserRating}
                                                        />
                                                    }


                                                    </Card.Body>
                                            </Card>
                                        ))}
                                </Row>
                            </Jumbotron>
           </>
        )
    }
}

export default withAuth0(Profile);
