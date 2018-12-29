const express = require('express');
const router = express.Router();

// Models

const Movie = require('../models/Movie');

/* GET users listing. */
router.get('/', (req, res) =>{
  const promise = Movie.aggregate([
		{
			$lookup: {
				from: 'directors',
				localField: 'director_id',
				foreignField: '_id',
				as: 'director'
			}
		},
		{
			$unwind: '$director'
		}
  ]);
  
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

//Get top 10 movies
router.get('/:top2', (req, res) =>{
  const promise = Movie.find().limit(2).sort({imdb_score:-1});
  promise.then((movie)=>{
    res.json(movie);
  }).catch((err)=>{
    res.json(err);
  });
});

//Get top 10 movies
router.get('/:top10', (req, res) =>{
  const promise = Movie.find().limit(10).sort({imdb_score:-1});
  promise.then((movie)=>{
    res.json(movie);
  }).catch((err)=>{
    res.json(err);
  });
});




//Get movie by Id
router.get('/:movie_id', (req, res,next) =>{
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie)=>{
    if (!movie)
    next({ message: 'The movie was not found.', code: 99 });

  res.json(movie);
  }).catch((err)=>{
    res.json(err);
  });
});

/* Between two dates */
router.get('/between/:start_year/:end_year', (req, res) =>{
  let {start_year, end_year}=req.params;
  const promise = Movie.find(
    { 
    year:{"$gte":parseInt(start_year), "$lte":parseInt(end_year)}
    }
  );
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

// Add movie
router.post('/', (req,res,next)=>{
  const movie= new Movie( req.body);
  const promise = movie.save();
  promise.then((result) => {
    res.json({status:1})
  }).catch((err) => {
    res.json(err);
  });
});

//Update movie
router.put('/:movie_id', (req, res,next) =>{
  const promise = Movie.findOneAndUpdate(
    req.params.movie_id, 
    req.body,
    {
      new:true
    });
  promise.then((movie)=>{
    if (!movie)
    next({ message: 'The movie was not found.', code: 99 });

    res.json({status:1})
  }).catch((err)=>{
    res.json(err);
  });
});

//Delete movie by Id
router.delete('/:movie_id', (req, res,next) =>{
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie)=>{
    if (!movie)
    next({ message: 'The movie was not found.', code: 99 });

  res.json({status:1});
  }).catch((err)=>{
    res.json(err);
  });
});

module.exports = router;
