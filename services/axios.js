import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://624a92c2fd7e30c51c0f021d.mockapi.io/contacts/",
    headers: "Content-Type:application/json",
});

export default axiosInstance;
