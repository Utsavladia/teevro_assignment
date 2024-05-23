import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className=" rounded-lg overflow-hidden mb-6 flex-col bg-zinc-900  ">
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} className=" h-3/4 object-fill w-full" />
        <h1 className=" text-center text-lg   pt-6 p-2">{movie.Title}</h1>
        <p className="text-center text-zinc-500 font-bold p-2 text-md">
          {movie.Year}
        </p>
      </Link>
    </div>
  );
};

export default MovieCard;
