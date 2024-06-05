import { useState } from 'react' ;
import axios from 'axios' ;
import './AddMovie.css' ;

const DEFAULT_FORM_VALUES = {name : '', dateOfRelease : '', image_url : '', genre_ids : [false, false, false], adults : false, original_language : ''} ;

export default function add_movie({onSuccessfulMovieCreation}) {
	const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES) ;
	const [movieCreationSuccess, setMovieCreationSuccess] = useState(null) ;
	const [movieCreationError, setMovieCreationError] = useState(null) ; 

	const displayCreationSuccessMessage = () => {
		setMovieCreationSuccess('New movie added successfully.') ;
		setTimout(() => {setMovieCreationSuccess(null)}, 3000)
	} ;

	const saveMovie = (event) => {
		event.preventDefault() ;
		setMovieCreationError(null) ;
		axios
			.post(`${import.meta.env.VITE_BACKEND_URL}/movie/new`, formValues)
			.then(() => {
				displayCreationSuccessMessage() ;
				setFormValues(DEFAULT_FORM_VALUES) ;
				onSuccessfulMovieCreation()
			})
			.catch((error) => {
				setMovieCreationError('An error occured while creating new movie') ;
				console.error(error)
			}) ;
		 } ;

	return (
		<div>
			<form className = 'add_movie_form' onSubmit = {saveMovie}>
				<input className = 'add_movie_input' required type = 'input' placeholder = 'title' value = {formValues.name} onChange = {(input) => setFormValues({ ...formValues, name : input.target.name})} />
				<input className = 'add_movie_input' required type = 'date' placeholder = 'date_of_release' value = {formValues.dateOfRelease} onChange = {(input) => setFormValues({ ...formValues, dateOfRelease : input.target.dateOfRelease})} />
				<input className = 'add_movie_input' required type = 'url' placeholder = 'title' value = {formValues.image_url} onChange = {(input) => setFormValues({ ...formValues, image_url : input.target.image_url})} />
				
				<div>
					<input className = 'add_movie_input' type = 'checkbox' id = 'genre_1' value = {formValues.genre_ids[0]} onChange = {(input) => setFormValues({ ...formValues, genre_ids : input.target.genre_ids[0]})} />
					<label for = 'genre_1'>Genre 1</label>
				</div>

				<div>
					<input className = 'add_movie_input' type = 'checkbox' id = 'adult' value = {formValues.adults} onChange = {(input) => setFormValues({ ...formValues, adults : input.target.adults})} />
					<label for = 'adult'>Film pour adultes</label>
				</div>

				<input className = 'add_movie_input' required type = 'text' placeholder = 'original_language' value = {formValues.original_language} onChange = {(input) => setFormValues({ ...formValues, original_langage : input.target.original_language})} />
				<button className = 'add_movie_button' type = 'submit'>Add movie</button>
			</form>

			{movieCreationSuccess !== null && (
				<div className = 'movie_creation_success'>{movieCreationSuccess}</div>
			)}

			{movieCreationError !== null && (
				<div className = 'movie_creation_error'>{movieCreationError}</div>
			)}
		</div>
	) ;
} ;