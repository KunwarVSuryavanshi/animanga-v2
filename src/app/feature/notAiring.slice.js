import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { anilistNotAiringScheduleQuery } from "../../Common/queries";

const initialState = {
  loading: true,
  hasError: false,
  response: null,
};

export const fetchUpcoming = createAsyncThunk(
  "notAiring/fetchUpcomings",
  () => {
    // NOTE: COULD HAVE USED notAiringAnime or notAiring but since for the specific action of fetchUpcomings using notAiringAnime/fetchUpcomings
    let url = "https://graphql.anilist.co";
    const date = new Date();
    return axios
      .post(url, { query: anilistNotAiringScheduleQuery(date) })
      .then((response) => response.data);
  }
);

const notAiring = createSlice({
  name: "notAiringAnime",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUpcoming.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUpcoming.fulfilled, (state, action) => {
      (state.loading = false),
        (state.hasError = false),
        (state.response = action.payload.data);
    });
    builder.addCase(fetchUpcoming.rejected, (state) => {
      (state.loading = false), (state.hasError = true);
    });
  },
});

export default notAiring.reducer;
