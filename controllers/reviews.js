const Campground = require('../models/campground');
const Review = require('../models/review');


module.exports.createReview = async(req, res) => {
    const {id} = req.params;
    const {review} = req.body;
    const campground = await Campground.findById(id);
    const _review = new Review(review);
    _review.author = req.user._id;
    campground.reviews.push(_review);
    await _review.save();
    await campground.save();
    req.flash('success', 'successfully made new review');

    res.redirect(`/campgrounds/${id}`)
}

module.exports.deleteReview = async(req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findOneAndDelete(reviewId);
    req.flash('success', 'successfully deleted review');
    res.redirect(`/campgrounds/${id}`);
}