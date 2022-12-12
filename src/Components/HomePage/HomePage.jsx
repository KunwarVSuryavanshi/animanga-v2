import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAiringAnime } from "../../feature/airing.slice";
import CircularProgress from "@mui/material/CircularProgress";
import "./HomePage.scss";
import BannerCarousel from "../BannerCarousel/BannerCarousel";
import { fetchUpcoming } from "../../feature/notAiring.slice";
import Slider from "../Slider/Slider";
import Footer from "../Footer/Footer";

function HomePage() {
  const [upComingAnime, setUpComingAnime] = useState([]);
  const dispatch = useDispatch();
  const { airingAnimeResponse, upcomingAnime } = useSelector((state) => {
    return {
      airingAnimeResponse: state.airingAnime,
      upcomingAnime: state.notAiring,
    };
  });

  useEffect(() => {
    if (
      airingAnimeResponse?.response?.results?.length < 1 ||
      !airingAnimeResponse?.hasError
    ) {
      dispatch(fetchAiringAnime());
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
            <BannerCarousel data={airingAnimeResponse?.response?.results} />
            {/* <div className="carousel_container_right-btn"></div> */}
          </div>
        )}
      </div>
      <div className="sliderr">
        <Slider
          title={"UPCOMING ANIME"}
          data={upcomingAnime?.response?.Page?.media}
        />
      </div>
      <Footer/>
    </>
  );
}

export default HomePage;
