import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchAnime } from "../../Common/queries";
import axios from "axios";

const initialState = {
  loading: false,
  list: null,
  error: false,
  errorMessage: "",
};

export const searchAnimes = createAsyncThunk(
  "search/anime",
  (payload) => {
    let url = "https://graphql.anilist.co";
    return axios
      .post(url, {
        query: searchAnime(payload.page, payload.perPage, payload.text),
      })
      .then((res) => res.data)
      .catch((err) => err);
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    clearSearchData(state) {
      state.loading= false,
      state.list= null,
      state.error= false,
      state.errorMessage= ""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchAnimes.pending, (state) => {
      state.loading = true;
    }),
    builder.addCase(searchAnimes.fulfilled, (state, action) => {
      (state.loading = false),
      (state.list = action.payload.data),
      (state.error = false);
    }),
    builder.addCase(searchAnimes.rejected, (state) => {
      (state.loading = false), (state.error = true);
      state.errorMessage = action.payload.data;
      state.loading = false;
    });
  },
});

export default searchSlice.reducer;
export const { clearSearchData } = searchSlice.actions;