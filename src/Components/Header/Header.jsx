import React, { useContext, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { supabase } from '../../config/supabase';
import { AuthContext } from '../../Common/AuthContext';
import { Fade, Popover, Tooltip } from '@mui/material';

function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const userData = useContext(AuthContext);
	const [profileModal, setProfileModal] = useState(false);

	const handleLogin = () => {
		navigate('/login');
	};

	const handleSearch = () => {
		navigate(`search`);
	};

	const handlePopper = (event) => {

	}

	useEffect(() => {
		if (location?.pathname) {
			window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		}
	}, [location?.pathname]);

	console.log('Info--->', userData);
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
				{userData?.data?.user?.aud === 'authenticated' ? (
					<span
						className='avatar'
						onClick={handlePopper}
					>
						{/* <Tooltip
							PopperProps={{
								disablePortal: true,
							}}
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							onClose={() => setProfileModal(false)}
							open={profileModal}
							title='Add'
						> */}
						<Avatar
							alt={userData?.data?.user?.user_metadata?.full_name}
							src={userData?.data?.user?.user_metadata?.avatar_url}
							sx={{ width: 30, height: 30 }}
						/>
						{/* </Tooltip> */}
					</span>
				) : (
					<span className='signin' onClick={handleLogin}>
						Sign In
					</span>
				)}
				{/* <div
          className="search-icon"
          style={{ display: !toggleClass ? `none` : "" }}
        >
          <CloseIcon onClick={handleSearch} />
        </div> */}
			</div>
			<Popover
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				The content of the Popover.
			</Popover>
		</div>
	);
}

export default Header;
