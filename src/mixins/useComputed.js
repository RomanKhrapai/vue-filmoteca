import { computed } from "vue";

export default function useComputed(id, userStore) {
    const isWatchedFilm = computed(
        () =>
            !userStore.user.library.some(
                (item) => +item.id === +id && item.isWatched === true
            )
    );
    const isBeforWatchedFilm = computed(
        () => !userStore.user.library.some((item) => +item.id === +id)
    );
    return { isWatchedFilm, isBeforWatchedFilm };
}
