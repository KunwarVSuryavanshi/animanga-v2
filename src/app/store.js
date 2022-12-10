import { configureStore } from '@reduxjs/toolkit';
import airingSlice from '../feature/airing.slice';
import notAiringReducer from '../feature/notAiring.slice';

export default configureStore({
  reducer: {
    airingAnime: airingSlice,
    notAiring: notAiringReducer,
  },
});