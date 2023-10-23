import axios from "axios";

//https://api.themoviedb.org/3/trending/movie/day?api_key=967c6f14dacb0ca10f1175f7851a5869&page=1
const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: `Content-Type:application/json
     accept:application/json
    Authorization:Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjdjNmYxNGRhY2IwY2ExMGYxMTc1Zjc4NTFhNTg2OSIsInN1YiI6IjYxZGZmZjFmMGI1ZmQ2MDA4ZGU0NTExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.to0M1Np8gt9R68wSMglemCH_SCtPNCPFtQHirAE-g2o`,
});

export default axiosInstance;
