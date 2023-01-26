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
	const { userInfo, setUserInfo } = useContext(AuthContext);
	const [anchor, setAnchor] = useState(null);
	const open = Boolean(anchor);
	const id = open ? 'simple-popover' : undefined;

	const handleLogin = () => {
		navigate('/login');
	};

	const handleSignOut = async () => {
		const data = await supabase.auth.signOut();
		setUserInfo(null);
		setAnchor(null);
	}

	const handleSearch = () => {
		navigate(`search`);
	};

	const handlePopperOpen = event => {
		setAnchor(event.currentTarget);
	};

	const handlePopperClose = () => {
		setAnchor(null);
	};

	useEffect(() => {
		if (location?.pathname) {
			window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		}
	}, [location?.pathname]);

	console.log('Info--->', userInfo);
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
				{userInfo?.data?.user?.aud === 'authenticated' ? (
					<span className='avatar' onClick={handlePopperOpen}>
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
							alt={userInfo?.data?.user?.user_metadata?.full_name}
							src={userInfo?.data?.user?.user_metadata?.avatar_url}
							sx={{ width: 35, height: 35 }}
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
				id={id}
				open={open}
				anchorEl={anchor}
				onClose={handlePopperClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<div className="pop-acc">
					<div>
						My Profile
					</div>
					<div onClick={handleSignOut}>
						Sign Out
					</div>
				</div>
			</Popover>
		</div>
	);
}

export default Header;
