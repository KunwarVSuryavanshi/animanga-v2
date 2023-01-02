import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearSearchData,
  searchAnimes,
} from "../../app/feature/searchAnime.slice";
import "./SearchPage.scss";

function SearchPage() {
  const param = useParams();
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.searchedAnime);
  useEffect(() => {
    if (param?.id) {
      dispatch(searchAnimes({ page: 1, perPage: 50, text: param.id }));
    }
    return (() => {
      dispatch(clearSearchData())
    })
  }, [param?.id]);

  return (
    <div>
      {searchResult?.list?.Page?.media?.length > 0 ? (
        <div className="cards">
          {searchResult?.list?.Page?.media?.map((item, key) => {
            return (
              <div className="card_wrap">
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
        <div className="no_result">
          The term you searched, didn't bring up anything :/
        </div>
      )}
    </div>
  );
}

export default SearchPage;
