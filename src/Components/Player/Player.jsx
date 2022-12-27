import { Chip, LinearProgress, Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import "./Player.scss";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TableRowsIcon from "@mui/icons-material/TableRows";
import CellTowerIcon from "@mui/icons-material/CellTower";
import { cleanHTML } from "../../Common/utils";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Slider from "../Slider/Slider";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import StyleIcon from '@mui/icons-material/Style';
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

function Player() {
  const { epInfo } = useParams();
  const [animeInfo, setAnimeInfo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [playEp, setPlayEp] = useState(null);
  const [sources, setSources] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [buffering, setLoading] = useState(true);

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  const handleOpen = (item) => {
    console.log(item);
    setLoading(true);
    axios
      .get(`https://api.consumet.org/meta/anilist/watch/${item?.id}`)
      .then((res) => {
        setSources(res?.data?.sources);
        setLoading(false);
      });
    setPlayEp(item);
    setOpenModal(true);
  };

  const handleClose = () => {
    setPlayEp(null);
    setOpenModal(false);
  };

  useEffect(() => {
    if (epInfo) {
      axios
        .get(`https://api.consumet.org/meta/anilist/info/${epInfo}`)
        .then((res) => setAnimeInfo(res.data));
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
    return () => {
      setAnimeInfo(null);
    }
  }, [epInfo]);

  return (
    <div className="player_root">
      {console.log(animeInfo)}
      {!animeInfo ? (
        <div style={{ position: "sticky", top: "8vh", height: "100vh" }}>
          <LinearProgress color="primary" />
        </div>
      ) : (
        <div className="details">
          <div
            className="cover-image"
            style={{
              backgroundImage: `url(${
                animeInfo?.cover ??
                animeInfo?.coverImage?.extraLarge ??
                animeInfo?.coverImage?.large
              })`,
            }}
          >
            <div className="details_container">
              <div className="banner">
                <div
                  className="banner_image"
                  style={{ backgroundImage: `url(${animeInfo?.image})` }}
                />
              </div>
              {animeInfo && (
                <div className="about">
                  <div className="title">
                    {/* {animeInfo?.title?.native && (
                    <div className="title_jp">
                      {animeInfo?.title?.native} || &nbsp;
                    </div>
                  )} */}
                    {animeInfo?.title?.romaji ?? animeInfo?.title?.english}
                  </div>
                  <div className="anime_info">
                    <div className="type">{animeInfo?.type}</div>
                    <div className="score">
                      <ThumbUpOffAltIcon /> &nbsp;
                      {animeInfo?.rating / 10 ?? "NA"}
                    </div>
                    <div className="status">
                      <CellTowerIcon /> &nbsp;{animeInfo?.status}
                    </div>
                    <div className="ep_count">
                      <TableRowsIcon /> &nbsp;
                      {animeInfo?.totalEpisodes}
                    </div>
                    <div className="duration">
                      <AccessTimeIcon /> &nbsp;
                      {animeInfo?.duration}
                    </div>
                    <div className="popularity">
                      <TrendingUpIcon /> &nbsp;
                      {formatter.format(animeInfo?.popularity)}
                    </div>
                  </div>
                  <div className="description">
                    {cleanHTML(animeInfo?.description) ?? "NA"}
                  </div>
                  {/* <div className="popularity">{animeInfo?.poularity}</div>*/}
                  <div className="genres">
                    {animeInfo?.genres
                      ?.slice(0, 6)
                      ?.map(
                        (item) =>
                          item && <Chip label={item} color="secondary" />
                      )}
                  </div>
                  {/* <div className="studio" title='Studio'>
                  {animeInfo?.studios?.[0]}
                </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="character_slider">
        <Slider
          title={"Characters..."}
          data={animeInfo?.characters}
          icon={<TheaterComedyIcon />}
        />
      </div>
      <div className="episodes">
        <div className="title"><TableRowsIcon/> &nbsp;Episodes</div>
        <div className="ep-list">
          {animeInfo?.episodes?.map((item, key) => {
            return (
              <div
                className="ep_card"
                key={item?.number}
                onClick={() => handleOpen(item)}
              >
                <div
                  className="ep_image"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <PlayCircleOutlineIcon />
                </div>
                <div className="ep_no">Episode - {item?.number ?? key + 1}</div>
                <div className="ep_name">{item.title}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="related_slider">
        <Slider
          title={"Related..."}
          data={animeInfo?.relations}
          icon={<StyleIcon />}
          play={true}
        />
      </div>
      <div className="recommended_slider">
        <Slider
          title={"Recommendations..."}
          data={animeInfo?.recommendations}
          // watch={true}
          play={true}
          icon={<LightbulbIcon />}
        />
      </div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
      >
        <div className="modal_root">
          <svg
            className={`spinner ${!loading && "hidden"}`}
            viewBox="0 0 24 24"
          >
            <path
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity=".25"
            />
            <path
              d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
              className="path"
            />
          </svg>
          <ReactPlayer
            className="react-player"
            url={sources?.[0]?.url}
            // file={}
            width="100%"
            height="100%"
            controls={true}
            light={playEp?.image} // replace with image tag
            // playIcon={
            //   <div className="play-icon">
            //     <PlayCircleOutlineIcon />
            //   </div>
            // }
            playIcon={loading ? <></> : null}
            onBuffer={() => setLoading(true)}
            onBufferEnd={() => setLoading(false)}
            pip={false}
          ></ReactPlayer>
        </div>
      </Modal>
    </div>
  );
}

export default Player;
