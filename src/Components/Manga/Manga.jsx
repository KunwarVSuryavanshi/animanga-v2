import React, { useEffect } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import "./Manga.scss";
import { fetchtopManga } from "../../app/feature/topManga.slice";
import { useDispatch, useSelector } from "react-redux";

function Manga() {
  const dispatch = useDispatch();
  const { topManga } = useSelector((state) => {
    return {
      topManga: state.topManga,
    };
  });
  useEffect(() => {
    if (!topManga?.response) {
      dispatch(fetchtopManga());
    }
  }, []);

  return (
    <div className="manga_root">
      {/* <div className="icon">
        <EngineeringIcon />
      </div>
      <div className="text">Still Under development. &#128517;</div> */}
      {topManga?.response?.Page?.media?.length > 0 &&
        <div className="cards">
          {topManga?.response?.Page?.media?.map((item, key) => {
            return (
              <div className="card_wrap">
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${item?.coverImage?.extraLarge ?? item?.coverImage?.large
                      })`,
                  }}
                ></div>
                <div className="title">
                  {item?.title?.romaji ?? item?.title?.english}
                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

export default Manga;
