const MovieNotFoundError = require('../errors/movie-not-found-error.js');
const Movie = require('../model/movie.js');

const fs = require("fs");
const path = require("path");

module.exports = {
    
    // READ ALL
    getAllMovies: async (req, res, next) => {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    },

    // READ
    getMovieById: async (req, res, next) => {
        const id = req.params.id;
        const movie = await Movie.findById(id);

        if (movie) {
            res.status(200).json(movie);
            return;
        }
        next(new MovieNotFoundError(id));
    },

    // Post Movies
    addMovies: async (req, res, next) => {

        const image = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename));
        const encodedImage = image.toString("base64");

        const movie = {
            title: req.body.title,
            genre: req.body.genre,
            description: req.body.description,
            actors: req.body.actors,
            directors: req.body.directors,
            releaseYear: req.body.releaseYear,
            runtime: req.body.runtime,
            poster: {
                data: encodedImage,
                contentType: req.file.mimetype
            }
        }

        Movie.create(movie, (err, item) => {
            if (err) {
                console.log(err);
            } else {
                fs.unlinkSync(req.file.path);
                res.json(item);
            }
        })
    },

    getMovieByGenre: async (req, res, next) => {
        const genre = req.params.genre;
        const movies = await Movie.find({
            "genre": genre
        });
        res.status(200).json(movies);
    },

    getMovieByTitle: async (req, res, next) => {
        const title = req.params.title;
        const movies = await Movie.find({
            "title": title
        });
        res.status(200).json(movies);
    }
}