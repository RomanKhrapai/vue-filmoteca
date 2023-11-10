import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { BASE_IMG_FACE_URL } from "../constants";
import {
    collection,
    addDoc,
    getDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    setDoc,
    doc,
} from "firebase/firestore";
import { db } from "../fireBase";

import axiosInstance from "../services/axios";
import { formatDate } from "../utils/date";
import { textToHtml } from "../utils/textToHtml";
import { useAuthStore } from "./authStore";
import { useToast } from "vue-toastification";

const toast = useToast();

const authStore = useAuthStore();

export const useReviewsStore = defineStore("reviews", () => {
    const reviews = ref({ rating: 0, reviews: [] });

    const readRating = computed(() => reviews.value.rating);
    const reviewsItems = computed(() => {
        if (reviews.value.reviews.length === 0) {
            return null;
        }
        const items = reviews.value.reviews.sort(
            (a, b) => b.date.getTime() - a.date.getTime()
        );
        return items.map((review) => {
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
    });
    async function saveReview(content, id, idDoc) {
        try {
            if (content?.trim() === "") return;
            const review = {
                content,
                author: authStore.name,
                date: new Date(),
                avatar_url: null,
                uid: authStore.uid,
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

            getReviews(id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    async function getReviews(id) {
        getRating(id);
        try {
            reviews.value.reviews = [];
            const res = await axiosInstance.get(`/movie/${id}/reviews`);
            if (!res?.data?.results) {
                throw "Помилка завантаження Коментарів";
            }

            reviews.value.reviews = res.data.results.map((review) => ({
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
                reviews.value.reviews.push({
                    ...doc.data(),
                    id: doc.id,
                    date: new Date(doc.data().date.seconds * 1000),
                });
            });
        } catch (e) {
            console.error("Error get DB reviews: ", e);
        }
    }
    async function removeReview(idDoc, idFilm) {
        try {
            reviews.value.reviews = reviews.value.reviews.filter(
                (review) => review.id !== idDoc
            );
            await deleteDoc(doc(db, `/films/reviews/film_${idFilm}`, idDoc));
        } catch (e) {
            console.error("Error get DB reviews: ", e);
        }
    }
    async function getRating(id) {
        reviews.value.rating = 0;
        if (!authStore.isAuthorized) {
            return;
        }
        try {
            const docRef = doc(db, `/films/rating/film_268`, authStore.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                reviews.value.rating = +docSnap.data()[id] || 0;
            } else {
                reviews.value.rating = 0;
            }
        } catch (e) {
            console.error("Error get DB reviews: ", e);
        }
    }
    async function saveRating(id, value) {
        if (!id) {
            return;
        }
        try {
            const washingtonRef = doc(
                db,
                `/films/rating/film_268`,
                authStore.uid
            );
            await setDoc(washingtonRef, { [id]: value }, { merge: true });

            toast.success(+value ? "Оцінено" : "Оцінку видалено");

            getReviews(id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return {
        reviews,
        readRating,
        reviewsItems,
        saveReview,
        getReviews,
        removeReview,
        getRating,
        saveRating,
    };
});
