import axios from 'axios';

// Backend base URL (Spring Boot running port)
const API = axios.create({
	baseURL: 'http://localhost:8080/api', // change port if backend runs in another port
});

// JWT token attach panna (if login done)
API.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default API;
