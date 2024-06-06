import typeorm from 'typeorm';

const Genre = new typeorm.EntitySchema({
  name: 'Genre',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    genre_name: {
      type: String,
      unique: true,
    },
  },
  relations: {
    movies: {
      type: 'many-to-many',
      target: 'Movie',
      joinTable: true,
    },
  },
});

export default Genre;
