import { configureStore } from "@reduxjs/toolkit";
import airingSlice from "./feature/airing.slice";
import notAiringReducer from "./feature/notAiring.slice";
import searchAnimeSlice from "./feature/searchAnime.slice";
import topAnimeSlice from "./feature/topAnime.slice";
import topMangaSlice from "./feature/topManga.slice";

export default configureStore({
  reducer: {
    airingAnime: airingSlice,
    notAiring: notAiringReducer,
    topAnime: topAnimeSlice,
    searchedAnime: searchAnimeSlice,
    topManga: topMangaSlice
  },
});
