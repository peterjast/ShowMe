import React from 'react';
import axios from 'axios';
import Trending from './Trending.js';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Card';

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            displaySearchResults: false,
            searchResults: [],
            searchQuery: ''
        }
    }

    getSearchResults = async(e) => {
        try{
            const SERVER = process.env.REACT_APP_SERVER;

            const media = await axios.get(`${SERVER}/search`, { params: { searchQuery: this.state.searchQuery }});
            const searchResults = media.data;

            this.setState({
                displaySearchResults: true,
                displayTrending: false, 
                searchResults: searchResults
            });
        } catch(err) {
            console.log(err);
        } 
    }
    
    render(){
        return(
            <>
                <form className="w-50 p3 mx-auto mb-5" onSubmit={this.getSearchResults} >
                    <input className="w-75 p3" onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="city"/>
                    <button className="w-25 p3" type="submit">Search</button>
                </form>
                {!this.state.displaySearchResults ?
                <Trending /> 
                :
                this.state.searchResults.map((mediaObj, index) => (
                    mediaObj.poster_path &&
                    <Card key={mediaObj.id} className="mx-auto mb-5 overflow-auto" style={{ width: '20rem', height: '28rem'}} bg="dark" text="light">
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
                    </Card>
                ))}
            </>
        )
    }    
}
export default Dashboard;
