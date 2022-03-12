import { useEffect, useState } from "react";

import { api } from "./services/api";

import "./styles/global.scss";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";
import { Movie } from "./typings/movie";

export interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data);
    });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        selectedGenreId={selectedGenreId}
        setSelectedGenreId={setSelectedGenreId}
      />

      <Content selectedGenre={selectedGenre} movies={movies} />
    </div>
  );
}
