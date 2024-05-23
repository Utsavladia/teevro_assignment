const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const mykey = "33f3fea3";

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("This is the movie search");
});

app.get("/api/search", async (req, res) => {
  try {
    const { query } = req.query;
    console.log("got the query as ", query);

    if (!query) {
      return res.status(400).json({ error: "No query is present" });
    }

    // Use encodeURIComponent to handle special characters in the query
    const encodedQuery = encodeURIComponent(query);

    const response = await axios.get(
      `http://www.omdbapi.com/?s=${encodedQuery}&apikey=${mykey}`
    );

    // Extract 'Search' from the response data
    const { Search } = response.data;
    console.log(Search);

    if (!Search) {
      return res.status(404).json({ error: "No movies found" });
    }

    res.json(Search);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Some error occurred fetching movies" });
  }
});

app.get("/api/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=${mykey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: "Movie not found" });
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
});
