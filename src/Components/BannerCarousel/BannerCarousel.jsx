import React, { useEffect } from "react";
import "./BannerCarousel.scss";

function Carousel(props) {
  useEffect(() => {});

  return (
    <>
      {props?.data?.map((item, key) => {
        return (
          <div className={`container `}>
            <img
              className={`container_img`}
              src={item?.images?.jpg?.large_image_url}
            />
            <div>Hello</div>
          </div>
        );
      })}
    </>
  );
}

export default Carousel;
