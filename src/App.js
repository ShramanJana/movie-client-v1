import logo from './logo.svg';
import './App.css';
import api from "./api/axiosConfig";
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'
import { Layout } from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/review/Reviews';
import NotFound from './components/notfound/NotFound';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();
  const getMovies = async () => {

    try {
      const response = await api.get("/api/v1/movies");
      console.log(response.data);
      setMovies(response.data);


    } catch (err) {
      console.error(err);
    }
  }

  const getMovieData = async (movieId) => {
    try{
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;

      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMovies();
  }, [])


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />}> </Route>
          <Route path='/Trailer/:ytTrailerId' element={<Trailer />}> </Route>
          <Route path="/Reviews/:movieId" element={<Reviews getMoviedata={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
