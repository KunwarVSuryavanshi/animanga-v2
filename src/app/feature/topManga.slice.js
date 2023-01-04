import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { topAnime } from "../../Common/queries";

const initialState = {
  loading: true,
  hasError: false,
  response: null,
};

export const fetchtopManga = createAsyncThunk(
  "topManga/fetchtopmanga",
  (page) => {
    let url = "https://graphql.anilist.co";
    return axios
      .post(url, { query: topAnime(page, 'MANGA') })
      .then((response) => response.data);
  }
);

const managaSlice = createSlice({
  name: 'topManga',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchtopManga.pending, (state) => {
      state.loading = true;
      state.hasError = false;
    })
    builder.addCase(fetchtopManga.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload.data;
      state.hasError = false;
    })
    builder.addCase(fetchtopManga.rejected, state => {
      state.loading = false;
      state.hasError = true;
    })
  }
});

export default managaSlice.reducer;