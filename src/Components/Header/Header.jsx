import React from 'react';
import './Header.scss';

function Header() {
  return (
    <div className='header'>
      <div className="header_logo">Animanga</div>
      <div className='header_nav'>
        <div className='header_nav-links'>
          Anime
        </div>
        <div className='header_nav-links'>
          Manga
        </div>
      </div>
    </div>
  )
}

export default Header