const express = require('express');
const router = express.Router();
const { deleteTraining } = require('../controllers/trainingsController');
const authorizeRoles = require('../middlewares/authorizeRoles');
const verifySession = require('../middlewares/authenticationMiddleware');


// Test route to simulate API failure
router.get('/fail-trainings', async (req, res, next) => {
  try {
    throw new Error("Failed to load trainings");
  } catch (err) {
    err.status = 500;
    next(err); // this will go to errorHandler
  }
});
const Training = require('../models/Training');

// Temporary route to insert dummy data
router.post('/seed', async (req, res) => {
  try {
    const training = new Training({
      title: 'First Aid Certification',
      description: 'Mandatory safety training',
      date: new Date(),
      createdBy: 'EMPLOYEE00001'
    });

    const saved = await training.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to seed training data' });
  }
});


router.delete('/:id', verifySession, authorizeRoles('HR', 'Admin'), deleteTraining);

module.exports = router;
