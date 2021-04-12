import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
// import Footer from './Footer';
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
  constructor(props) {
    super(props);
    this.state = {
      watchList: [],
      comments: [],
    }
  }

  handleWatchList  = (movies) => {
      this.setState({watchList: movies})
  }; 

  handleComments  = (comments) => {
    this.setState({comments: comments});
}; 

  // addUser = () => {
  //   const SERVER = process.env.REACT_APP_SERVER;
  //   axios.post(`${SERVER}/watchlist`, { email: this.props.auth0.user.email })
  //     .then(result => {
  //       this.setState({ email: result.data.email });
  //     })
  //     .catch(error => { console.log(error.message) })
  // }

  getUser = () => {
    const SERVER = process.env.REACT_APP_SERVER;
    axios.get(`${SERVER}/watchlist`, { params: { email: this.props.auth0.user.email } })
      .then(result => {
        this.setState({ watchList: result.data.watchList, comments: result.data.comments });
        // console.log('watchList', result.data);
        // console.log(this.state);
      })
      .catch(error => { 
        console.log(error.message) 
      })
  }

    addComment = async(e, rating, comment, movieId, email) => {
        e.preventDefault();
        try {
          const server = process.env.REACT_APP_SERVER;
          const results = await axios.post(`${server}/add-comment`, {rating, comment, movieId, email});
          this.setState({ comments: results.data.comments });
        } catch (err) {
          console.log(err.message);
        }
    }

  addMovie = async (e, title, overview, poster_path, release_date, rating, email) => {
    e.preventDefault();
    // console.log(this.props.auth0.user.email);
    // console.log(title, overview, poster_path, release_date, rating, email);
    try {
      const server = process.env.REACT_APP_SERVER;
      const watchList = await axios.post(`${server}/add-movie`, { title: title, overview: overview, poster_path: poster_path, release_date: release_date, rating: rating, email: email });
      // console.log('inside add a movie', watchList);
      this.setState({ watchList: watchList.data });
    } catch (err) {
      console.log(err.message);
    };
  };

//   updateComment = async(e, comment, user_rating, movieId, id, email) => {
//       e.preventdefault();
//     try {
//       const server = process.env.REACT_APP_SERVER;
//       console.log(comment, user_rating, movieId, id)
//       const newMovies = await axios.put(`${server}/watchlist/${movieId}/${id}`, {email, comment, user_rating});
//       const newMovieArr = newMovies.data;
//       console.log(newMovieArr);
//     this.props.getUser();
//     } catch (err) {
//       console.log(err.message);
//     }
//     }

  render(){
    // console.log('app', this.props)
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
                  handleComments={this.handleComments}
                  handleWatchList= {this.handleWatchList}
                  comments={this.state.comments} 
                  properties={this.props} 
                  watchList={this.state.watchList}
                  deleteMovie={this.deleteMovie}
                  addComment={this.addComment}
                  deleteComment={this.deleteComment}
                  getUser={this.getUser}
                  /> 
                  : 
                  <Login /> 
                  }
                </Route>
              </Switch>
            </Container>
          </IsLoadingAndError>
        </Router>
    )
  };

}

export default withAuth0(App);