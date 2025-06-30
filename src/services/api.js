import axios from 'axios';

const API = axios.create({ baseURL: 'https://crm-backend-lwxu.onrender.com/api' });

export default API;
