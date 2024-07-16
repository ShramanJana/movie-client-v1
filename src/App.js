import "./App.css";
import { useState } from "react";
import { Layout } from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/review/Reviews";
import NotFound from "./components/notfound/NotFound";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { privateAxios } from "./api/axiosConfig";

function App() {

  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovieData = async (movieId) => {
    try {
      const response = await privateAxios.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;

      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Header />
      <ToastContainer position = "bottom-center"/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}>
            {" "}
          </Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}>
            {" "}
          </Route>
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMoviedata={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
