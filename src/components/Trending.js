import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
// import AddMovie from './AddMovie.js';
// import DetailsModal from './DetailsModal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingMovies: [],
      trendingShows: [],
      displayMovies: false,
      displayShows: false,
      displayDetails: false,
      currentMovie: {}
    }
  }

  componentDidMount = () => {
    const SERVER = process.env.REACT_APP_SERVER;
    axios.get(`${SERVER}/movies`)
      .then(movies => {
        this.setState({
          trendingMovies: movies.data.movieArray,
          displayMovies: true
        })
        console.log('movies:', movies);
        console.log('moviesdata', movies.data);
      })
      .catch(err => { console.log(err.message) })

    axios.get(`${SERVER}/shows`)
      .then(shows => {
        this.setState({
          trendingShows: shows.data.showArray,
          displayShows: true
        })
        console.log('shows:', shows);
        console.log('shows:', shows.data);
      })
      .catch(err => { console.log(err.message) })
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  displayDetails = (movie) => {
    this.setState({ show: true, currentMovie: movie });
  }

  addMovie = () => {
    console.log('this is where I would add a movie');
  }

  // <AddMovie index={i} addMovie={this.addMovie}/> <Button inline index={i} onClick={this.displayDetails(movie)}>Details</Button>
  // <AddMovie index={i} addMovie={this.addMovie}/> <Button inline index={i} onClick={this.displayDetails(show)}>Details</Button>
  render() {
    return (
      <>
        <Container>
          <Row>
            {this.state.displayMovies &&
              <Carousel className="w-50 mx-auto">
                {this.state.trendingMovies.map((movie, i) => (
                  movie.poster_path &&
                  <Carousel.Item key={i}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top"
                        className="d-block w-100"
                        src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>
                          {movie.overview}
                        </Card.Text>
                        <Card.Link href="#"></Card.Link>
                        <Card.Link href="#"></Card.Link>
                      </Card.Body>
                    </Card>
                    <Carousel.Caption>
                      <Button onClick={(e) => this.props.addMovie(e, movie.title, movie.overview, movie.poster_path, movie.release_date, movie.rating, this.props.email)}>
                        Add To Watchlist
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            }
          </Row>
          {/* <DetailsModal show={this.state.displayDetails} movie={this.state.currentMovie} /> */}
          <Row>
            {this.state.displayShows &&
              <Carousel className="w-50 mx-auto">
                {this.state.trendingShows.map((show, i) => (
                  show.poster_path &&
                  <Carousel.Item key={i}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top"
                        className="d-block w-100"
                        src={`https://www.themoviedb.org/t/p/original/${show.poster_path}`}
                        alt={show.title}
                      />
                      <Card.Body>
                        <Card.Title>{show.title}</Card.Title>
                        <Card.Text>
                          {show.overview}
                        </Card.Text>
                        <Card.Link href="#"></Card.Link>
                        <Card.Link href="#"></Card.Link>
                      </Card.Body>
                    </Card>
                    <Carousel.Caption>
                      <Button onClick={(e) => this.props.addMovie(e, show.title, show.overview, show.poster_path, show.release_date, show.rating, this.props.email)}>
                        Add To Watchlist
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                  // <Carousel.Item key={i}>
                  //   <img
                  //     className="d-block w-100"
                  //     src={`https://www.themoviedb.org/t/p/original/${show.poster_path}`}
                  //     alt={show.title}
                  //   />
                  //   <Carousel.Caption>
                  //     <h3>{show.title}</h3>
                  //     <p>filler</p>
                  //   </Carousel.Caption>
                  // </Carousel.Item>
                ))}
              </Carousel>
            }
          </Row>
          {/* <DetailsModal show={this.state.displayDetails} movie={this.state.currentMovie} /> */}
        </Container>
      </>
    )
  }
}

export default Trending;