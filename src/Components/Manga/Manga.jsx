import React, { useEffect, useRef, useState } from "react";
import "./Manga.scss";
import { fetchtopManga } from "../../app/feature/topManga.slice";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import { getRandomeColor } from "../../Common/utils";

function Manga() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  let timer;
  const { topManga } = useSelector((state) => {
    return {
      topManga: state.topManga,
    };
  });
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };
  const observer = new IntersectionObserver(handleDebounce, options);
  const mangaRef = useRef();

  const handleCardHover = (item, e) => {
    e.stopPropagation();
    if (e.target.getAttribute("name") === "child") {
      e.target.parentElement.style.border = `3px solid ${
        item?.coverImage?.color ?? item?.color ?? getRandomeColor()
      }`;
    } else if (e.target.getAttribute("name") === "parent") {
      e.target.style.border = `3px solid ${
        item?.coverImage?.color ?? item?.color ?? getRandomeColor()
      }`;
    }
  };

  const handleMouseLeave = (e) => {
    // e.stopPropagation();
    if (e.target.getAttribute("name") === "child") {
      e.target.parentElement.style.border = `3px solid transparent`;
    } else if (e.target.getAttribute("name") === "parent") {
      e.target.style.border = `3px solid transparent`;
    }
  };

  function handleDebounce() {
    if (mangaRef?.current) {
      console.log('Timer--->', timer)
      clearTimeout(timer);
      timer = setTimeout(handleObserver, 5000);
    }
  }

  function handleObserver(e, obs) {
    // dispatch(fetchtopManga(page));
    setPage(prev => prev + 1);
    console.log("Handle observer called--------------\n Will \ncall \nAPI \nhere");
  }

  useEffect(() => {
    if (!topManga?.response) {
      dispatch(fetchtopManga(page));
    }
  }, []);

  useEffect(() => {
    if (mangaRef.current) observer.observe(mangaRef?.current);
  }, [mangaRef.current]);

  return (
    <div className="manga_root">
      {/* <div className="icon">
        <EngineeringIcon />
      </div>
      <div className="text">Still Under development. &#128517;</div> */}
      {topManga?.loading ? (
        <div style={{ position: "sticky", top: "8vh", height: "100vh" }}>
          <LinearProgress color="primary" />
        </div>
      ) : (
        <>
          {topManga?.response?.Page?.media?.length > 0 && (
            <>
              <div className="cards">
                {topManga?.response?.Page?.media?.map((item, key) => {
                  return (
                    <div
                      name="parent"
                      className="card_wrap"
                      onMouseOver={(e) => handleCardHover(item, e)}
                      onMouseLeave={(e) => handleMouseLeave(e)}
                    >
                      <div
                        name="child"
                        className="image"
                        style={{
                          backgroundImage: `url(${
                            item?.coverImage?.extraLarge ??
                            item?.coverImage?.large
                          })`,
                        }}
                      ></div>
                      <div name="child" className="title">
                        {item?.title?.romaji ?? item?.title?.english}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div ref={mangaRef}>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Manga;
