import axiosInstance from "../../services/axios";
import { incrementpage, decrementPage, setValidPage } from "./filmMutation";

export default {
    getFilms() {
        const key = import.meta.env.VITE_FB_API_KEY;
        axiosInstance
            .get(
                `/trending/movie/day?api_key=${key}&page=${this.curentPage}&language=uk`
            )
            .then(({ data }) => {
                this.totalPages =
                    data.total_pages <= 500 ? data.total_pages : 500;
                this.filmsState = data.results;
            });
    },
    nextPage() {
        incrementpage();
    },
    prevPage() {
        console.log(1111);
        decrementPage();
    },
    setPage(val) {
        console.log(val);
        setValidPage(+val);
    },
};
