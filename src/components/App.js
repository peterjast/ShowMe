import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import Login from './Login';
import Profile from './Profile';
import '../assets/App.css';
import Container from 'react-bootstrap/Container';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            watchList:[]
        }
    }

    getUser = () => {
        const SERVER = process.env.REACT_APP_SERVER;
        axios.get(`${SERVER}/watchlist`, { params: {email: this.props.auth0.user.email}})
            .then(watchList => {
                this.setState({ watchList: watchList.data });
                console.log('watchList', watchList.data);   
            })
            .catch(error => {console.log(error.message)})
    }

    addComment = async(e, rating, comment, movieId) => {
        e.preventDefault();
        try {
          const server = process.env.REACT_APP_SERVER;
          const watchList = await axios.post(`${server}/watchlist`, {rating, comment, movieId, email: this.props.auth0.user.email});
          this.setState({ watchList: watchList.data });
        } catch (err) {
          console.log(err.message);
        }
    }

//     app.post('/watchlist', Data.addComment);
// app.put('/watchlist/:movieId/:id', Data.updateComment);
// app.delete('/watchlist/movie/:movieId', Data.deleteMovie);
// app.delete('/watchlist/:movieId/:id', Data.deleteComment);

    deleteComment = async(movieId, id) => {
        try{
            const server = process.env.REACT_APP_SERVER;
            const newMovies = await axios.delete(`${server}/watchlist/${movieId}/${id}`, {params: {email: this.props.auth0.user.email}});
            console.log(newMovies);
            const newMovieArr = newMovies.data;
            console.log(newMovieArr);
            this.setState({ watchList: newMovieArr });
        } catch(err){
            console.log(err.message);
        }
    };

    updateComment = async(e, comment, user_rating, movieId, id, email) => {
        e.preventDefault();
        try{
            const server = process.env.REACT_APP_SERVER;
            const newMovies = await axios.put(`${server}/watchlist/${movieId}/${id}`, {comment, user_rating, email})
            const newMovieArr = newMovies.data;
            console.log(newMovieArr);
            this.setState({ watchList: newMovieArr });
        } catch(err){
            console.log(err.message);
        }
    }  

    addMovie = async (e, title, overview, poster_path, release_date, rating) => {
        e.preventDefault();
        try {
          const server = process.env.REACT_APP_SERVER;
          const watchList = await axios.post(`${server}/watchlist/movie`, {title, overview, poster_path, release_date, rating, email: this.props.auth0.user.email});
          this.setState({ watchList: watchList.data });
        } catch (err) {
          console.log(err.message);
        }
    }
    
    deleteMovie = async(movieId) => {
        try{
            const server = process.env.REACT_APP_SERVER;
            const newMovies = await axios.delete(`${server}/watchlist/movie/${movieId}`, {params: {email: this.props.auth0.user.email}});
            console.log(newMovies);
            const newMovieArr = this.state.watchList.filter((movie) => movie._id !== movieId);
            console.log(newMovieArr);
            this.setState({ watchList: newMovieArr });
        } catch(err){
            console.log(err.message);
        }
    }


  render() {
    console.log('app', this.props)
    return(
        <Router>
          <IsLoadingAndError>
            <Header />
            <Container>
              <Switch>
                <Route exact path="/">
                  { this.props.auth0.isAuthenticated ? 
                  <Dashboard 
                  properties={this.props} 
                  addMovie={this.addMovie} 
                  watchList={this.state.watchList}/> 
                  :
                  <Login /> 
                  }
                </Route>
                <Route exact path="/profile">
                  { this.props.auth0.isAuthenticated ? 
                  <Profile 
                  properties={this.props} 
                  watchList={this.state.watchList}
                  deleteMovie={this.deleteMovie}
                  addComment={this.addComment}
                  deleteComment={this.deleteComment}
                  updateComment={this.updateComment}
                  getUser={this.getUser}
                  /> 
                  : 
                  <Login /> 
                  }
                </Route>
              </Switch>
            </Container>
            <Footer />
          </IsLoadingAndError>
        </Router>
    )
  }

}

export default withAuth0(App);