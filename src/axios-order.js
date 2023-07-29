import axios from "axios";

const instance = axios.create({
    baseURL: 'https://burger-builder-15036-default-rtdb.firebaseio.com/'
});

export default instance;