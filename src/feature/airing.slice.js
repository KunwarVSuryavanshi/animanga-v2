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
    getAiringSuccess(state, response) {
      state.loading = false,
      state.hasErrors = false,
      state.response = response  
    },
    getAiringError(state, res = null) {
      state.loading = false,
      state.hasErrors = true,
      state.response = res
    }
  }
})

const fetchAiringAnime = () => {
  return async (dispatch) => {
    dispatch(getAiringLoading())

    try {
      const response = await fetch('https://api.jikan.moe/v4/seasons/now')
      const data = response.json()
      dispatch(getAiringSuccess(data))
    } catch (err) {
      dispatch(getAiringError(err))
    }
  }
}

export default airingSlice.reducer
export const { getAiringLoading, getAiringSuccess, getAiringError } = airingSlice.actions;