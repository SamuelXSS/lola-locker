import axios from 'axios';

const api = axios.create({
  baseURL: 'http://51.222.185.235:3333',
});

api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default api;
