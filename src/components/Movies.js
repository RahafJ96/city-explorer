import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import {Row,Col} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'



class Movies extends React.Component {

    render() {
        return (
            <>

                {
                    this.props.showCard &&
                    this.props.movies.map(element => {
                        return (
                            <Row>
                                <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={element.poster_path} />
                                    <Card.Body>
                                        <Card.Title>{element.title}</Card.Title>
                                        <Card.Text>
                                           <h6>Average Votes ❤️:</h6> {element.vote_average}
                                           <h6>Conut Votes 😍:</h6>  {element.vote_count}
                                           <h6>Overview 📈 :</h6>{element.overview}
                                           <h6>Popularity:</h6> {element.popularity}
                                           <h6>Release Date 📅:</h6> {element.release_date}
                                        </Card.Text>

                                    </Card.Body>
                                </Card>
                                </Col>



                            </Row>
                        )
                    })
                }


            </>
        )
    }


}

export default Movies;