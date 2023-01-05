import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { topAnime } from "../../Common/queries";

const initialState = {
  loading: true,
  hasError: false,
  response: null,
};

export const fetchtopAnime = createAsyncThunk(
  "topAnimes/fetchtopAnime",
  (page) => {
    let url = "https://graphql.anilist.co";
    return axios
      .post(url, { query: topAnime(page) })
      .then((response) => response.data);
  }
);

const topAnimeSlice = createSlice({
  name: "topAnime",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchtopAnime.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchtopAnime.fulfilled, (state, action) => {
      if (!state.response?.Page) {
        (state.loading = false),
          (state.hasError = false),
          (state.response = action.payload.data);
      } else {
        state.response.Page.media = [
          ...state.response.Page.media,
          ...action.payload.data.Page.media,
        ];
      }
    });
    builder.addCase(fetchtopAnime.rejected, (state) => {
      (state.loading = false), (state.hasError = true);
    });
  },
});

export default topAnimeSlice.reducer;
