import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAiringAnime } from '../../app/feature/airing.slice';
import CircularProgress from '@mui/material/CircularProgress';
import './HomePage.scss';
import BannerCarousel from '../BannerCarousel/BannerCarousel';
import { fetchUpcoming } from '../../app/feature/notAiring.slice';
import Slider from '../Slider/Slider';
// import { airingToday } from "../../Common/queries";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { fetchtopAnime } from '../../app/feature/topAnime.slice';
import { supabase } from '../../config/supabase';
import { AuthContext } from '../../Common/AuthContext';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
} from '@mui/material';
import ReactPlayer from 'react-player';
import axios from 'axios';

function HomePage() {
	const dispatch = useDispatch();
	const { airingAnimeResponse, upcomingAnime, topAnime } = useSelector(
		state => {
			return {
				airingAnimeResponse: state.airingAnime,
				upcomingAnime: state.notAiring,
				topAnime: state.topAnime,
			};
		}
	);
	const [watchList, setWatchList] = useState(null);
	const { userInfo: userMeta } = useContext(AuthContext);
	const [openModal, setOpenModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [sources, setSources] = useState(null);
	const [animeInfo, setAnimeInfo] = useState(null);
	const [playEp, setPlayEp] = useState(null);
	const [quality, setQuality] = useState(null);
	const playerRef = useRef(null);
	const timeRef = useRef(null);

	const openPlayer = (item, flag = true) => {
		setPlayEp(null);
		setLoading(true);
		if (flag)
			axios
				.get(
					`https://${import.meta.env.VITE_SECONDARY_API}/meta/anilist/info/${
						item?.aniListId
					}`
				)
				.then(res => setAnimeInfo(res.data))
				.catch(err => {
					console.error('Error with API call--->', err);
				});
		axios
			.get(
				`https://${import.meta.env.VITE_SECONDARY_API}/meta/anilist/watch/${
					item?.epDetails?.id ?? item?.id
				}`
			)
			.then(res => {
				setSources(res?.data?.sources);
				if (!quality) {
					setQuality(
						res?.data?.sources?.filter(item => item?.quality === '1080p')?.[0]
							?.url
					);
				}
				timeRef.current = item?.epDetails?.time;
				setLoading(false);
			});
		setPlayEp(item);
		setOpenModal(true);
	};

	const handleQualityChange = item => {
		setQuality(item?.target?.value);
	};

	const handleClose = () => {
		handleWatchList();
		setPlayEp(null);
		setSources(null);
		setQuality(null);
		setOpenModal(false);
	};

	const handleWatchList = async () => {
		if (userMeta?.data?.user?.id) {
			await supabase.from(import.meta.env.VITE_ANIME_TABLE).upsert(
				{
					email: userMeta?.data.user.email,
					epDetails: {
						id: playEp?.id ?? playEp?.epDetails?.id,
						image: playEp?.image ?? playEp?.epDetails?.image,
						title: playEp?.title ?? playEp?.epDetails?.title,
						number: playEp?.number ?? playEp?.epDetails?.number,
						time: Math.round(
							playerRef?.current?.getCurrentTime() ??
								playEp?.time ??
								playEp?.epDetails?.time ??
								0
						),
					},
					aniListId: +animeInfo?.id,
					ani_user_id: `${animeInfo?.id}_${userMeta?.data.user.email}`,
				},
				{ onConflict: 'ani_user_id' }
			);
		}
	};

	const handleStart = () => {
		playerRef?.current?.seekTo(timeRef?.current ?? 0, 'seconds');
	};

	const getUserData = async () => {
		let { data, error } = await supabase
			.from('animeWatchList')
			.select('aniListId, epDetails');
		if (error) {
			console.error('Error while fetching user details--->', error);
		} else {
			setWatchList(data);
		}
	};

	useEffect(() => {
		if (!airingAnimeResponse?.response && !airingAnimeResponse?.hasError) {
			dispatch(fetchAiringAnime());
		}
		if (!upcomingAnime.response && !upcomingAnime?.hasError) {
			dispatch(fetchUpcoming());
		}
		if (!topAnime.response && !topAnime?.hasError) {
			dispatch(fetchtopAnime());
		}
	}, []);

	useEffect(() => {
		if (userMeta?.data?.user) {
			getUserData();
		}
	}, [userMeta?.data?.user]);

	return (
		<>
			<div className='banner'>
				{airingAnimeResponse.loading ? (
					<div className='progress'>
						<CircularProgress />
					</div>
				) : airingAnimeResponse.hasError ? (
					<div>Oooops something went wrong</div>
				) : (
					<div className='carousel_container'>
						<BannerCarousel
							data={airingAnimeResponse?.response?.data?.Page?.media?.slice(
								0,
								20
							)}
						/>
					</div>
				)}
			</div>

			{/* ------------------------------Continue Watching section---------------------- */}
			{watchList && (
				<div className='episodes_'>
					{watchList?.length > 0 && (
						<div className='title'>
							<LiveTvIcon /> &nbsp;CONTINUE WATCHING
						</div>
					)}
					<div className='ep-list'>
						{watchList?.map((item, key) => {
							return (
								<div
									className='ep_card'
									key={key}
									onClick={() => openPlayer(item)}
								>
									<div
										className='ep_image'
										style={{
											backgroundImage: `url(${item?.epDetails?.image})`,
										}}
									>
										<div className='play'>
											<PlayCircleOutlineIcon />
										</div>
									</div>
									<div
										className='time-wrap'
										style={{
											display: 'flex',
											width: '100%',
											marginTop: '-0.5vh',
											backgroundColor: '#565f49',
											borderRadius: '10px',
											zIndex: '4',
										}}
									>
										<div
											className='time-line'
											style={{
												width: item?.epDetails?.time
													? `${(item?.epDetails?.time / 60) * 5}%`
													: '8px',
												backgroundColor: 'red',
												height: '0.5vh',
												borderRadius: '10px',
											}}
										></div>
									</div>
									<div className='ep_no'>
										Episode - {item?.epDetails?.number ?? key + 1}
									</div>
									<div className='ep_name'>{item?.epDetails?.title}</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
			{/* ------------------------------ UPCOMING --------------------------------------- */}
			<div className='sliderr'>
				<Slider
					title={'UPCOMING'}
					data={upcomingAnime?.response?.Page?.media}
					icon={<AutoAwesomeIcon />}
					trailer={true}
				/>
			</div>
			{/* ------------------------------ AIRING --------------------------------------- */}
			<div className='sliderr airing'>
				<Slider
					title={'AIRING'}
					data={airingAnimeResponse?.response?.data?.Page?.media}
					watch={true}
					icon={<SatelliteAltIcon />}
				/>
			</div>
			{/* ------------------------------ ALL TIME TOP --------------------------------------- */}
			<div className='sliderr top'>
				<Slider
					title={'ALL TIME TOP'}
					data={topAnime?.response?.Page?.media}
					watch={true}
					icon={<TrendingUpIcon />}
				/>
			</div>
			<Modal
				aria-labelledby='spring-modal-title'
				aria-describedby='spring-modal-description'
				open={openModal}
				onClose={handleClose}
				closeAfterTransition
				id='player'
			>
				<div className='modal_root'>
					<svg
						className={`spinner ${!loading && 'hidden'}`}
						viewBox='0 0 24 24'
					>
						<path
							d='M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z'
							opacity='.25'
						/>
						<path
							d='M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z'
							className='path'
						/>
					</svg>
					<ReactPlayer
						className='react-player'
						url={`https://m3u8proxy.counterstrike828.workers.dev/?url=
							${
								quality ??
								sources?.filter(item => item.quality === '1080p')?.[0]?.url ??
								sources?.[0]?.url
							}`}
						// file={}
						ref={playerRef}
						width='100%'
						height='100%'
						controls={true}
						// light={playEp?.image} // replace with image tag
						// playIcon={
						//   <div className="play-icon">
						//     <PlayCircleOutlineIcon />
						//   </div>
						// }
						onReady={() => props?.setLoading(false)}
						// playIcon={loading ? <></> : null}
						// onBuffer={() => setLoading(true)}
						// onBufferEnd={() => setLoading(false)}
						playing={true}
						onStart={handleStart}
						volume={0.5}
						pip={true}
					></ReactPlayer>
					<div className={`quality ${loading && 'hidden'}`}>
						<FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
							<InputLabel id='select-filled-label' style={{ color: 'white' }}>
								Quality
							</InputLabel>
							<Select
								labelId='quality-select'
								id='quality-select'
								value={
									quality ??
									sources?.filter(item => item.quality === '1080p')?.[0]?.url ??
									sources?.[0]?.url
								}
								label='Quality'
								onChange={handleQualityChange}
								style={{ color: 'white' }}
							>
								{sources?.map(item => {
									return (
										<MenuItem value={item?.url} key={item?.quality}>
											{item?.quality}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</div>
					<div className={`player-ep ${loading && 'hidden'}`}>
						{animeInfo?.episodes?.length > 0 && (
							<div className='eplist'>
								{animeInfo?.episodes?.map((item, key) => {
									return (
										<>
											<div
												className={`ep_no ${
													key + 1 ===
													watchList?.filter(
														item => +item?.aniListId === +animeInfo?.id
													)?.[0]?.epDetails?.number
														? 'currentEp'
														: ''
												}
												${
													key + 1 <=
													watchList?.filter(
														item => +item?.aniListId === +animeInfo?.id
													)?.[0]?.epDetails?.number
														? 'watched'
														: ''
												}`}
												key={item?.number + '_list'}
												onClick={() => openPlayer(item, false)}
											>
												{item?.number ?? key + 1}
											</div>
										</>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</Modal>
		</>
	);
}

export default HomePage;
