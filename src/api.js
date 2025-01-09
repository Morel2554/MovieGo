import axios from "axios"

const apiKey = process.env.REACT_APP_APIKEY
const baseUrl = process.env.REACT_APP_BASEURL

export const getMovieList = async (page = 1) => {
  const movie = await axios.get(
    `${baseUrl}/movie/popular?page=1&api_key=${apiKey}`
  )
  return movie.data.results
}


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
