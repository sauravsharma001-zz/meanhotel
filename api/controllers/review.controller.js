var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

module.exports.reviewsGetAll = function(req, res)   {
    var hotelId = req.params.hotelId;

    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function(err, hotel) {
            if(err) {
                res
                    .status(500)
                    .json(err);
            }
            else if(!hotel)   {
                res
                    .status(404)
                    .json({"message": "Hotel ID not found"});
            }
            else    {
                res
                    .status(200)
                    .json(hotel.reviews ? hotel.reviews : []);
            }
        });
};

module.exports.reviewsGetOne = function(req, res)   {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function(err, hotel) {
            if(err)    {
                res
                    .status(500)
                    .json(err);
            }
            else if(!hotel)   {
                res
                    .status(404)
                    .json({"message": "Hotel ID not found"});
            }
            else{
                var review = hotel.reviews.id(reviewId);
                if(!review)    {
                    res
                        .status(404)
                        .json({"message": "Review ID not found"});
                }
                else{
                    res
                        .status(200)
                        .json(review);
                }
            }
        });
};

var _addReview = function(req, res, hotel) {
    console.log("Request Body: " + req.body.name);
    hotel.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
    });

    hotel.save(function(err, hotelUpdated) {
        if(err){
            res
                .status(500)
                .json(err);
        }
        else    {
            res
                .status(201)
                .json(hotelUpdated.reviews[hotelUpdated.reviews.length-1]);
        }
    });
};

module.exports.reviewsAddOne = function(req, res)   {
    var hotelId = req.params.hotelId;

    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function(err, hotel) {
            if(err) {
                res
                    .status(500)
                    .json(err);
                return;
            }
            else if(!hotel)   {
                res
                    .status(404)
                    .json({"message": "Hotel ID not found " + hotelId});
                return;
            }
            else   {
                _addReview(req, res, hotel);
            }
        });
};

module.exports.reviewsUpdateOne = function(req, res)    {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, hotel) {
            var thisReview;
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!hotel) {
                console.log("Hotel id not found in database", id);
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found " + id
                };
            } else {
                // Get the review
                thisReview = hotel.reviews.id(reviewId);
                // If the review doesn't exist Mongoose returns null
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message": "Review ID not found " + reviewId
                    };
                }
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            }
            else    {
                thisReview.name = req.body.name;
                thisReview.rating = parseInt(req.body.rating, 10);
                thisReview.review = req.body.review;
                hotel.save(function(err, hotelUpdated)  {
                    if(err) {
                        res
                            .status(500)
                            .json(err);
                    }
                    else    {
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });
};

module.exports.reviewsDeleteOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, hotel) {
            var thisReview;
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!hotel) {
                console.log("Hotel id not found in database", id);
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found " + id
                };
            } else {
                // Get the review
                thisReview = hotel.reviews.id(reviewId);
                // If the review doesn't exist Mongoose returns null
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message": "Review ID not found " + reviewId
                    };
                }
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            }
            else    {
                hotel.reviews.id(reviewId).remove();
                hotel.save(function(err, hotelUpdated)  {
                    if(err) {
                        res
                            .status(500)
                            .json(err);
                    }
                    else    {
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });
};