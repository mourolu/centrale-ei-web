import '../../pages/Home/Home.css';

export function Movie({ movie }) {
  return (
    <li>
      <p>{movie.title}</p>
      <p>{movie.release_date}</p>
      <p>
        <a href={`http://localhost:3000/about`}>
          <img
            src={`https://image.tmdb.org/t/p/w500` + movie.poster_path}
            className="image"
            alt={movie.title}
            onClick={() => console.log('bonjour')}
          />
        </a>
      </p>
    </li>
  );
}
