
import axios from 'axios';

const API = axios.create({ baseURL: 'http://192.168.0.180:8000/api/' });

// Fetch all articles
export const fetchArticles = () => API.get('articles/');

// Fetch a single article by slug
export const fetchArticle = slug => API.get(`articles/${slug}/`);
