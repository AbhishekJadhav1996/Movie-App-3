import React, { useEffect, useState } from "react";
import { getMovies, addMovie, deleteMovie } from "./api";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import FeatureBanner from "./components/FeatureBanner";
import StatsStrip from "./components/StatsStrip";
import HeroCarousel from "./components/HeroCarousel";
import "./index.css";

// Movie → Hero mapping
const movieHeroMap = {
  "The Dark Knight": "Batman",
  Inception: "Iron Man",
  "Daagdi Chawl": "Superman",
  "Captain America: The First Avenger": "Captain America",
  "Wonder Woman": "Wonder Woman",
};

function App() {
  // Sample fallback movies
  const SAMPLE_MOVIES = [
    { _id: "s1", title: "The Dark Knight", genre: "Action", year: 2008, rating: 9.0 },
    { _id: "s2", title: "Inception", genre: "Sci-Fi", year: 2010, rating: 8.8 },
    { _id: "s3", title: "Daagdi Chawl", genre: "Action", year: 2014, rating: 8.6 },
  ];

  // ✅ preload with sample movies so UI never looks empty
  const [movies, setMovies] = useState(SAMPLE_MOVIES);
  const [currentHero, setCurrentHero] = useState(null);

  // Fetch movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await getMovies();
        const list = Array.isArray(data) ? data : data.movies || [];
        if (list.length) {
          setMovies(list); // replace only if API has movies
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        // keep showing SAMPLE_MOVIES
      }
    };
    fetchMovies();
  }, []);

  // Add a new movie
  const handleAddMovie = async (movieData) => {
    try {
      const { data } = await addMovie(movieData);
      setMovies((prev) => [...prev, data]);

      // Map movie → hero if possible
      const mappedHero = movieHeroMap[data.title] || null;
      setCurrentHero(mappedHero);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  // Delete a movie
  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div>
      {/* Background carousel */}
      <HeroCarousel currentHero={currentHero} />

      {/* Overlay content on top of carousel */}
      <div className="overlay-content">
        <Navbar />
        <FeatureBanner />
        <StatsStrip />

        {/* Main app content now on overlay */}
        <div className="app-container">
          <MovieForm onAddMovie={handleAddMovie} />
          <MovieList movies={movies} onDeleteMovie={handleDeleteMovie} />
        </div>
      </div>
    </div>
  );
}

export default App;


// import React, { useEffect, useState } from "react";
// import { getMovies, addMovie, deleteMovie } from "./api";
// import MovieForm from "./components/MovieForm";
// import MovieList from "./components/MovieList";
// import Navbar from "./components/Navbar";
// import FeatureBanner from "./components/FeatureBanner";
// import StatsStrip from "./components/StatsStrip";
// import HeroCarousel from "./components/HeroCarousel";
// import "./index.css";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [currentHero, setCurrentHero] = useState(null);

//   const SAMPLE_MOVIES = [
//     { _id: 's1', title: 'The Dark Knight', genre: 'Action', year: 2008, rating: 9.0 },
//     { _id: 's2', title: 'Inception', genre: 'Sci-Fi', year: 2010, rating: 8.8 },
//     { _id: 's3', title: 'Daagdi Chawl', genre: 'Action', year: 2014, rating: 8.6 },
//   ];

//   // Fetch movies on mount
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const { data } = await getMovies();
//         const list = Array.isArray(data) ? data : data.movies || [];
//         setMovies(list.length ? list : SAMPLE_MOVIES);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//         setMovies(SAMPLE_MOVIES);
//       }
//     };
//     fetchMovies();
//   }, []);

//   // Add a new movie
//   const handleAddMovie = async (movieData) => {
//     try {
//       const { data } = await addMovie(movieData);
//       setMovies((prev) => [...prev, data]);
//       setCurrentHero(data.title);
//     } catch (error) {
//       console.error("Error adding movie:", error);
//     }
//   };

//   // Delete a movie
//   const handleDeleteMovie = async (id) => {
//     try {
//       await deleteMovie(id);
//       setMovies((prev) => prev.filter((movie) => movie._id !== id));
//     } catch (error) {
//       console.error("Error deleting movie:", error);
//     }
//   };

//   return (
//     <div>
//       {/* Background carousel */}
//       <HeroCarousel currentHero={currentHero} />

//       {/* Overlay content on top of carousel */}
//       <div className="overlay-content">
//         <Navbar />
//         <FeatureBanner />
//         <StatsStrip />

//         {/* Main app content now on overlay */}
//         <div className="app-container">
//           <MovieForm onAddMovie={handleAddMovie} />
//           <MovieList movies={movies} onDeleteMovie={handleDeleteMovie} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
