import React from 'react'
import './Slider.scss';

function Slider(props) {
  return (
    <div className='slider_root'>
      <div className='slider_title'>
        {props.title}
      </div>
      <div className='slider_container'>
        {props.data?.map((item, key) => {
          return (
            <div className={`card card_${key}`}>
              <div
                className="card_image"
                style={{
                  backgroundImage: `url(${
                    item?.coverImage?.large ?? item?.coverImage?.medium
                  })`,
                }}
              />
              <div title={`${item?.title?.romaji}`} className='card_title'>{item?.title?.english ?? item?.title?.romaji}</div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Slider