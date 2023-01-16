import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useRef } from "react";

function Reader() {
  const meta = useOutletContext();
  const [chapter, setChapter] = useState(null);
  const [chap, setChap] = useState(null);
  const [loading, setLoading] = useState(false);
  const viewRef = useRef();
  const pageRef = useRef();
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };
  const observer = new IntersectionObserver(
    (entries, observer) => handleLazyLoad(entries, observer),
    options
  );

  const loadImage = (element) => {
    let src = element?.getAttribute("data-src");
    element.src = src;
  }

  const handleLazyLoad = (items, observer) => {
    // console.log("Lazy loading--->", items);
    items?.forEach(item => {
      if (item?.isIntersecting) {
        loadImage(item?.target?.children?.[0]);
        observer.unobserve(item.target)
      }
    })
  };

  const handleChapterFetch = (event) => {
    setChap(event.target?.value);
    setLoading(true);
    let url = `https://api.consumet.org/manga/${meta?.provider}/read/${event.target?.value?.id}`;
    if (meta.provider === "mangahere") {
      url = `https://api.consumet.org/manga/mangahere/read?chapterId=${event.target?.value?.id}`;
    }
    axios
      .get(url)
      .then((res) => {
        if (meta.provider !== "mangahere") setChapter(res.data);
        else promisifyAll(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const promisifyAll = (items) => {
    Promise.all(
      items?.map((item) =>
        axios.get(
          `https://api.consumet.org/utils/image-proxy?url=${item.img}&referer=${item.headerForImage.Referer}`
        )
      )
    ).then((res) => setChapter(res.data));
  };

  const handleLeft = () => {
    viewRef.current.scrollLeft -=
      pageRef?.current?.previousSibling?.offsetWidth * 2;
  };

  const handleRight = () => {
    viewRef.current.scrollLeft +=
      pageRef?.current?.previousSibling?.offsetWidth * 2;
  };

  useEffect(() => {
    if (chap && viewRef?.current && pageRef.current) {
      [...viewRef?.current?.children]?.slice(
        1,
        [...viewRef?.current?.children]?.length - 1
      ).forEach(item => observer.observe(item))
    }
  }, [chap, viewRef?.current, pageRef?.current]);

  return (
    <div className="reader_container">
      <div className="chapters-drop">
        <div className="head">Select Chapter: &nbsp;</div>
        <FormControl sx={{ m: 1 }}>
          <Select
            id="chapter-selector"
            value={chap}
            onChange={handleChapterFetch}
            label="Chapter(s)"
            input={<OutlinedInput label="Chapter(s)" />}
            // fullWidth
            placeholder="Chapter(s)"
          >
            {meta?.mangaDetails?.chapters?.map((item, key) => {
              return (
                <MenuItem value={item} key={key}>
                  <div
                    className="dr_header"
                    style={{
                      color: "white",
                    }}
                  >
                    {item?.title}
                  </div>
                  <div className="sub-header">
                    {item?.releasedDate ?? "Pages - " + item?.pages}
                  </div>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      {/* <aside className="chapters">
        <div className="left-top-panel">
          <div className="ch_header">Chapters:</div>
          <div className="collapse">
            <KeyboardDoubleArrowLeftIcon />
          </div>
          <div className="expand"><KeyboardDoubleArrowRight/></div>
        </div>
        <div className="container">
          {meta?.mangaDetails?.chapters?.map((item, key) => {
            return (
              <div
                className={`ch_btn ${"ch_" + key}`}
                id={`${item?.id}`}
                onClick={() => handleChapterFetch(item)}
              >
                <div className="title">{item?.title}</div>
                <div className="date">
                  {item?.releasedDate ?? "Pages - " + item?.pages}
                </div>
              </div>
            );
          })}
        </div>
      </aside> */}
      {!loading ? (
        <div className="view_cont">
          <div className="viewer" ref={viewRef}>
            {chap && (
              <div className="left-btn" onClick={handleLeft}>
                <span>Left</span>
              </div>
            )}
            {chapter?.map((item, key) => {
              return (
                <div
                  className={`pages page_${item?.page}`}
                  // style={{ backgroundImage: `url(${item.img})` }}
                  ref={pageRef}
                  key={key}
                >
                  <img className="images" data-src={item.img} />
                </div>
              );
            })}
            {chap && (
              <div className="right-btn" onClick={handleRight}>
                <span>Right</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="loader">
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
        </div>
      )}
    </div>
  );
}

export default Reader;
