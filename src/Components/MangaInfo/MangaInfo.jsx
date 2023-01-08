import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import './MangaInfo.scss';

function MangaInfo() {
  const param = useParams()
  const [mangaDetails, setMangaDetails] = useState(null);
  console.log(param)

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
    <div>
      {console.log(mangaDetails)}
      <div
        className="manga_banner"
        style={{
          // background: `linear-gradient(to bottom, rgb(0 0 0 / 42%) 90%,rgb(0 0 0)),
          background: `url(${mangaDetails?.cover}) no-repeat center`,
        }}
      ></div>
      <div className="navbar">
        <div className="navbar_item about">
          <Link to={""} state={{mangaDetails}}>About</Link>
        </div>
        <div className="navbar_item about">
          <Link to={"chapter"}>Chapters</Link>
        </div>
        <div className="navbar_item related">
          <Link to={"related"}>Related</Link>
        </div>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default MangaInfo