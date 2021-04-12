import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Carousel from './Carousel.js';
import './Carousel.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
// import AddMovie from './AddMovie.js';
// import DetailsModal from './DetailsModal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingMovies: [],
      trendingShows: [],
      displayMovies: false,
      displayShows: false,
      displayDetails: false,
      currentMovie: {},
      smShow: false,
      setSmShow: false
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
        // console.log('movies:', movies);
        // console.log('moviesdata', movies.data);
      })
      .catch(err => { console.log(err.message) })

    // axios.get(`${SERVER}/shows`)
    //   .then(shows => {
    //     this.setState({
    //       trendingShows: shows.data.showArray,
    //       displayShows: true
    //     })
    //     console.log('shows:', shows);
    //     console.log('shows:', shows.data);
    //   })
    //   .catch(err => { console.log(err.message) })
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  displayDetails = (movie) => {
    this.setState({ show: true, currentMovie: movie });
  }

  // <AddMovie index={i} addMovie={this.addMovie}/> <Button inline index={i} onClick={this.displayDetails(movie)}>Details</Button>
  // <AddMovie index={i} addMovie={this.addMovie}/> <Button inline index={i} onClick={this.displayDetails(show)}>Details</Button>
  render() {
    // const window.innerWidth = window.innerWidth;
    //   const responsive = (window) => {
    //    console.log('inside trending', window);
    //     if (window > 1600){
    //       return 4;
    //     } else if (window < 1600 && window > 1024){
    //       return 3;
    //     } else if (window < 1024 && window > 464){
    //       return 2;
    //     } else if (window < 464) {
    //       return 1;
    //   };
    // }

    return (
      <>
        <Container>
          <h1 id="trending-header" className="mb-1">Trending Movies</h1>
          <Row>
            {this.state.displayMovies &&
              <Carousel
                style={{ maxWidth: 2000, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}
                // show={responsive}
                className="w-50 mx-auto">
                {this.state.trendingMovies.map((movie, i) => (
                  movie.poster_path &&
                  <div key={i}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top"
                        className="d-block w-100"
                        src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <Card.Body className = "cardBody">
                        <Card.Title className = "cardTitle">{movie.title}</Card.Title>
                        <Card.Text className="cardRelease">
                          {`Release Date: ${movie.release_date}`}
                        </Card.Text>
                        <Card.Text className="cardRating">
                          {`Rating: ${movie.rating}`}
                        </Card.Text>
                        <Button variant="success" className = "cardButton" onClick={(e) => {this.props.addMovie(e, movie.title, movie.overview, movie.poster_path, movie.release_date, movie.rating, this.props.email); this.setState({ smShow:true })}}>
                          Add To Watchlist
                      </Button>

                      </Card.Body>
                      <div>
                        <div className="modal">
                          <Modal
                            size="sm"
                            show={this.state.smShow}
                            onHide={() => this.setState({ smShow:false })}
                            aria-labelledby="example-modal-sizes-title-sm">
                            <Modal.Header closeButton>
                              <Modal.Title id="example-modal-sizes-title-sm">
                                Success! Movie added to Watchlist
                              </Modal.Title>
                            </Modal.Header>
                          </Modal>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </Carousel>
            }
          </Row>
          {/* <DetailsModal show={this.state.displayDetails} movie={this.state.currentMovie} /> */}
          {/* <Row>
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
                        <Card.Text className="cardText">
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
          </Row> */}
          {/* <DetailsModal show={this.state.displayDetails} movie={this.state.currentMovie} /> */}
        </Container>
      </>
    )
  }
}

export default Trending;
