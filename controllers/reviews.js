const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    console.log(req.body);
    review.author = req.user._id;
    campground.reviews.push(review);
    review.save();
    campground.save();
    req.flash('success', 'Created new review for the campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Deleted the review successfully!');
    res.redirect(`/campgrounds/${id}`);
}