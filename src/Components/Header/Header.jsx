import React, { useContext, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { supabase } from '../../config/supabase';
import { AuthContext } from '../../Common/AuthContext';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import logo from '../../assets/tv-logo.svg';

function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const { userInfo, setUserInfo } = useContext(AuthContext);
	const [anchor, setAnchor] = useState(null);
	const open = Boolean(anchor);
	const id = open ? 'account-popover' : undefined;
	const StyledBadge = styled(Badge)(({ theme }) => ({
		'& .MuiBadge-badge': {
			backgroundColor: '#44b700',
			color: '#44b700',
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			'&::after': {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				borderRadius: '50%',
				animation: 'ripple 1.2s infinite ease-in-out',
				border: '1px solid currentColor',
				content: '""',
			},
		},
		'@keyframes ripple': {
			'0%': {
				transform: 'scale(.8)',
				opacity: 1,
			},
			'100%': {
				transform: 'scale(2.4)',
				opacity: 0,
			},
		},
	}));

	const handleLogin = () => {
		navigate('/login');
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		setUserInfo(null);
		setAnchor(null);
	};

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

	return (
		<div className='header'>
			<div className='header_logo'>
				<Link to={'/'} className='link'>
					<img className='logo' src={logo} alt='AniManga-logo' />
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
						<StyledBadge
							overlap='circular'
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							variant='dot'
						>
							<Avatar
								alt={userInfo?.data?.user?.user_metadata?.full_name}
								src={userInfo?.data?.user?.user_metadata?.avatar_url}
								sx={{ width: 35, height: 35 }}
							/>
						</StyledBadge>
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
				<div className='pop-acc'>
					<div
						style={{
							// pointerEvents: 'none',
							cursor: 'not-allowed'
						}}
					>
						My Profile
					</div>
					<div onClick={handleSignOut}>Sign Out</div>
				</div>
			</Popover>
		</div>
	);
}

export default Header;
