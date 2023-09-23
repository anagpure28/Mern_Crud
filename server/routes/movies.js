const express = require("express");
const Movie = require("../model/Movie");
const movies = require("../config/movies.json")

const router = express.Router();

router.get("/movies", async(req,res)=> {
    try {
        const page = parseInt(req.query.page) -1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let genre = req.query.genre || "All";

        const genreOptions = [
            "Action",
            "Romance",
            "Fantacy",
            "Drama",
            "Crime",
            "Adventure",
            "Thriller",
            "Sci-fi",
            "Music",
            "Family",
        ];

        // Genre
        genre === "All" ? (genre = [...genreOptions]) : (genre = req.query.genre.split(","));

        // Sort
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if(sort[1]){
            sortBy[sort[0]] = sort[1];
        }else{
            sortBy[sort[0]] = "asc";
        }

        // Searching
        const movies = await Movie.find({name: {$regex: search, $options: "i"}})
        .where("genre")
        .in([...genre])
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);

        // Counting
        const total = await Movie.countDocuments({
            genre: {$in: [...genre]},
            name: {$regex: search, $options: "i"},
        });

        // Sending to frontend for functionality
        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            genres: genreOptions,
            movies
        }
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({error: true, msg: "Internal Server Error"});
    }
});

// Used for Inserting one time data into the db

// const insertMovies = async()=> {
//     try {
//         const docs = await Movie.insertMany(movies);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };

// insertMovies()
// .then((docs)=> console.log(docs))
// .catch((err)=> console.log(err));

module.exports = router;
