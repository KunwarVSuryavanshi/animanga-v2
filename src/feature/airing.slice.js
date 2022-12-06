import { createSlice } from '@reduxjs/toolkit'

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
      const response = await fetch(
        "https://api.consumet.org/meta/anilist/trending"
      );
      const data = await response.json();
      dispatch(getAiringSuccess(data))
    } catch (err) {
      dispatch(getAiringError(err))
    }
  }
}

export default airingSlice.reducer
export const { getAiringLoading, getAiringSuccess, getAiringError } = airingSlice.actions;
export { fetchAiringAnime };