import { useFilmStore } from "./filmStore";

export function incrementpage() {
    const store = useFilmStore();
    if (store.curentPage < store.totalPages) {
        store.curentPage += 1;
    }
}

export function decrementPage() {
    const store = useFilmStore();
    if (store.curentPage >= 2) {
        store.curentPage -= 1;
    }
}

export function setValidPage(num) {
    const store = useFilmStore();
    if (num === 0) {
        return (store.curentPage = 1);
    }
    store.curentPage = num <= store.totalPages ? num : store.totalPages;
}
