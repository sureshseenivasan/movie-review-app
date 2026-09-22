// Optional fallback data. The app uses the live TMDB API by default
// (see services/movieApi.ts). If you ever want to run the app fully
// offline or without an API key, App.tsx can be pointed at this array
// instead -- see the comment at the top of App.tsx.

import type { Movie } from "../types/Movie";

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Vikram",
    poster: "/posters/vikram.jpg",
    year: 2022,
    genre: "Action",
    rating: 4.7,
    description:
      "A special agent investigates a series of murders connected to a powerful drug syndicate.",
    cast: ["Kamal Haasan", "Vijay Sethupathi", "Fahadh Faasil"],
    director: "Lokesh Kanagaraj",
    duration: "2h 55m",
  },
  {
    id: 2,
    title: "Kaithi",
    poster: "/posters/kaithi.jpg",
    year: 2019,
    genre: "Action",
    rating: 4.8,
    description:
      "A recently released prisoner tries to meet his daughter while helping police fight a drug gang.",
    cast: ["Karthi", "Narain", "Arjun Das"],
    director: "Lokesh Kanagaraj",
    duration: "2h 25m",
  },
  {
    id: 3,
    title: "96",
    poster: "/posters/96.jpg",
    year: 2018,
    genre: "Romance",
    rating: 4.6,
    description: "Two school sweethearts meet years later and revisit their memories.",
    cast: ["Vijay Sethupathi", "Trisha Krishnan"],
    director: "C. Prem Kumar",
    duration: "2h 38m",
  },
  {
    id: 4,
    title: "Jailer",
    poster: "/posters/jailer.jpg",
    year: 2023,
    genre: "Action",
    rating: 4.4,
    description: "A retired jailer gets involved in a dangerous mission to protect his family.",
    cast: ["Rajinikanth", "Mohanlal", "Shiva Rajkumar"],
    director: "Nelson Dilipkumar",
    duration: "2h 48m",
  },
  {
    id: 5,
    title: "Soorarai Pottru",
    poster: "/posters/soorarai-pottru.jpg",
    year: 2020,
    genre: "Drama",
    rating: 4.9,
    description: "An ambitious man dreams of making air travel affordable for ordinary people.",
    cast: ["Suriya", "Aparna Balamurali", "Paresh Rawal"],
    director: "Sudha Kongara",
    duration: "2h 29m",
  },
];
