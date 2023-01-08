import React from 'react'
import { useLocation } from 'react-router-dom'
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import Slider from '../../Slider/Slider';

function AboutManga(props) {
  const meta = useLocation();

  return (
    <div>
      {console.log("ABOUT", meta.state.mangaDetails)}
      AboutManga
      
      {meta?.state?.mangaDetails?.characters && (
        <div className="characters">
          <Slider
            title={"Characters"}
            data={meta?.state?.mangaDetails?.characters}
            icon={<TheaterComedyIcon />}
          />
        </div>
      )}
    </div>
  );
}

export default AboutManga