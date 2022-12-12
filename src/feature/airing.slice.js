import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: true,
  hasErrors: false,
  response: null
}

const airingSlice = createSlice({
  name: 'airingAnime',
  initialState,
  reducers: {
    getAiringLoading(state) {
      state.loading = true
    },
    getAiringSuccess(state, {payload}) {
      state.loading = false,
      state.hasErrors = false,
      state.response = payload  
    },
    getAiringError(state) {
      state.loading = false,
      state.hasErrors = true
    }
  }
})

const fetchAiringAnime = () => {
  return async (dispatch) => {
    dispatch(getAiringLoading())
    try {
      const response = await axios.get(
        "https://api.consumet.org/meta/anilist/trending"
      );
      // dispatch(airingSlice.actions.getAiringSuccess(response.data)); NOTE: THIS IS ALSO CORRECT
      dispatch(getAiringSuccess(response.data))
    } catch (err) {
      dispatch(getAiringError(err))
    }
  }
}

export default airingSlice.reducer
export const { getAiringLoading, getAiringSuccess, getAiringError } = airingSlice.actions;
// EVEN THOUGH NOT USING ACTION IN ANY JSX FILE STILL EXPORTING, WHY????
// BECAUSE IN THE ABOVE ACTION HAVE USED THOSE ACTIONS, SO BECAUSE OF NAME EXPORT BEING ABLE TO DIRECTLT CALL THE FUNCTION (ACTION) OTHER WISE WOULD HAVEE TO USE LINE NO 36


// export const airingSliceAction = airingSlice.actions;
export { fetchAiringAnime };