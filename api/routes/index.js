var express = require("express");
var router = express.Router();

var ctrlHotels = require("../controllers/hotel.controllers.js");
var ctrlReviews = require("../controllers/review.controller.js");
var ctrlUsers = require("../controllers/user.controller.js");

router
    .route("/hotels")
    .get(ctrlHotels.hotelsGetAll)
    .post(ctrlUsers.authenticate, ctrlHotels.hotelsAddOne);

router
    .route("/hotels/:hotelId")
    .get(ctrlHotels.hotelsGetOne)
    .put(ctrlUsers.authenticate, ctrlHotels.hotelsUpdateOne)
    .delete(ctrlUsers.authenticate, ctrlHotels.hotelsDeleteOne);

// Review routes
router
    .route("/hotels/:hotelId/reviews")
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlUsers.authenticate, ctrlReviews.reviewsAddOne);

router
    .route("/hotels/:hotelId/reviews/:reviewId")
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlUsers.authenticate, ctrlReviews.reviewsUpdateOne)
    .delete(ctrlUsers.authenticate, ctrlReviews.reviewsDeleteOne);

//  Authentication
router
  .route("/users/register")
  .post(ctrlUsers.register);

router
  .route("/users/login")
  .post(ctrlUsers.login);

module.exports = router;
