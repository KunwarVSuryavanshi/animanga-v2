import { Chip, LinearProgress } from "@mui/material";
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
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

function Player() {
  const { epInfo } = useParams();
  const [animeInfo, setAnimeInfo] = useState(null);
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  useEffect(() => {
    if (epInfo) {
      axios
        .get(`https://api.consumet.org/meta/anilist/info/${epInfo}`)
        .then((res) => setAnimeInfo(res.data));
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [epInfo]);

  return (
    <div className="player_root">
      {console.log(animeInfo)}
      {!animeInfo ? (
        <div style={{ position: "sticky", top: "8vh" }}>
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
          <div className="genres"></div>
        </div>
      )}
      <div className="episodes">
        <div className="title">Episodes</div>
        <div className="ep-list">
          {animeInfo?.episodes?.map((item, key) => {
            return (
              <div className="ep_card" key={item?.number}>
                <div
                  className="ep_image"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <PlayCircleOutlineIcon />
                </div>
                <div className="ep_no">Episode - {item?.number ?? key+1}</div>
                <div className="ep_name">{item.title}</div>
              </div>
            );})}
        </div>
      </div>
    </div>
  );
}

export default Player;
