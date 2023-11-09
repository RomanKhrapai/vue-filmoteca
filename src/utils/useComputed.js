import { computed } from "vue";

export default function useComputed(film, rating) {
    const newRating = computed(() => {
        if (!rating.value) {
            return film.value.rating;
        }
        return (
            (film.value.rating * film.value.count + rating.value) /
            (film.value.count + 1)
        ).toFixed(1);
    });
    const count = computed(() => {
        return rating.value ? film.value.count + 1 : film.value.count;
    });

    return { rating: newRating, count };
}
