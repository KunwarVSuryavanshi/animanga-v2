import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAiringAnime } from '../../feature/airing.slice';
import CircularProgress from "@mui/material/CircularProgress";
import './HomePage.scss'
import BannerCarousel from "../BannerCarousel/BannerCarousel";

function HomePage() {
  const [airing, setAiring] = useState([]);
  const dispatch = useDispatch();
  const airingAnimeResponse = useSelector((state) => state.airingAnime);
  
  useEffect(() => {
    if (
      airingAnimeResponse?.response?.results?.length < 1 ||
      !airingAnimeResponse?.hasError
    ) {
      dispatch(fetchAiringAnime());
    }
  }, [])

  return (
    <div className="banner">
      {airingAnimeResponse.loading ? (
        <div className="progress">
          <CircularProgress />
        </div>
      ) : airingAnimeResponse.hasError ? (
        <div>Oooops something went wrong</div>
      ) : (
        <div className="carousel_container">
          {/* <div className="carousel_container_left-btn"></div> */}
          {/* {airingAnimeResponse?.response?.data?.map((item, key) => {
            return <Carousel item={item} key={key} />;
          })} */}
          <BannerCarousel data={airingAnimeResponse?.response?.results} />
          {/* <div className="carousel_container_right-btn"></div> */}
        </div>
      )}
    </div>
  );
}

export default HomePage