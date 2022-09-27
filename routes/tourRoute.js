const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourController');

// ALiases

//.get(preMiddleware, controller);
router
  .route('/top-5-cheap')
  .get(tourController.top5cheap, tourController.getTours);

router.route('/').get(tourController.getTours).post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.UpdateTour)
  .delete(tourController.deleteTour);

module.exports = router;
