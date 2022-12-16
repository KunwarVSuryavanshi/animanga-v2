import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { cleanHTML } from "../../Common/utils";
import "./BannerCarousel.scss";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
function Carousel(props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  let interval = useRef();

  useEffect(() => {
    let temp = index; // Closure beesh :P
    interval.current = setInterval(() => {
      if (!paused) {
        if (temp < props.data.length - 1) {
          temp++;
          setIndex((prev) => prev + 1);
        } else {
          temp = 0;
          setIndex(0);
        }
      }
    }, 600000);
    return () => {
      clearInterval(interval.current);
    };
  }, [props?.data?.length,paused]);

  return (
    <>
      {props?.data?.map((item, key) => {
        return (
          <div
            className={`container ${key !== index ? "hide_img" : "show_img"}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="container_gradient">
              <div
                className={`container_img`}
                style={{
                  backgroundImage: `url(${item?.bannerImage ?? item?.coverImage?.extraLarge})`,
                }}
              ></div>
            </div>
            <div className="description">
              <div className="description_title">
                {item?.title?.english ?? item?.title?.romaji}
              </div>
              <div className="description_epDetails">
                <div className="description_epDetails-cat">{item?.format}</div>
                <div>
                  <span>
                    <PlaylistPlayIcon />
                  </span>
                  {item?.episodes} Episodes
                </div>
                <div>
                  <span>
                    <AccessTimeIcon />
                  </span>
                  {item?.duration} mins
                </div>
                <div>
                  <span>
                    <ThumbUpOffAltIcon />
                  </span>
                  {item?.averageScore / 10}
                </div>
              </div>
              <div className="description_about">
                {item?.description?.length > 400
                  ? cleanHTML(item.description.slice(0, 400)) + "..."
                  : cleanHTML(item.description)}
              </div>
              <div className="btn">
                <Button
                  variant="outlined"
                  className="btn_mui"
                  sx={{ border: "2px solid #1976d280" }}
                >
                  <PlayCircleOutlineIcon /> Watch now
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Carousel;
