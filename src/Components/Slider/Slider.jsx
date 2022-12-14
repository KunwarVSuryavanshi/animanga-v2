import React, { useRef, useState } from 'react'
import './Slider.scss';

function Slider(props) {
  // const [clickPos, setClickPos] = useState(null);
  const slideRef = useRef()
  // let pressed = false;

  // const handleMouseClick = (e) => { // Clicking
  //   console.log('Event', e.screenX)
  //   setClickPos(e.screenX)
  //   pressed = true;
  //   slideRef.current.style.cursor = 'grabbing'
  //   console.log(slideRef)
  // }

  // const handleMouseLeave = (e) => { // 
  //   // slideRef.current.style.cursor = "default";
  // }

  // const handleMouseEnter = (e) => { // Hover
  //     e.preventDefault();
  //     slideRef.current.style.cursor = "grab";
  // }

  // const handleMouseUp = (e) => { // Releasing click
  //   pressed = false;
  //   e.preventDefault();
  //   slideRef.current.style.cursor = "grab";
  // }

  // const handleMouseMove = (e) => {
    // if (!pressed) return;
    // e.preventDefault();
    // slideRef.current.style.cursor = "grabbing";
    // console.log(e.target.offsetLeft, clickPos, e.screenX,e)
    // slideRef.current.style.left = `${e.target.offsetLeft - clickPos}`;
    // slideRef.current.style.cursor = "default";
    // console.log(e, slideRef)
  // }

  // const handleClick = (e) => {
  //   console.log(
  //     "E---->",
  //     e.target.parentElement,
  //     e.target.parentElement.nextElementSibling,
  //     e
  //   );
  //   e.target.parentElement.parentElement.scrollRight = 200 + e.clientX;
  // }

  const handleHover = (e, item) => {
    if (e.target.getAttribute("name") === 'card') {
      e.target.style.border = `3px solid ${item?.coverImage?.color}`;
    }
  }

  const handleMouseLeave = (e) => {
    if (e.target.getAttribute("name") === "card") {
      e.target.style.border = "3px solid transparent";
    }
  };
  
  return (
    <div className='slider_root'>
      <div className='slider_title'>
        {props.title}
      </div>
      <div ref={slideRef} className='slider_container snaps-inline' name='container'> 
        {props.data?.map((item, key) => {
          return (
            <div
              // ref={cardRef}
              className={`card card_${key}`}
              >
              <div
                className="card_image"
                style={{
                  backgroundImage: `url(${
                    item?.coverImage?.extraLarge ??
                    item?.coverImage?.large ??
                    item?.image
                  })`,
                }}
                onMouseOver={(e) => handleHover(e, item)}
                onMouseLeave={(e) => handleMouseLeave(e)}
                name='card'
              >
                {props?.watch && (
                  <div className="rating">{item?.averageScore / 10}</div>
                )}
              </div>
              <div title={`${item?.title?.romaji}`} className="card_title">
                {item?.title?.english ?? item?.title?.romaji}
              </div>
              {/* {props.watch && (
                  <div className="details">
                    <span>{item?.type}</span>
                    <span style={{float: 'right'}}>{item?.totalEpisodes} Episodes</span>
                  </div>
                )} */}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Slider