import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from 'react';

function Header() {
  const [toggleClass, setToggleClass] = useState(false);
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleSearch = () => {
    setToggleClass(!toggleClass)
  }

  const handleClick = () => {
    if(searchText.trim()?.length > 0)
    navigate(`search/${searchText}`)
  }

  useEffect(() => {
    if (location?.pathname) {
      console.log(location)
      window.scroll({top: 0, left: 0, behavior: 'smooth'})
    }
  }, [location?.pathname])
  
  return (
    <div className="header">
      <div className="header_logo">
        <Link to={"/"} className="link">
          Animanga
        </Link>
      </div>
      <div
        className="header_nav"
        style={{ display: toggleClass ? `none` : "" }}
      >
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
      <div className="search">
        <span className={`search-bar ${toggleClass ? `display_bar` : ""}`}>
          <TextField
            value={searchText}
            onChange={handleChange}
            placeholder="Search Anime/Manga"
            focused
          />
          <Button
            variant="contained"
            onClick={handleClick}
            disableElevation={true}
          >
            Search
          </Button>
        </span>
        <span
          className="search-icon"
          style={{ display: toggleClass ? `none` : "" }}
        >
          <SearchIcon onClick={handleSearch} />
        </span>
        <div
          className="search-icon"
          style={{ display: !toggleClass ? `none` : "" }}
        >
          <CloseIcon onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
}

export default Header