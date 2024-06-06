import axios from 'axios' ;
import './MovieTable.css' ;

export default function MovieTable({movies, onSuccessfulMovieDeletion}) {
	const deleteMovie = (movieId) => {
		axios
			.delete(`${import.meta.env.VITE_BACKEND_URL}/movies/${movieID}`)
			.then(() => onSuccessfulMovieDeletion()) ;
	} ;

	return (
		<div></div>
	) ;
}