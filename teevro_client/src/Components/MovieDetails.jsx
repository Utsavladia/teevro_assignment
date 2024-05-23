import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/movie/${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("error fetchinng the movie details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!movie) {
    return <h1>Movie Not found</h1>;
  }

  return (
    <div className="p-20 grid grid-cols-2">
      <div className="flex justify-center items-baseline">
        <img src={movie.Poster} className=" object-cover" />
      </div>
      <div className="flex flex-col gap-4 max-h-screen overflow-auto container ">
        <h1 className="text-3xl font-bold">{movie.Title}</h1>
        <div>
          <h2 className="text-lg font-semibold text-zinc-400">{movie.Genre}</h2>
          <h2 className="text-md font-semibold text-zinc-400">
            {movie.Released}
          </h2>
          <button className="bg-yellow-500 text-black font-bold text-md px-2 rounded-sm mt-2">
            {movie.imdbRating}
          </button>
        </div>
        {/* <h2 className="text-xl text-zinc-500">{movie.Year}</h2> */}
        <table className="w-full">
          <tbody>
            {Object.entries(movie).map(
              ([key, value]) =>
                key !== "Poster" &&
                key !== "Title" &&
                key !== "imdbRating" &&
                key !== "Released" &&
                key !== "Genre" && (
                  <tr key={key} className="">
                    <td className="px-0 py-2 whitespace-nowrap text-sm font-medium text-gray-400">
                      {key}
                    </td>
                    <td className="px-8 py-2  text-sm text-gray-400">
                      {Array.isArray(value)
                        ? value.map((item, idx) => (
                            <p key={idx}>
                              {item.Source}: {item.Value}
                            </p>
                          ))
                        : value}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieDetails;
