import { useEffect, useState } from "react" ;
import axios from 'axios' ;

export default function useFetchMovies() {
	const [movies, setMovies] = useState([]) ;
	const [moviesLoadingError, setMoviesLoadingError] = useState([]) ;

	const fetchMovies = () => {
		setMoviesLoadingError(null) ;
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/movies`)
			.then((response) => {setUsers(response.data.users)})
			.catch((error) => {
				setUsersLoadingError('An error occured when fetching movies.')
				console.log(error)
			}) ;
	} ;

	useEffect(() => {fetchMovies()}, []) ;

	return {movies, moviesLoadingError, fetchMovies}
} ;
