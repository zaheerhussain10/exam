// src/services/mediaService.js
const API_KEY = '53e71988';
const BASE_URL = 'http://www.omdbapi.com/';

export async function fetchMediaData(title) {
    const response = await fetch(`${BASE_URL}?t=${title}&apikey=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch media data');
    }
    return response.json();
}
