import React, { useEffect } from "react";
import "./BannerCarousel.scss";

function Carousel(props) {
  useEffect(() => {});

  return (
    <>
      {props?.data?.map((item, key) => {
        return (
          <div className={`container`}>
            <div className="container_gradient"
              style={{
                background: "linear-gradient(90deg,rgba(0,0,0,.8),transparent)",
              }}
            >
              <div
                className="container_img"
                style={{ backgroundImage: `url(${item?.cover})` }}
              ></div>
            </div>
            <div className="description">
              alkfsa sflkasf laksfnalks alskgnas galkgsa slgkas glaksg alskg
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Carousel;
