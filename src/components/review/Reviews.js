import { useEffect, useRef } from "react";
import ReviewForm from "../reviewForm/ReviewForm";
import api from "../../api/axiosConfig"
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import React from 'react'

const Reviews = ({ getMoviedata, movie, reviews, setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMoviedata(movieId)
    }, [])

    const addReview = async(e) => {
        e.preventDefault();

        try {
            const revT = revText;
            const rev = revText.current;
            const response = api.post("/api/v1/movies", {reviewBody: rev.value, imdbId: movieId});

            const updatedReviews = [...reviews, {body: rev.value}];
            rev.value = "";

            setReviews(updatedReviews);
        } catch(err) {
            console.error(err)
        }
        
    }
    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col><img src={movie?.poster} alt=""/></Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" defaultValue = ""/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r) => {
                            return(
                                <>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col><hr /></Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews