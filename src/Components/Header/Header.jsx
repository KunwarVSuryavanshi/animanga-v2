import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import SearchIcon from "@mui/icons-material/Search";

function Header() {
  return (
    <div className="header">
      <div className="header_logo">
        <Link to={"/"} className="link">
          Animanga
        </Link>
      </div>
      <div className="header_nav">
        <div className="header_nav-links">
          <Link to={"anime"} className="link">
            Anime
          </Link>
        </div>
        <div className="header_nav-links">
          <Link to={"manga"} className="link">
            Manga
          </Link>
        </div>
      </div>
      <div className="searchbar"><SearchIcon/></div>
    </div>
  );
}

export default Header