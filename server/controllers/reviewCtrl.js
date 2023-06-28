const Review = require("../models/Review");

const getReviews = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviews = await Review.find({ productId }).populate("user").select("-password");
    return res.json({
      success: true,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const postReview = async (req, res) => {
  try {
    const newReview = new Review({ ...req.body });
    await newReview.save();
    return res.json({
      success: true,
      review: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getReviews,
  postReview,
};
