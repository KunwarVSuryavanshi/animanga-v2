import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";

function Reader() {
  const meta = useOutletContext();
  const [chapter, setChapter] = useState(null);
  const [chap, setChap] = useState(null);

  const handleChapterFetch = (event) => {
    console.log(event.target)
    // event.target.name = event.target.value.title
    setChap(event.target?.value);
    // let url = `https://api.consumet.org/manga/${meta?.provider}/read/${item.id}`
    // if (meta.provider === "mangahere") {
    //   url = `https://api.consumet.org/manga/mangahere/read?chapterId=${item.id}`;
    // }
    // axios.get(url)
    //   .then(res => {
    //     if(meta.provider !== 'mangahere')
    //       setChapter(res.data)
    //     else
    //       promisifyAll(res.data)
    //   })
    //   .catch(err => console.error(err));
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

  const handleLeft = () => {};

  const handleRight = () => {};
  // const
  // useEffect(() => {
  //   if (meta?.mangaDetails?.chapters) {

  //   }
  // },[meta?.mangaDetails?.chapters])

  return (
    <div className="reader_container">
      <div className="chapters-drop">
        <div className="head">
          Select Chapter:  &nbsp;
        </div>
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
                <MenuItem value={item?.title} key={key}>
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
      <div className="viewer">
        {console.log(chapter, meta)}
        <div className="left-btn" onClick={handleLeft}></div>
        {chapter?.map((item, key) => {
          return (
            <div
              className={`page page_${item?.page}`}
              // style={{ backgroundImage: `url(${item.img})` }}
            >
              <img src={item.img} />
            </div>
          );
        })}
        <div className="right-btn" onClick={handleRight}></div>
      </div>
    </div>
  );
}

export default Reader;
