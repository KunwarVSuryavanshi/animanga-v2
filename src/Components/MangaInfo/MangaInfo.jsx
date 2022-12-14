import { LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import "./MangaInfo.scss";

function MangaInfo() {
  const param = useParams();
  const [mangaDetails, setMangaDetails] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (param?.id && !mangaDetails) {
      axios
        .get(
          `https://api.consumet.org/meta/anilist-manga/info/${param.id}?provider=mangakakalot`
        )
        .then((res) => setMangaDetails(res.data))
        .catch((err) => setError(err));
    }
  }, [param?.id]);

  return (
    <>
      {mangaDetails ? (
        <div>
          <div
            className="manga_banner"
            style={{
              // background: `linear-gradient(to bottom, rgb(0 0 0 / 42%) 90%,rgb(0 0 0)),
              background: `url(${mangaDetails?.cover}) no-repeat center / cover`,
            }}
          ></div>
          <div className="navbar">
            <div className="navbar_item about">
              <NavLink to={""} end={true}>
                About
              </NavLink>
            </div>
            <div className="navbar_item about">
              <NavLink to={"chapter"}>Chapters</NavLink>
            </div>
          </div>
          <div id="Manga_Outlet" className="manga-outlet">
            <Outlet context={{ mangaDetails }} />
          </div>
        </div>
      ) : error ? (
        <div className="error"></div>
      ) : (
        <div style={{ position: "sticky", top: "8vh", height: "100vh" }}>
          <LinearProgress color="primary" />
        </div>
      )}
    </>
  );
}

export default MangaInfo;
