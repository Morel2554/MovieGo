import React, { useEffect, useState } from "react";
import { getMovieList, searchMovie, getMovieDetails } from "../api";
import Pagination from "../components/Pagination";

const MoviesPage = ({ searchQuery }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (searchQuery.length > 3) {
      fetchSearchedMovies(searchQuery);
    } else {
      fetchMovies(currentPage);
    }
  }, [searchQuery, currentPage]);

  const fetchMovies = async (page) => {
    const data = await getMovieList(page);
    setPopularMovies(data.results);
    setTotalPages(data.total_pages);
  };

  const fetchSearchedMovies = async (query) => {
    const data = await searchMovie(query);
    setPopularMovies(data.results);
    setTotalPages(1); // Only show one page of results for search
  };

  const handleWatchNow = async (movieId) => {
    const details = await getMovieDetails(movieId);
    if (details.homepage) {
      window.open(details.homepage, "_blank");
    } else {
      alert("No streaming platform available for this movie.");
    }
  };

  return (
    <div className="Page-container">
      <h1 className="Page-title">
        {searchQuery.length > 3 ? `Results for "${searchQuery}"` : "Popular Movies"}
      </h1>
      <div className="Grid-container">
        {popularMovies.map((movie) => (
          <div className="Card" key={movie.id}>
            <img
              className="Card-image"
              src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="Card-details">
              <h2 className="Card-title">{movie.title}</h2>
              <p className="Card-date">Release Date: {movie.release_date}</p>
              <p className="Card-rating">Rating: {movie.vote_average}</p>
              <button className="Card-button" onClick={() => handleWatchNow(movie.id)}>
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {searchQuery.length <= 3 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MoviesPage;
