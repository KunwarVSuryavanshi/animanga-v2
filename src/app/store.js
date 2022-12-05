import { configureStore } from '@reduxjs/toolkit';
import airingSlice from '../feature/airing.slice';

export default configureStore({
  reducer: {
    airingAnime: airingSlice
  }
})