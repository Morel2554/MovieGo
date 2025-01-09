import "./App.css"
import { getMovieList, searchMovie, getMovieDetails } from "./api"
import { useEffect, useState } from "react"

const App = () => {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      const handleWatchNow = async () => {
        const details = await getMovieDetails(movie.id);
        if (details.homepage) {
          window.open(details.homepage, "_blank"); // Opens the movie's homepage in a new tab
        } else {
          alert("No streaming platform available for this movie.");
        }
      };

      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="Movie-date">release: {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
          <button className="Watch-button" onClick={handleWatchNow}>
            Watch Now
          </button>
        </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  }

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
  };

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <h1 className="Title-button">PPL MOVIE</h1>
        <button className="theme-toggle-button" onClick={toggleTheme}>
          Switch to {theme === "dark" ? "🌞 Light Mode " : "🌙 Dark Mode"} 
        </button> <br></br>
        <input
          placeholder="Search Movies..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  )

  
}

export default App
