import axios from 'axios';

const api = axios.create({
  baseURL: 'https://coffee-dev.ddns.net/api',
});

api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default api;
