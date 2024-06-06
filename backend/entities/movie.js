import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      unique: false,
    },
    release_date: { type: String },
    original_language: { type: String },
    overview: { type: String },
    poster_path: { type: String },
    like: { type: Number },
  },
  relations: {
    genres: {
      type: 'many-to-many',
      target: 'Genre',
      joinTable: true,
    },
    scores: {
      target: 'Score',
      type: 'one-to-many',
      inverseSide: 'movie.id',
    },
  },
});

export default Movie;
