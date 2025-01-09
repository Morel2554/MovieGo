import React, { useEffect, useState } from "react";
import { getTVSeriesList, searchTVSeries, getTVSeriesDetails } from "../api";
import Pagination from "../components/Pagination";

const TVSeriesPage = ({ searchQuery }) => {
  const [tvSeries, setTVSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (searchQuery.length > 3) {
      fetchSearchedTVSeries(searchQuery);
    } else {
      fetchTVSeries(currentPage);
    }
  }, [searchQuery, currentPage]);

  const fetchTVSeries = async (page) => {
    const data = await getTVSeriesList(page);
    if (data && data.results) {
      setTVSeries(data.results);
      setTotalPages(data.total_pages);
    }
  };

  const fetchSearchedTVSeries = async (query) => {
    const data = await searchTVSeries(query);
    if (data && data.results) {
      setTVSeries(data.results);
      setTotalPages(1); // Only show one page of results for search
    }
  };

  const handleWatchNow = async (seriesId) => {
    const details = await getTVSeriesDetails(seriesId);
    if (details.homepage) {
      window.open(details.homepage, "_blank");
    } else {
      alert("No streaming platform available for this series.");
    }
  };

  return (
    <div className="Page-container">
      <h1 className="Page-title">
        {searchQuery.length > 3 ? `Results for "${searchQuery}"` : "Popular TV Series"}
      </h1>
      <div className="Grid-container">
        {tvSeries.map((series) => (
          <div className="Card" key={series.id}>
            <img
              className="Card-image"
              src={`${process.env.REACT_APP_BASEIMGURL}/${series.poster_path}`}
              alt={series.name}
            />
            <div className="Card-details">
              <h2 className="Card-title">{series.name}</h2>
              <p className="Card-date">First Air Date: {series.first_air_date}</p>
              <p className="Card-rating">Rating: {series.vote_average}</p>
              <button className="Card-button" onClick={() => handleWatchNow(series.id)}>
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

export default TVSeriesPage;
