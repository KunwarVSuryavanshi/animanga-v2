import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAiringAnime } from "../../feature/airing.slice";
import CircularProgress from "@mui/material/CircularProgress";
import "./HomePage.scss";
import BannerCarousel from "../BannerCarousel/BannerCarousel";
import { fetchUpcoming } from "../../feature/notAiring.slice";
import Slider from "../Slider/Slider";
import Footer from "../Footer/Footer";
// import { airingToday } from "../../Common/queries";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';

function HomePage() {
  const dispatch = useDispatch();
  const { airingAnimeResponse, upcomingAnime } = useSelector((state) => {
    return {
      airingAnimeResponse: state.airingAnime,
      upcomingAnime: state.notAiring,
    };
  });

  useEffect(() => {
    if (
      airingAnimeResponse?.response?.data?.Page?.media?.length < 1 ||
      !airingAnimeResponse?.hasError
    ) {
      dispatch(fetchAiringAnime());
      // axios.post("https://graphql.anilist.co", { query: airingToday(null) });
    }
    if (!upcomingAnime.response || !upcomingAnime?.hasError) {
      dispatch(fetchUpcoming());
    }
  }, []);

  return (
    <>
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
            <BannerCarousel
              data={airingAnimeResponse?.response?.data?.Page?.media}
            />
            {/* <div className="carousel_container_right-btn"></div> */}
          </div>
        )}
      </div>
      <div className="sliderr">
        <Slider
          title={"UPCOMING..."}
          data={upcomingAnime?.response?.Page?.media}
          icon={<AutoAwesomeIcon/>}
        />
      </div>
      <div className="sliderr airing">
        <Slider
          title={"AIRING..."}
          data={airingAnimeResponse?.response?.data?.Page?.media}
          watch={true}
          icon={<SatelliteAltIcon/>}
        />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
