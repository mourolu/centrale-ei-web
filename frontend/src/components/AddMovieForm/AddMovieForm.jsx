import { useState } from 'react' ;
import axios from 'axios' ;
import './AddMovieForm.css' ;

const DEFAULT_FORM_VALUES = {title : '', dateOfRelease : '', imageUrl : '', genreIds : [false, false, false], adults : false, originalLanguage : '', overview : ''} ;

export default function addMovie({onSuccessfulMovieCreation}) {
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
		console.log(formValues)
	} ;

	function setGenres(formValues, genreId, value) {
		const genres = formValues.genreIds ;
		genres[genreId] = value ;
		setFormValues({...formValues, genreIds : genres})
	} ;

	return (
		<div>
			<form className = 'add_movie_form' onSubmit = {saveMovie}>

				<p className = 'add_movie_descriptor'>Complete title, date of release, image URL and original language :</p>

				<input className = 'add_movie_input' required type = 'input' placeholder = 'Title' value = {formValues.title} onChange = {(event) => setFormValues({ ...formValues, title : event.target.value})} />
				<input className = 'add_movie_input' required type = 'date' value = {formValues.dateOfRelease} onChange = {(event) => setFormValues({ ...formValues, dateOfRelease : event.target.value})} />
				<input className = 'add_movie_input' required type = 'url' placeholder = 'Image URL' value = {formValues.imageUrl} onChange = {(event) => setFormValues({ ...formValues, imageUrl : event.target.value})} />
				<input className = 'add_movie_input' required type = 'text' placeholder = 'Original language' value = {formValues.originalLanguage} onChange = {(event) => setFormValues({ ...formValues, originalLanguage : event.target.value})} />

				<p className = 'add_movie_descriptor'>Select the genres to which the movie belong to :</p>

				<div>
					<input className = 'add_movie_input' type = 'checkbox' id = 'genre_1' value = {formValues.genreIds[0]} onChange = {(event) => setGenres(formValues, 0, event.target.checked)} />
					<label for = 'genre_1'>Genre 1</label>
				</div>

				<p className = 'add_movie_descriptor'>Scepcify if the film is intended for adults :</p>

				<div>
					<input className = 'add_movie_input' type = 'checkbox' id = 'adult' value = {formValues.adults} onChange = {(event) => setFormValues({ ...formValues, adults : event.target.checked})} />
					<label for = 'adult'>Adult movie</label>
				</div>

				<p>You can add an overview of the movie :</p>

				<input className = 'add_movie_input_large' type = 'text' pacehorlder = 'Overview' value = {formValues.overview} onChange = {(event) => setFormValues({...formValues, overview : event.target.value})} />

				<p></p>

				<button className = 'add_movie_button' type = 'submit'>Add movie</button>

				<p></p>
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