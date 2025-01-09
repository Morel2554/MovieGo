import React, { useEffect, useState } from "react";
import { getGenres, getMoviesByGenre, getTVSeriesByGenre } from "../api";
import Pagination from "../components/Pagination"; 

const GenresPage = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [contentType, setContentType] = useState("movies");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  const fetchResults = async (genreId, page) => {
    const data =
      contentType === "movies"
        ? await getMoviesByGenre(genreId, page)
        : await getTVSeriesByGenre(genreId, page);
    if (data && data.results) {
      setResults(data.results);
      setTotalPages(data.total_pages);
    }
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1); // Reset to the first page
    fetchResults(genreId, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (selectedGenre) {
      fetchResults(selectedGenre, page);
    }
  };

  return (
    <div className="GenresPage">
        <div className="ContentTypeToggle">
            <button
                className={contentType === "movies" ? "active" : ""}
                onClick={() => {
                setContentType("movies");
                setResults([]);
                setSelectedGenre(null);
                }}
                >
                Movies
            </button>
            <button
                className={contentType === "tvseries" ? "active" : ""}
                onClick={() => {
                setContentType("tvseries");
                setResults([]);
                setSelectedGenre(null);
                }}
                >
                TV Series
            </button>
        </div>

        <div className="GenresList">
        {genres.map((genre) => (
            <button
            key={genre.id}
            className={`GenreButton ${
                selectedGenre === genre.id ? "selected" : ""
            }`}
            onClick={() => handleGenreSelect(genre.id)}
            >
            {genre.name}
            </button>
        ))}
        </div>

        <div className="Results">
        {results.map((item, i) => (
            <div className="ResultItem" key={i}>
            <div className="ResultTitle">
                {item.title || item.name} {/* title for movies, name for TV series */}
            </div>
            <img
                className="ResultImage"
                src={`${process.env.REACT_APP_BASEIMGURL}/${item.poster_path}`}
                alt={item.title || item.name}
            />
            <div className="ResultDate">
                {item.release_date || item.first_air_date}
            </div>
            <div className="ResultRate">Rating: {item.vote_average}</div>
            </div>
        ))}
        </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default GenresPage;
