import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getReviews, postReview } from "../../api/reviewApi";
import ReviewItem from "./ReviewItem";
import { v4 } from "uuid";

const reviews = [
  {
    label: "Very bad",
    value: 1,
  },
  {
    label: "Bad",
    value: 2,
  },
  {
    label: "Normal",
    value: 3,
  },
  {
    label: "Good",
    value: 4,
  },
  {
    label: "Very good",
    value: 5,
  },
];

const Reviews = () => {
  const [review, setReview] = useState({
    review: "1",
    text: "",
  });

  const [reviewList, setReviewList] = useState([]);

  const params = useParams();

  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();

  const handleOnChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newReview = {
        ...review,
        user: currentUser,
        productId: params.id,
      };
      const res = await postReview({ ...newReview, user: currentUser._id });
      if (res.data.success) {
        return toast.success("Comment added!");
      }
      setReviewList([...reviewList, newReview]);
      setReview({
        review: "1",
        text: "",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error("Comment failed!");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getReviews(params.id);
        if (res.data.success) {
          setReviewList(res.data.reviews);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params.id]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="font-semibold  bg-white p-2 my-3 rounded-md">Product Reviews</div>
      <div>
        {currentUser ? (
          <div>
            <div className="flex items-center rounded-md overflow-hidden">
              <input
                required
                onChange={handleOnChange}
                name="text"
                className="bg-white w-full p-2 outline-none flex-1"
                placeholder="Leave your review about this product!"
                value={review.text}
              />
              <button
                disabled={loading}
                className="py-2 px-3 h-full bg-amber-400 rounded-md text-white ml-3 ring-inset ring-2 hover:ring-[#b2071d]"
              >
                {loading ? "Loading..." : "Send"}
              </button>
            </div>
            <div className="mt-3 w-full overflow-hidden">
              <select
                value={review.review}
                required
                onChange={handleOnChange}
                name="review"
                className="w-full p-2 border-none rounded-md outline-none"
              >
                {reviews.map((review) => (
                  <option key={v4()} value={review.value}>
                    {review.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="mt-3 bg-white p-3 text-center rounded-md">
            <h2>
              You need{" "}
              <Link
                to={`/auth/login?redirect=${encodeURIComponent(location.pathname)}`}
                className="text-blue-500"
              >
                log in
              </Link>{" "}
              to be able to comment!
            </h2>
          </div>
        )}
      </div>
      <div className={`${reviewList.length >= 3 && "h-[395px] overflow-y-scroll show-scroll-bar"}`}>
        {reviewList.length > 0 ? (
          reviewList.map((review) => <ReviewItem review={review} key={review._id} />)
        ) : (
          <div className="bg-white text-center p-3 mt-3 rounded-md">There are no comments yet</div>
        )}
      </div>
    </form>
  );
};

export default Reviews;
