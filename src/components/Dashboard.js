import React from 'react';
import axios from 'axios';
import Trending from './Trending.js';
import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Card';
import Carousel from './Carousel.js';
import './Carousel.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySearchResults: false,
            displayTrending: true,
            searchResults: [],
            searchQuery: '',
            smShow: false
        }
    }

    getSearchResults = async (e) => {
        e.preventDefault();
        try {
            const SERVER = process.env.REACT_APP_SERVER;

            const media = await axios.get(`${SERVER}/search`, { params: { searchQuery: this.state.searchQuery } });
            const searchResults = media.data.movieArray;

            this.setState({
                displaySearchResults: true,
                displayTrending: false,
                searchResults: searchResults
            });

            // console.log('searchResults:', searchResults);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <>
                <form className="w-50 p3 mx-auto mb-3 mt-3" onSubmit={this.getSearchResults} >
                    <input className="w-75 p3" onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="find movies or shows" />
                    <Button id="search-button" variant="success" size="sm" className="w-25 p3 mb-1 " type="submit">Search</Button>
                </form>
                {!this.state.displaySearchResults ?
                    <Trending
                        addMovie={this.props.addMovie}
                        email={this.props.properties.auth0.user.email}
                    />
                    :
                    <Carousel
                        style={{ maxWidth: 1800, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}
                        className="w-50 mx-auto">
                        {this.state.searchResults.length === 0 ?
                        <h2>Sorry... try searching for something else.</h2>
                        : 
                        this.state.searchResults.map((mediaObj, index) => (
                            mediaObj.poster_path &&
                            // <div key={i}>
                            <Card key={index} style={{ width: '18rem'}}>
                                <Card.Img variant="top" className="d-block w-100" alt={mediaObj.title} src={`https://www.themoviedb.org/t/p/original${mediaObj.poster_path}`} />
                                <Card.Body className = "cardBody">
                                    <Card.Title className = "cardTitle">{mediaObj.title}</Card.Title>
                                    <Card.Text className="cardRelease"> 
                                    {`Release Date: ${mediaObj.release_date}`}
                                    </Card.Text>
                                    <Card.Text className="cardRating">
                                    {`Rating: ${mediaObj.rating}`}
                                    </Card.Text>
                                    <Card.Text className="cardText">
                                     {`Overview: ${mediaObj.overview}`}
                                    </Card.Text>
                                    <Button variant="success" className = "cardButton" onClick={(e) => {this.props.addMovie(e, mediaObj.title, mediaObj.overview, mediaObj.poster_path, mediaObj.release_date, mediaObj.rating, this.props.properties.auth0.user.email); this.setState({ smShow:true })}}>
                                        Add To Watchlist
                                    </Button>
                                </Card.Body>
                                        <Modal
                                        className="modal"
                                        size="sm"
                                        show={this.state.smShow}
                                        onHide={() => this.setState({ smShow:false })}
                                        // aria-labelledby="example-modal-sizes-title-sm"
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="example-modal-sizes-title-sm">
                                                Success! Movie added to Watchlist
                                                </Modal.Title>
                                            </Modal.Header>
                                        </Modal>
                            </Card>

                        ))}
                    </Carousel>
                }
            </>
        )
    }
}
export default Dashboard;
