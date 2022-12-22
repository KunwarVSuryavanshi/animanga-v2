import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { airingToday } from "../../Common/queries";

const initialState = {
  loading: true,
  hasError: false,
  response: null,
};

const airingSlice = createSlice({
  name: "airingAnime",
  initialState,
  reducers: {
    getAiringLoading(state) {
      state.loading = true;
    },
    getAiringSuccess(state, { payload }) {
      (state.loading = false),
        (state.hasError = false),
        (state.response = payload);
    },
    getAiringError(state) {
      (state.loading = false), (state.hasError = true);
    },
  },
});

const fetchAiringAnime = () => {
  return async (dispatch) => {
    dispatch(getAiringLoading());
    try {
      let url = "https://graphql.anilist.co";
      const response = await axios.post(url, { query: airingToday() });
      // await axios.get("https://api.consumet.org/meta/anilist/trending?perPage=20");
      // dispatch(airingSlice.actions.getAiringSuccess(response.data)); NOTE: THIS IS ALSO CORRECT
      dispatch(getAiringSuccess(response.data));
    } catch (err) {
      dispatch(getAiringError(err));
    }
  };
};

export default airingSlice.reducer;
export const { getAiringLoading, getAiringSuccess, getAiringError } =
  airingSlice.actions;
// EVEN THOUGH NOT USING ACTION IN ANY JSX FILE STILL EXPORTING, WHY????
// BECAUSE IN THE ABOVE ACTION HAVE USED THOSE ACTIONS, SO BECAUSE OF NAME EXPORT BEING ABLE TO DIRECTLT CALL THE FUNCTION (ACTION) OTHER WISE WOULD HAVEE TO USE LINE NO 36

// export const airingSliceAction = airingSlice.actions;
export { fetchAiringAnime };
