import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleSearch = () => {
    navigate(`search`);
  };

  useEffect(() => {
    if (location?.pathname) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location?.pathname]);

  return (
    <div className="header">
      <div className="header_logo">
        <Link to={"/"} className="link">
          Animanga
        </Link>
      </div>
      <div
        className="header_nav"
        // style={{ display: toggleClass ? `none` : "" }}
      >
        <div className="header_nav-links">
          <NavLink to={"anime"} className="link">
            Anime
          </NavLink>
        </div>
        <div className="header_nav-links">
          <NavLink end={true} to={"manga"} className="link">
            Manga
          </NavLink>
        </div>
      </div>
      <div className="search">
        <span
          className="search-icon"
          // style={{ display: toggleClass ? `none` : "" }}
        >
          <SearchIcon onClick={handleSearch} />
        </span>
        {/* <div
          className="search-icon"
          style={{ display: !toggleClass ? `none` : "" }}
        >
          <CloseIcon onClick={handleSearch} />
        </div> */}
      </div>
    </div>
  );
}

export default Header;
