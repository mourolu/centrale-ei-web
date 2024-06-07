import { useState } from 'react' ;
import axios from 'axios' ;
import './AddMovieForm.css' ;

const DEFAULT_FORM_VALUES = {title : '', dateOfRelease : '', imageUrl : '', genreIds : {'12' : false, '14' : false, '16' : false, '18' : false, '27' : false, '28' : false, '35' : false, '36' : false, '37' : false, '53' : false, '80' : false, '99' : false, '878' : false, '9648' : false, '10402' : false, '10749' : false, '10751' : false, '10752' : false, '10770' : false}, originalLanguage : '', overview : ''} ;

export default function addMovie({onSuccessfulMovieCreation}) {
	const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES) ;
	const [movieCreationSuccess, setMovieCreationSuccess] = useState(null) ;
	const [movieCreationError, setMovieCreationError] = useState(null) ; 

	const displayCreationSuccessMessage = () => {
		setMovieCreationSuccess('New movie added successfully.') ;
		setTimeout(() => {setMovieCreationSuccess(null)}, 3000)
	} ;

	const saveMovie = (event) => {
		event.preventDefault() ;
		setMovieCreationError(null) ;
		// setFormValues({...formValues, genreIds : getSelectedGenres(formValues.genreIds)}) ;
		// console.log(formValues.genreIds) ;
		axios
			.post(`${import.meta.env.VITE_BACKEND_URL}/movies/new`, formValues)
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

	// function setGenres(formValues, genreId, value) {
	// 	const genres = formValues.genreIds ;
	// 	genres[genreId] = value ;
	// 	setFormValues({...formValues, genreIds : genres})
	// } ;

	// function getSelectedGenres(formValues) {
	// 	// const [selectedGenres, setSelectedGenres] = useState([]) ;
	// 	// for (key in genres) {
	// 	// 	if (genres[key]) {setSelectedGenres((previousGenres) => [...previousGenres, genres[key]])}
	// 	// } ;
	// 	// return (selectedGenres)

	// 	const genres = formValues.genres ;
	// 	let selectedGenres = [] ;
	// 	for (key in genres) {
	// 		if (genres[key]) {selectedGenres.push(genres[key])}
	// 	} ;
	// 	return (selectedGenres)
	// } ;

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
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'aventure' value = {formValues.genreIds['12']} onChange = {(event) => setGenres(formValues, 12, event.target.checked)} />
						<label for = 'adventure'>Adventure</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'fantasy' value = {formValues.genreIds['14']} onChange = {(event) => setGenres(formValues, 14, event.target.checked)} />
						<label for = 'fantasy'>Fantasy</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'animation' value = {formValues.genreIds['16']} onChange = {(event) => setGenres(formValues, 16, event.target.checked)} />
						<label for = 'animation'>Animation</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'drama' value = {formValues.genreIds['18']} onChange = {(event) => setGenres(formValues, 18, event.target.checked)} />
						<label for = 'drama'>Drama</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'horror' value = {formValues.genreIds['27']} onChange = {(event) => setGenres(formValues, 27, event.target.checked)} />
						<label for = 'horror'>Horror</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'action' value = {formValues.genreIds['28']} onChange = {(event) => setGenres(formValues, 28, event.target.checked)} />
						<label for = 'action'>Action</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'comedy' value = {formValues.genreIds['35']} onChange = {(event) => setGenres(formValues, 35, event.target.checked)} />
						<label for = 'comedy'>Comedy</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'history' value = {formValues.genreIds['36']} onChange = {(event) => setGenres(formValues, 36, event.target.checked)} />
						<label for = 'history'>History</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'western' value = {formValues.genreIds['37']} onChange = {(event) => setGenres(formValues, 37, event.target.checked)} />
						<label for = 'western'>Western</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'thriller' value = {formValues.genreIds['53']} onChange = {(event) => setGenres(formValues, 53, event.target.checked)} />
						<label for = 'thriller'>Thriller</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'crime' value = {formValues.genreIds['80']} onChange = {(event) => setGenres(formValues, 80, event.target.checked)} />
						<label for = 'crime'>Crime</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'documentary' value = {formValues.genreIds['99']} onChange = {(event) => setGenres(formValues, 99, event.target.checked)} />
						<label for = 'documentary'>Documentary</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'science_fiction' value = {formValues.genreIds['878']} onChange = {(event) => setGenres(formValues, 878, event.target.checked)} />
						<label for = 'science_fiction'>Science fiction</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'mystery' value = {formValues.genreIds['9648']} onChange = {(event) => setGenres(formValues, 9648, event.target.checked)} />
						<label for = 'mystery'>Mystery</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'music' value = {formValues.genreIds['10402']} onChange = {(event) => setGenres(formValues, 10402, event.target.checked)} />
						<label for = 'music'>Music</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'romance' value = {formValues.genreIds['10749']} onChange = {(event) => setGenres(formValues, 10749, event.target.checked)} />
						<label for = 'romance'>Romance</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'family' value = {formValues.genreIds['10751']} onChange = {(event) => setGenres(formValues, 10751, event.target.checked)} />
						<label for = 'family'>Family</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'war' value = {formValues.genreIds['10752']} onChange = {(event) => setGenres(formValues, 10752, event.target.checked)} />
						<label for = 'war'>War</label>
					</div>
					<div>
						<input className = 'add_movie_input' type = 'checkbox' id = 'tv_movie' value = {formValues.genreIds['10770']} onChange = {(event) => setGenres(formValues, 10770, event.target.checked)} />
						<label for = 'tv_movie'>TV Movie</label>
					</div>
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