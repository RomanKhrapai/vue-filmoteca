import { defineStore } from "pinia";
import axiosInstance from "../services/axios";
import { BASE_IMG_FACE_URL } from "../constants";

export const useReviewsStore = defineStore("reviews", {
    state: () => ({
        reviews: [],
    }),
    getters: {
        reviewsItems: (state) => {
            if (state.reviews.length === 0) {
                return null;
            }
            return state.reviews.map((review) => {
                const {
                    author,
                    content,
                    updated_at = null,
                    author_details = null,
                    avatar_url = null,
                    uid = null,
                } = review;
                const avatar = author_details?.avatar_path
                    ? BASE_IMG_FACE_URL + author_details.avatar_path
                    : avatar_url;
                const date = updated_at
                    ? `${updated_at.substring(0, 10)}  ${updated_at.substring(
                          11,
                          16
                      )}`
                    : date_time;

                return { author, content, date, avatar, uid };
            });
        },
    },
    actions: {
        getReviews(id) {
            axiosInstance
                .get(`/movie/${id}/reviews`)
                .then((res) => {
                    console.log(res.data.results);
                    this.reviews = res.data.results;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
});
