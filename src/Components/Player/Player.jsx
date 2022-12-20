import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useParams } from "react-router-dom";
import "./Player.scss";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import CellTowerIcon from "@mui/icons-material/CellTower";
import { cleanHTML } from "../../Common/utils";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function Player() {
  const { epInfo } = useParams();
  const state = useLocation();
  const [animeInfo, setAnimeInfo] = useState(null);
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  useEffect(() => {
    if (epInfo) {
      axios
        .get(`https://api.consumet.org/meta/anilist/info/${epInfo}`)
        .then((res) => setAnimeInfo(res.data));
    }
  }, [epInfo]);

  return (
    <div className="player_root">
      {console.log(animeInfo)}
      <div className="details">
        <div
          className="cover-image"
          style={{ backgroundImage: `url(${animeInfo?.cover})` }}
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
                  {animeInfo?.title?.native && (
                    <div className="title_jp">
                      {animeInfo?.title?.native} || &nbsp;
                    </div>
                  )}
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
                    <PlaylistPlayIcon /> &nbsp;
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
                      (item) => item && <Chip label={item} color="secondary" />
                    )}
                </div>
                {/* <div className="studio" title='Studio'>
                  {animeInfo?.studios?.[0]}
                </div> */}
              </div>
            )}
          </div>
        </div>
        <div className="genres"></div>
      </div>
      {/* <div className="player">
        <ReactPlayer
          className="react-player"
          url={
            "https://cache.387e6278d8e06083d813358762e0ac63.com/ca3c8540-7bee-11ed-91e1-80615f085c1a.m3u8?videoid=222956098130"
          }
          // file={}
          width="100%"
          height="100%"
          controls={true}
          light={true}
        />
      </div> */}
    </div>
  );
}

export default Player;
