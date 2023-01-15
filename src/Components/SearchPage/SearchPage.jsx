import { Button, LinearProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearSearchData,
  searchAnimes,
} from "../../app/feature/searchAnime.slice";
import { getRandomeColor } from "../../Common/utils";
import "./SearchPage.scss";

function SearchPage() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const searchResult = useSelector((state) => state.searchedAnime);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e?.target?.value, e?.key)
    if (e?.key === 'Enter') {
      handleClick()
    }
    setSearchText(e.target.value)
  };

  const handleRoute = (e, item) => {
    console.log(item)
    if (item.type === 'MANGA') {
      navigate(`/manga/${item.id}`)
    } else {
      navigate(`/watch/${item.id}`);
    }
  }
  
  
  const handleHover = (e, item) => {
    if (e.target?.parentElement?.getAttribute("name") === "card") {
      e.target.parentElement.style.border = `3px solid ${
        item?.coverImage?.color ?? item?.color ?? getRandomeColor()
      }`;
    } else if (e.target.getAttribute("name") === "card") {
      e.target.style.border = `3px solid ${
        item?.coverImage?.color ?? item?.color ?? getRandomeColor()
      }`;
    }
  };

  const handleMouseLeave = (e) => {
    if (e.target.getAttribute("name") === "card") {
      e.target.style.border = "3px solid transparent";
    } else if (e.target?.parentElement?.getAttribute("name") === "card") {
      e.target.parentElement.style.border = "3px solid transparent";
    }
  };

  const handleClick = () => {
    if (searchText.trim()?.length > 0) {
      dispatch(clearSearchData());
      dispatch(searchAnimes({ page: 1, perPage: 50, text: searchText }));
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div style={{ position: "sticky", height: "2vh" }}>
        {searchResult?.loading && <LinearProgress color="primary" />}
      </div>
      <div className={`search-bar display_bar`}>
        <TextField
          value={searchText}
          onChange={handleChange}
          placeholder="Search Anime/Manga"
          focused
          onKeyDown={handleChange}
        />
        <Button
          variant="contained"
          onClick={handleClick}
          disableElevation={true}
        >
          Search
        </Button>
      </div>
      {searchResult?.list?.Page?.media?.length > 0 ? (
        <div className="cards" name="container">
          {searchResult?.list?.Page?.media?.map((item, key) => {
            return (
              <div
                key={key}
                className="card_wrap"
                onMouseOver={(e) => handleHover(e, item)}
                onMouseLeave={(e) => handleMouseLeave(e)}
                name="card"
                onClick={(e) => handleRoute(e, item)}
              >
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${
                      item?.coverImage?.extraLarge ?? item?.coverImage?.large
                    })`,
                  }}
                ></div>
                <div className="title">
                  {item?.title?.romaji ?? item?.title?.english}
                </div>
                <div className="type">{item?.format}</div>
              </div>
            );
          })}
        </div>
      ) : (
        searchResult?.error && (
          <div className="no_result">
            The term you searched, didn't bring up anything :/
          </div>
        )
      )}
    </div>
  );
}

export default SearchPage;
