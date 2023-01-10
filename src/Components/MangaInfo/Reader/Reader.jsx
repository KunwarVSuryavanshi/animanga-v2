import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

function Reader() {
  const meta = useOutletContext();
  
  const handleChapterFetch = (item) => {
    
  }
  
  // const
  // useEffect(() => {
  //   if (meta?.mangaDetails?.chapters) {
      
  //   }
  // },[meta?.mangaDetails?.chapters])

  return (
    <div className="reader_container">
      <aside className="chapters">
        <div className="ch_header">Chapters:</div>
        <div className="container">
          {meta?.mangaDetails?.chapters?.map((item, key) => {
            return (
              <div className={`ch_btn ${"ch_" + key}`} id={`${item?.id}`} onClick={() => handleChapterFetch(item)}>
                <div className="title">{item?.title}</div>
                <div className="date">{item?.releasedDate}</div>
              </div>
            );
          })}
        </div>
      </aside>
      <section className="viewer"></section>
    </div>
  );
}

export default Reader