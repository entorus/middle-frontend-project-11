import axios from 'axios'

export const httpClient = axios.create({
  baseURL: `https://allorigins.hexlet.app/get?url=${encodeURIComponent('https://lorem-rss.hexlet.app')}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})