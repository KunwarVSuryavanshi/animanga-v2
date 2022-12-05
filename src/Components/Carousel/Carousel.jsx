import React from 'react'
import './Carousel.scss'

function Carousel(props) {
  return (
    <div className='container'>
      <img src={props?.item?.images?.jpg?.large_image_url} />
      <div>
        Hello
      </div>
    </div>
  );
}

export default Carousel