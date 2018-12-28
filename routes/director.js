const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Models
const Director = require('../models/Director');

  //Get Director's movies
  router.get('/', (req, res) => {
	const promise = Director.aggregate([
		{
			$lookup: {
				from: 'movies',
				localField: '_id',
				foreignField: 'director_id',
				as: 'movies'
			}
		},
		{
			$unwind: {
				path: '$movies',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio'
				},
				movies: {
					$push: '$movies'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				movies: '$movies'
			}
		}
	]);

	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	});
});

//Get Director's movies
router.get('/:director_id', (req, res) => {
	const promise = Director.aggregate([
        {
            $match:{
                '_id':mongoose.Types.ObjectId(req.params.director_id)
            }
        },
		{
			$lookup: {
				from: 'movies',
				localField: '_id',
				foreignField: 'director_id',
				as: 'movies'
			}
		},
		{
			$unwind: {
				path: '$movies',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio'
				},
				movies: {
					$push: '$movies'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				movies: '$movies'
			}
		}
	]);

	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	});
});
  
// Add director
router.post('/', (req,res )=>{
    const director= new Director( req.body);
    const promise = director.save();    
    promise.then((result) => {
      res.json({status:1})
    }).catch((err) => {
      res.json(err);
    });
  });

  
//Update director by id
router.put('/:director_id', (req, res, next) => {
	const promise = Director.findByIdAndUpdate(
		req.params.director_id,
		req.body,
		{
			new: true
		}
	);

	promise.then((result) => {
		if (!result)
			next({ message: 'The director was not found.', code: 99 });
		res.json(director);
	}).catch((err) => {
		res.json(err);
	});
});
  
  //Delete director by id
  router.delete('/:director_id', (req, res,next) =>{
    const promise = Director.findByIdAndRemove(req.params.director_id);
    promise.then((result)=>{
      if (!result)
      next({ message: 'The director was not found.', code: 99 });
  
    res.json({status:1});
    }).catch((err)=>{
      res.json(err);
    });
  });

module.exports = router;