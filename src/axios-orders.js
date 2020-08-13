import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-pernil.firebaseio.com/'
});

export default instance;