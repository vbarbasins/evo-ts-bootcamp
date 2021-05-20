import { Action, createClient } from 'react-fetching-library';

export const client = createClient({});

export const getPhotos: Action = {
  method: 'GET',
  endpoint: 'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=1&api_key=VSZP5vE5UyWloRzpuFbFs2WuGcaC1B6Ngq8hFzqj',
};
