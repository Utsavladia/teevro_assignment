import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setQuery("");
    setLoading(true);
    try {
      const result = await axios.get("http://localhost:5000/api/search", {
        params: { query },
      });
      console.log(result.data);
      setMovies(result.data);
    } catch (error) {
      console.error("Error fetching the movies from api", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="flex p-20 gap-4">
        <form
          onSubmit={handleSearchSubmit}
          className="flex gap-4 w-full border border-zinc-600 rounded-full justify-between"
        >
          <input
            className=" px-6 py-2 rounded-full focus:outline-none w-full  bg-transparent"
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search for movies..."
          />
          <button
            type="submit"
            className="px-8 font-bold bg-orange-600 rounded-full hover:bg-orange-800 "
          >
            Search
          </button>
        </form>
        <button className="px-8 font-bold hover:bg-zinc-700 border border-zinc-500  bg-transparent rounded-full ">
          Filters
        </button>
      </header>
      <main>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <ul>
            {movies?.map((movie, index) => (
              <li key={index}>
                <h1>{movie.Title}</h1>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Home;
