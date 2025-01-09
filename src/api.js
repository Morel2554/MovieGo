import axios from "axios"

const apiKey = process.env.REACT_APP_APIKEY
const baseUrl = process.env.REACT_APP_BASEURL

// Movies

export const getMovieList = async (page = 1) => {
  const movie = await axios.get(
    `${baseUrl}/movie/popular?page=${page}&api_key=${apiKey}`
  );
  return movie.data;
};


export const searchMovie = async (q) => {
  const search = await axios.get(
    `${baseUrl}/search/movie?query=${q}&page=1&api_key=${apiKey}`
  )
  return search.data
}

export const getMovieDetails = async (movieId) => {
  const details = await axios.get(
    `${baseUrl}/movie/${movieId}?api_key=${apiKey}`
  )
  return details.data
}

// Movies end

// TVSeries

export const getTVSeriesList = async (page = 1) => {
  const series = await axios.get(
    `${baseUrl}/tv/popular?page=${page}&api_key=${apiKey}`
  );
  return series.data;
};

export const searchTVSeries = async (q) => {
  const search = await axios.get(
    `${baseUrl}/search/tv?query=${q}&page=1&api_key=${apiKey}`
  );
  return search.data;
};

export const getTVSeriesDetails = async (seriesId) => {
  const details = await axios.get(
    `${baseUrl}/tv/${seriesId}?api_key=${apiKey}`
  );
  return details.data;
};

// TVSeries end

// Genre

export const getGenres = async () => {
  const genres = await axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
  return genres.data.genres;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await axios.get(
    `${baseUrl}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${apiKey}`
  );
  return response.data;
};

export const getTVSeriesByGenre = async (genreId, page = 1) => {
  const response = await axios.get(
    `${baseUrl}/discover/tv?with_genres=${genreId}&page=${page}&api_key=${apiKey}`
  );
  return response.data;
};

// Genre end