import React from 'react';
import axios from 'axios';
import Trending from './Trending.js';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Card';
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

            console.log('searchResults:', searchResults);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <>
                <form className="w-50 p3 mx-auto mb-3 mt-3" onSubmit={this.getSearchResults} >
                    <input className="w-75 p3" onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="find movies or shows" />
                    <button className="w-25 p3" type="submit">Search</button>
                </form>
                {!this.state.displaySearchResults ?
                    <Trending
                        addMovie={this.props.addMovie}
                        email={this.props.properties.auth0.user.email}
                    />
                    :
                    <Carousel
                        style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}
                        className="w-50 mx-auto">
                        {this.state.searchResults.map((mediaObj, index) => (
                            mediaObj.poster_path &&
                            // <div key={i}>
                            <Card key={index} className="mx-auto mb-5 overflow-auto" style={{ width: '20rem', height: '28rem' }} bg="dark" text="light">
                                <Card.Img variant="top" alt={mediaObj.title} src={`https://www.themoviedb.org/t/p/original${mediaObj.poster_path}`} />
                                <Card.Body>
                                    <Card.Title>{mediaObj.title}</Card.Title>
                                    <Card.Text>
                                        <Row>
                                            {`Release Date: ${mediaObj.release_date}`}
                                        </Row>
                                        <Row>
                                            {`Rating: ${mediaObj.rating}`}
                                        </Row>
                                        <Row>
                                            {`Overview: ${mediaObj.overview}`}
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                                    <Button onClick={(e) => {this.props.addMovie(e, mediaObj.title, mediaObj.overview, mediaObj.poster_path, mediaObj.release_date, mediaObj.rating, this.props.email); this.setState({ smShow:true })}}>
                                        Add To Watchlist
                                    </Button>
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
