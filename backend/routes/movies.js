import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
// import Genre from '../entities/genre.js' ;
// import { In } from 'typeorm' ;

const router = express.Router();

export default router;
// const getAllMovies = async (req, res) => {
//   const movieRepository = appDataSource.getRepository(Movie);
//   const movies = await movieRepository.find();
//   res.json(movies);
// };
// router.get('/', getAllMovies);

router.get('/', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({
      relations: { genres: true },
      where: { genres: { genre_name: req.params.genre } },
    })
    .then(function (movies) {
      res.json({ movies });
    });
});

router.get('/:id', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({ where: { id: req.params.id } })
    .then(function (movie) {
      if (movie.length === 0) {
        res.status(404).json({
          message: `Movie with id '${req.params.id}' does not exist.`,
        });
      } else {
        res.status(200).json({ movie });
      }
    })
    .catch(function () {
      res.status(500).json({ message: `An error occured.` });
    });
});

router.post('/new', function (req, res) {
  // console.log(req.body.genres)
  // const genres = await appDataSource.getRepository(Genre).find({where : {id : In(req.body.genres)}}) ;
  // console.log(genres)
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    title: req.body.title,
    release_date: req.body.dateOfRelease,
    poster_path: req.body.imageUrl,
    original_language: req.body.originalLanguage,
    overview: req.body.overview,
    // genres : genres,
    popularity: 0,
    vote_average: 0,
  });
  movieRepository
    .insert(newMovie)
    .then(function (savedMovie) {
      res.status(200).json({
        message: `'${newMovie.title} has been add to the database with id ${newMovie.id}.`,
      });
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === 'SQLITE_CONSTRAINT') {
        console.log(error);
        res.status(400).json({
          message: `Movie with title '${newMovie.title}' already exists.`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the movie.' });
      }
    });
});

router.delete('/:id', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({ where: { id: req.params.id } })
    .then(function (movie) {
      if (movie.length === 0) {
        res.status(404).json({
          message: `Movie with id '${req.params.id}' does not exist.`,
        });
      } else {
        appDataSource
          .getRepository(Movie)
          .delete({ id: req.params.id })
          .then(function () {
            res.status(200).json({ message: 'Movie successfully deleted.' });
          });
      }
    })
    .catch(function () {
      res.status(404).json({ message: `An error occured.` });
    });
});
