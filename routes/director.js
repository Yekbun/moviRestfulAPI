const express = require('express');
const router = express.Router();

// Models
const Director = require('../models/Director');

/* GET home page. */
router.get('/', (req, res )=> {
    res.json({ title: 'Director' });
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

module.exports = router;