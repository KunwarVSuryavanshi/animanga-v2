import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import Slider from "../../Slider/Slider";
import { cleanHTML } from "../../../Common/utils";
import { Chip, Rating } from "@mui/material";
import TrendingUp from "@mui/icons-material/TrendingUp";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import StyleIcon from "@mui/icons-material/Style";

function AboutManga() {
  const meta = useOutletContext();
  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });

  return (
    <div className="about_manga_container">
      {/* {console.log("render", meta)} */}
      <div className="info">
        <div
          className="cover"
          style={{
            backgroundImage: `url(${meta?.mangaDetails?.image})`,
          }}
        ></div>
        <div className="detail">
          <div className="title" style={{ color: meta?.mangaDetails?.color }}>
            {meta?.mangaDetails?.title?.english ??
              meta?.mangaDetails?.title?.romaji}
          </div>
          <div className="wrapper">
            <div className="popularity">
              <span>
                <TrendingUp />
              </span>
              {formatter.format(meta?.mangaDetails?.popularity)}
            </div>
            <div className="rating">
              <span>
                {/* <StarBorderOutlined /> */}
                <Rating
                  name="read-only"
                  value={
                    isNaN(meta?.mangaDetails?.rating / 20)
                      ? 0
                      : meta?.mangaDetails?.rating / 20
                  }
                  readOnly
                  precision={0.1}
                />
              </span>
              {isNaN(meta?.mangaDetails?.rating / 20)
                ? "NA"
                : meta?.mangaDetails?.rating / 20}
            </div>
            <div className="status">{meta?.mangaDetails?.status}</div>
          </div>
          <div className="genres">
            {meta?.mangaDetails?.genres
              ?.slice(0, 6)
              ?.map((item, key) => item && <Chip label={item} key={key} color="secondary" />)}
          </div>
          <div className="description">
            {cleanHTML(meta?.mangaDetails?.description)}
          </div>
        </div>
      </div>
      {meta?.mangaDetails?.characters?.length > 0 && (
        <div className="characters">
          <Slider
            title={"Characters"}
            data={meta?.mangaDetails?.characters}
            icon={<TheaterComedyIcon />}
          />
        </div>
      )}
      {meta?.mangaDetails?.relations?.length > 0 && (
        <div className="characters">
          <Slider
            title={"Relations"}
            data={meta?.mangaDetails?.relations}
            icon={<StyleIcon />}
            related={true}
            redirect={true}
          />
        </div>
      )}
      {meta?.mangaDetails?.recommendations?.length > 0 && (
        <div className="characters">
          <Slider
            title={"Recommendation"}
            data={meta?.mangaDetails?.recommendations}
            icon={<LightbulbIcon />}
            redirect={true}
          />
        </div>
      )}
    </div>
  );
}

export default AboutManga;
