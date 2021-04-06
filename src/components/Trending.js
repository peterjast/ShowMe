import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import AddMovie from './AddMovie.js';
import DetailsModal from './DetailsModal';
import Button from 'react-bootstrap/Button';

class Trending extends React.Component {
    constructor(props){
        super(props);
        this.state={
            trendingMovies: [],
            trendingShows: [],
            displayMovies: false,
            displayShows: false,
            displayDetails: false,
            currentMovie: {}
        }
    }

    async componentDidMount() {
        try{
            const SERVER = process.env.REACT_APP_SERVER;

            const movies = await axios.get(`${SERVER}/movies`);
            const trendingMovies = movies.data;

            const shows = await axios.get(`${SERVER}/shows`);
            const trendingShows = shows.data;

            this.setState({
                trendingMovies,
                trendingShows,
                displayMovies: true,
                displayShows: true,
                displayDetails: false
            });
        } catch(err) {
            console.log(err);
        } 
    }

    handleClose = () => {
        this.setState( {show:false });
      }

    displayDetails = (movie) => {
        this.setState({ show: true, currentMovie: movie });
      }

    render() {
        return(
            <>
            <Container>
            <Row>
            {this.state.displayMovies &&     
            <Carousel className="w-50 mx-auto">
            {this.state.trendingMovies.map((movie, i) => (
              movie.poster_path &&  
              <Carousel.Item key={i}>
                <img
                    className="d-block w-100"
                    src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    />
                <Carousel.Caption>
                <h3>{movie.title}</h3>
                <p><AddMovie inline index={i} addMovie={this.props.addMovie}/> <Button inline index={i} onClick={this.displayDetails(movie)}>Details</Button></p>
                </Carousel.Caption>
              </Carousel.Item> 
            ))}
            </Carousel>
            }
            </Row>
            <DetailsModal show={this.state.displayDetails} movie={this.state.currentMovie} />
            <Row>
            {this.state.displayShows &&     
            <Carousel className="w-50 mx-auto">
            {this.state.trendingShows.map((show, i) => (
              show.poster_path &&  
              <Carousel.Item key={i}>
                <img
                    className="d-block w-100"
                    src={`https://www.themoviedb.org/t/p/original${show.poster_path}`}
                    alt={show.title}
                    />
                <Carousel.Caption>
                <h3>{show.title}</h3>
                <p><AddMovie inline index={i} addMovie={this.props.addMovie}/> <Button inline index={i} onClick={this.displayDetails(show)}>Details</Button></p>
                </Carousel.Caption>
              </Carousel.Item> 
            ))}
            </Carousel>
            }
            </Row>
            <DetailsModal show={this.state.displayDetails} movie={this.state.currentMovie} />
            </Container>
            </>
        )
    }
}

export default Trending;