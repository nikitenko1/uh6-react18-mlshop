import axiosClient from "./axiosClient";

export const getReviews = (productId) => {
  return axiosClient.get(`/api/review/${productId}`);
};

export const postReview = (review) => {
  return axiosClient.post(`/api/review`, review);
};
