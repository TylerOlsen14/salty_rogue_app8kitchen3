const express = require('express');
const router = express.Router();

//Client Model - Help make queries
// const Record = require('../../models/record')
const Record = require('../../models/record')

// adding a series of routes
// @route   GET api/items
// @desc    GET all Items
// @access   Public
router.get('/', async (req, res) => { //represents api/items (because we're already in that file)
  await Record.find()
    .sort({ date: -1 })//sort descending
    .then(records => res.json(records))
})

router.get('/:id', async (req, res) => { //represents api/items (because we're already in that file)
  await Record
    .findById(req.params.id)
    .then(records => res.json(records))
})

// @route   POST api/record
// @desc    Create a record entry
// @access   Public
router.post('/', (req, res) => { //represents api/items (because we're already in that file)
  const newRecord = new Record({
    ClientName: req.body.ClientName, //name comes from a request
    ClientPhoneNumber: req.body.ClientPhoneNumber, //name comes from a request
    ClientNotes: req.body.ClientNotes //name comes from a request
  });
  newRecord.save().then(Record => res.json(Record)); //save to the database, spit out JSON
})

// @route   POST api/record
// @desc    Create a record entry
// @access   Public
router.put('/:id', (req, res) => { //represents api/items (because we're already in that file)
  Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, Record) => {
      // Handle any possible database errors
          if (err) return res.status(500).send(err);
          return res.send(Record);
    }
  ) 
});


// @route   DELETE api/record
// @desc    Delete a record entry
// @access   Public
router.delete('/:id', (req, res) => { //represents api/items (because we're already in that file)
  Record
    .findById(req.params.id)
    .then(record => record.remove()
    .then(() => res.json({sucess: true})))
    .catch (err => res.status(404).json({success: false}))
})


module.exports = router