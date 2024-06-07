import { useState } from 'react';
import { Movie } from '../../components/Movie/Movie';
import logo from './logo.svg';
import './Home.css';
import { useFetchMovies } from './useFetchMovies';

function Home() {
  const [movieName, setMovieName] = useState('');
  const { movies, fetchMovies } = useFetchMovies();
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState('Genre');
  const [sortBy, setSortBy] = useState('popularity.desc');

  return (
    <div class="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>Films les plus populaires</div>
        <br />
        <div class="input-container">
          <input
            class="styled-input"
            placeholder="Nom du film"
            value={movieName}
            onChange={(event) => {
              setMovieName(event.target.value);
              fetchMovies(event.target.value, page, sortBy, genre);
            }}
          ></input>
        </div>
        <br></br>
        <select
          class="custom-select"
          name="order"
          onChange={(e) => {
            fetchMovies(movieName, page, e.target.value, genre);
            setSortBy(e.target.value);
          }}
        >
          <option value="popularity.desc">Popularité</option>
          <option value="title.asc">Ordre alphabétique</option>
          <option value="primary_release_date.desc">Récent</option>
          <option value="primary_release_date.asc">Ancien</option>
          <option value="vote_average.desc">Note</option>
        </select>
        <br></br>
        <select
          class="custom-select"
          name="genre"
          onChange={(e) => {
            fetchMovies(movieName, page, sortBy, e.target.value);
            setGenre(e.target.value);
          }}
        >
          <option value="Genre">Genre</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Documentary">Documentary</option>
          <option value="Drama">Drama</option>
          <option value="Family">Family</option>
          <option value="Fantasy">Fantasy</option>
          <option value="History">History</option>
          <option value="Horror">Horror</option>
          <option value="Music">Music</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Science fiction">Science fiction</option>
          <option value="TV Movie">TV Movie</option>
          <option value="Thriller">Thriller</option>
          <option value="War">War</option>
          <option value="Western">Western</option>
        </select>
        <br></br>
        <br></br>
        <div class="navigation-buttons">
          <button
            class="nav-button previous"
            onClick={() => {
              if (page > 1) {
                fetchMovies(movieName, page - 1, sortBy, genre);
                setPage(page - 1);
              }
            }}
          >
            {' '}
            Page précédente{' '}
          </button>
          Page {page}
          <button
            class="nav-button next"
            onClick={() => {
              fetchMovies(movieName, page + 1, sortBy, genre);
              setPage(page + 1);
            }}
          >
            {' '}
            Page suivante{' '}
          </button>
        </div>
        <br></br>
        <div className="movielist">
          {movies.slice(21 * page, 21 * (page + 1)).map((movie) => (
            <Movie movie={movie} />
          ))}
        </div>
        <br></br>
        <div class="navigation-buttons">
          <button
            class="nav-button previous"
            onClick={() => {
              if (page > 1) {
                fetchMovies(movieName, page - 1, sortBy, genre);
                setPage(page - 1);
              }
            }}
          >
            {' '}
            Page précédente{' '}
          </button>
          Page {page}
          <button
            class="nav-button next"
            onClick={() => {
              fetchMovies(movieName, page + 1, sortBy, genre);
              setPage(page + 1);
            }}
          >
            {' '}
            Page suivante{' '}
          </button>
        </div>
      </header>
      <br></br>
    </div>
  );
}

export default Home;
