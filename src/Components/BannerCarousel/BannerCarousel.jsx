import React, { useEffect, useRef, useState } from "react";
import "./BannerCarousel.scss";

function Carousel(props) {
  const [index, setIndex] = useState(0);
  let interval = useRef();

  useEffect(() => {
    let temp = 0; // Closure beesh :P
    interval.current = setInterval(() => {
      if (temp < props.data.length-1) {
        temp++;
        setIndex((prev) => prev + 1);
      }
      else {
        temp = 0;
        setIndex(0);
      }
    }, 5000);
    return () => {
      clearInterval(interval.current);
    };
  }, [props?.data?.length]);

  return (
    <>
      {console.log("Interval--->", interval, index)}
      {props?.data?.map((item, key) => {
        return (
          <div
            className={`container ${key !== index ? "hide_img" : "show_img"}`}
          >
            <div
              className="container_gradient"
              style={{
                background: "linear-gradient(90deg,rgba(0,0,0,.8),transparent)",
              }}
            >
              <div
                className={`container_img`}
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
