import { computed } from "vue";

export default function useComputed(filmStore, reviewsStore) {
    const rating = computed(() => {
        if (!reviewsStore.rating) {
            return filmStore.film.rating;
        }
        return (
            (filmStore.film.rating * filmStore.film.count +
                reviewsStore.rating) /
            (filmStore.film.count + 1)
        ).toFixed(2);
    });
    const count = computed(() => {
        return reviewsStore.rating
            ? filmStore.film.count + 1
            : filmStore.film.count;
    });
    return { rating, count };
}
