import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import PersonPinIcon from '@mui/icons-material/PersonPin';

function Header() {
	const location = useLocation();
	const navigate = useNavigate();

	function stringToColor(string) {
		let hash = 0;
		let i;

		/* eslint-disable no-bitwise */
		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}

		let color = '#';

		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff;
			color += `00${value.toString(16)}`.slice(-2);
		}
		/* eslint-enable no-bitwise */

		return color;
	}

	function stringAvatar(name) {
		return {
			sx: {
				bgcolor: stringToColor(name),
			},
			children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
		};
	}

  const handleLoginModal = () => {
    navigate('/login')
  }

	const handleSearch = () => {
		navigate(`search`);
	};

	useEffect(() => {
		if (location?.pathname) {
			window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		}
	}, [location?.pathname]);

	return (
		<div className='header'>
			<div className='header_logo'>
				<Link to={'/'} className='link'>
					AniManga
				</Link>
			</div>
			<div
				className='header_nav'
				// style={{ display: toggleClass ? `none` : "" }}
			>
				<div className='header_nav-links'>
					<NavLink to={'anime'} className='link'>
						Anime
					</NavLink>
				</div>
				<div className='header_nav-links'>
					<NavLink end={true} to={'manga'} className='link'>
						Manga
					</NavLink>
				</div>
			</div>
			<div className='search'>
				<span
					className='search-icon'
					// style={{ display: toggleClass ? `none` : "" }}
				>
					<SearchIcon onClick={handleSearch} />
        </span>
        <span className='avatar' onClick={handleLoginModal}>
					{/* <Avatar sx={{ bgcolor: '#00a6ff63' }}>
						<PersonPinIcon />
					</Avatar> */}
          Sign In
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
