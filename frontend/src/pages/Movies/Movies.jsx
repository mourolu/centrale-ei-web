import useFetchMovies from './useFetchMovies' ;
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm' ;
// import MovieTable from '../../components/UsersTable' ;
import './Movies.css' ;

export default function Movies() {
	const {movies, moviesLoadingError, fetchMovies} = useFetchMovies() ;

	return (
		<div className = 'movies_containeur'>
			<h1>This page allows to add a film in the database.</h1>
			
			<AddMovieForm onSuccessfulMovieCreation = {fetchMovies} />
			{/* <MovieTable movies = {movies} onSuccessfulMovieDeletion = {fetchMovies} /> */}
			
			{moviesLoadingError !== null && (
				<div className = 'movies_loading_error'>{moviesLoadingError}</div>
			)}

		</div>
	)
}