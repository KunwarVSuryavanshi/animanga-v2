import { LinearProgress } from '@mui/material';
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import './MangaInfo.scss';

function MangaInfo() {
  const param = useParams()
  const [mangaDetails, setMangaDetails] = useState(null);

  useEffect(() => {
    if (param?.id && !mangaDetails) {
      axios
        .get(
          `https://api.consumet.org/meta/anilist-manga/info/${param.id}?provider=mangahere`
        )
        .then((res) => setMangaDetails(res.data));
    }
  }, [param?.id])
  
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
              <Link to={""}>
                About
              </Link>
            </div>
            <div className="navbar_item about">
              <Link to={"chapter"}>Chapters</Link>
            </div>
          </div>
          <div id="Manga_Outlet" className="manga-outlet">
            <Outlet context={{mangaDetails}} />
          </div>
        </div>
      ) : (
        <div style={{ position: "sticky", top: "8vh", height: "100vh" }}>
          <LinearProgress color="primary" />
        </div>
      )}
    </>
  );
}

export default MangaInfo