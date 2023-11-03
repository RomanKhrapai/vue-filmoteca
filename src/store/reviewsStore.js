import { defineStore } from "pinia";
import { BASE_IMG_FACE_URL } from "../constants";
import {
    collection,
    addDoc,
    getDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { db } from "../fireBase";

import axiosInstance from "../services/axios";
import { formatDate } from "../utils/date";
import { textToHtml } from "../utils/textToHtml";
import { useAuthStore } from "./authStore";

const authStore = useAuthStore();

export const useReviewsStore = defineStore("reviews", {
    state: () => ({
        reviews: [],
        rating: 2,
    }),
    getters: {
        readRating: (state) => state.rating,
        reviewsItems: (state) => {
            if (state.reviews.length === 0) {
                return null;
            }
            const reviews = state.reviews.sort(
                (a, b) => b.date.getTime() - a.date.getTime()
            );
            return reviews.map((review) => {
                const {
                    author,
                    content,
                    date = null,
                    author_details = null,
                    avatar_url = null,
                    uid = null,
                    id,
                } = review;
                const avatar = author_details?.avatar_path
                    ? BASE_IMG_FACE_URL + author_details.avatar_path
                    : avatar_url;
                return {
                    author,
                    content,
                    date: date ? formatDate(date)[0] : "",
                    avatar,
                    uid,
                    id,
                };
            });
        },
    },
    actions: {
        async saveReview(content, id, idDoc) {
            try {
                if (content?.trim() === "") return;
                const review = {
                    content,
                    author: authStore.user.name,
                    date: new Date(),
                    avatar_url: null,
                    uid: authStore.user.uid,
                };

                if (!idDoc) {
                    await addDoc(
                        collection(db, `/films/reviews/film_${id}`),
                        review
                    );
                } else {
                    const washingtonRef = doc(
                        db,
                        `/films/reviews/film_${id}`,
                        idDoc
                    );
                    await updateDoc(washingtonRef, review);
                }

                this.getReviews(id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        async getReviews(id) {
            this.getRating(id);
            try {
                this.reviews = [];
                const res = await axiosInstance.get(`/movie/${id}/reviews`);
                if (!res?.data?.results) {
                    throw "Помилка завантаження Коментарів";
                }

                this.reviews = res.data.results.map((review) => ({
                    ...review,
                    content: textToHtml(review.content),
                    date: new Date(review.updated_at),
                }));
            } catch (e) {
                console.error("Error get API reviews: ", e);
            }
            try {
                const querySnapshot = await getDocs(
                    collection(db, `/films/reviews/film_${id}`)
                );

                querySnapshot.forEach((doc) => {
                    this.reviews.push({
                        ...doc.data(),
                        id: doc.id,
                        date: new Date(doc.data().date.seconds * 1000),
                    });
                });
            } catch (e) {
                console.error("Error get DB reviews: ", e);
            }
        },
        async removeReview(idDoc, idFilm) {
            try {
                this.reviews = this.reviews.filter(
                    (review) => review.id !== idDoc
                );
                await deleteDoc(
                    doc(db, `/films/reviews/film_${idFilm}`, idDoc)
                );
            } catch (e) {
                console.error("Error get DB reviews: ", e);
            }
        },
        async getRating(id) {
            this.rating = 0;
            if (!authStore.isAuthorized) {
                return;
            }
            try {
                const docRef = doc(
                    db,
                    `/films/rating/film_268`,
                    authStore.user.uid
                );
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    this.rating = +docSnap.data()[id] || 0;
                } else {
                    this.rating = 0;
                }
            } catch (e) {
                console.error("Error get DB reviews: ", e);
            }
        },
        async saveRating(id, value) {
            if (!id) {
                return;
            }
            try {
                const washingtonRef = doc(
                    db,
                    `/films/rating/film_268`,
                    authStore.user.uid
                );
                await updateDoc(washingtonRef, { [id]: value });
                this.getReviews(id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
    },
});
