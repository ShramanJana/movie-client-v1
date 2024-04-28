import "./Hero.css"
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

const Hero = ({movies}) => {
  return (
    <div className="movie-carousel-container">
        <Carousel>
            {
                // render this only if data is present in movies ie., movies is not null 
                movies && movies.map((movie) => {
                    return(
                        <Paper>
                            <div className="movie-card-container">
                                <div className="movie-card">
                                    <div className="movie-details">
                                        <div className="movie-poster">
                                            <img src={movie.poster} alt="" />
                                        </div>
                                        <div className="movie-title">
                                            <h4>{movie.title}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    )
                })
            }
        </Carousel>
    </div>
  )
}

export default Hero
