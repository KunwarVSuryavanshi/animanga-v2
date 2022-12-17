import React from 'react'
import EngineeringIcon from "@mui/icons-material/Engineering";
import SickIcon from "@mui/icons-material/Sick";
import './Manga.scss'

function Manga() {
  return (
    <div className='manga_root'>
      <div className='icon'>
        <EngineeringIcon/>
      </div>
      <div className='text'>
        Still Under development. <SickIcon/>
      </div>
    </div>
  )
}

export default Manga