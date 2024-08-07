import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useEffect } from "react";
import { privateAxios } from "../../api/axiosConfig";

const Hero = () => {
  const [movies, setMovies] = useState();
  const navigate = useNavigate();

  const getMovies = async () => {
    try {
      const response = await privateAxios.get("/api/v1/movies");
      console.log(response.data);
      setMovies(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }
  return (
    <div className="movie-carousel-container">
      <Carousel>
        {
          // render this only if data is present in movies ie., movies is not null
          movies &&
            movies.map((movie) => {
              return (
                <Paper key={movie.imdbId}>
                  <div className="movie-card-container">
                    <div
                      className="movie-card"
                      style={{ "--img": `url(${movie.backdrops[0]})` }}
                    >
                      <div className="movie-details">
                        <div className="movie-poster">
                          <img src={movie.poster} alt="" />
                        </div>
                        <div className="movie-title">
                          <h4>{movie.title}</h4>
                        </div>
                        <div className="movie-buttons-container">
                          <Link
                            to={`/Trailer/${movie.trailerLink.substring(
                              movie.trailerLink.length - 11
                            )}`}
                          >
                            <div className="play-button-icon-container">
                              <FontAwesomeIcon
                                className="play-button-icon"
                                icon={faCirclePlay}
                              />
                            </div>
                          </Link>
                          <div className="movie-review-button-container">
                            <Button
                              variant="info"
                              onClick={() => reviews(movie.imdbId)}
                            >
                              Reviews
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              );
            })
        }
      </Carousel>
    </div>
  );
};

export default Hero;
