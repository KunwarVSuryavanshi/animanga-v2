import {
	Alert,
	Chip,
	FormControl,
	InputLabel,
	LinearProgress,
	MenuItem,
	Modal,
	Select,
	Snackbar,
	TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import './WatchPage.scss';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TableRowsIcon from '@mui/icons-material/TableRows';
import CellTowerIcon from '@mui/icons-material/CellTower';
import { cleanHTML, secondsToDhms } from '../../Common/utils';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Slider from '../Slider/Slider';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import StyleIcon from '@mui/icons-material/Style';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import NotFound from '../NotFound/NotFound';
import Timer from '../Timer/Timer';
import { AuthContext } from '../../Common/AuthContext';
import { supabase } from '../../config/supabase';

function WatchPage() {
	const { epInfo } = useParams();
	const [animeInfo, setAnimeInfo] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [playEp, setPlayEp] = useState(null);
	const [sources, setSources] = useState(null);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState(false);
	const [ep, setEp] = useState('');
	const [quality, setQuality] = useState('');
	const { userInfo: userMeta } = useContext(AuthContext);
	const [adBlocker, setAdBlocker] = useState(false);
	const [open, setOpen] = useState(false);
	const [epTitle, setEpTitle] = useState('');
	// const [epWatched, setEpWatched] = useState(null);
	// const [buffering, setLoading] = useState(true);
	const [referer, setReferer] = useState('');
	const volume = useRef(0.5);
	const formatter = Intl.NumberFormat('en', { notation: 'compact' });
	const playerRef = useRef(null);
	const epRef = useRef(null);

	const openPlayer = item => {
		console.log('Item---->', item);
		setLoading(true);
		setEpTitle(item?.number + ' - ' + item?.title);
		axios
			.get(
				`https://${import.meta.env.VITE_SECONDARY_API}/meta/anilist/watch/${
					item?.id
				}`
			)
			.then(res => {
				setSources(res?.data?.sources);
				setReferer(res?.data?.headers?.Referer);
				setLoading(false);
				setQuality(
					res?.data?.sources?.filter(item => item.quality === '1080p')?.[0]?.url
				);
			})
			.catch(err => {
				let episodeNo = +item?.id.replace(/^\D+/g, '');
				axios
					.get(
						`https://${
							import.meta.env.VITE_SECONDARY_API
						}/meta/anilist/info/${epInfo}?provider=zoro`
					)
					.then(res => {
						setAnimeInfo(res.data);
						return res;
					})
					.then(res => {
						return axios.get(
							`https://${
								import.meta.env.VITE_SECONDARY_API
							}/meta/anilist/watch/${
								res?.data?.episodes?.[episodeNo - 1]?.id
							}?provider=zoro`
						);
					})
					.then(res => {
						setSources(res?.data?.sources);
						setReferer(res?.data?.headers?.Referer);
						setLoading(false);
						setQuality(
							res?.data?.sources?.filter(item => item.quality === '1080p')?.[0]
								?.url
						);
					});
			});
		setPlayEp(item);
		setOpenModal(true);
	};

	const handleClose = () => {
		handleWatchList();
		setPlayEp(null);
		setOpenModal(false);
	};

	const handleClosePopUp = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleQualityChange = item => {
		setQuality(item?.target?.value);
	};

	const handleEpNav = e => {
		let val = +e.target.value;
		if (val <= animeInfo?.episodes?.length && val >= 0) {
			setEp(val);
		}
	};

	const handleScroll = e => {
		const key = e.key;
		if (ep > 0) {
			if (key === 'Backspace' || key === 'Delete') {
				epRef.current.scrollLeft = 0;
			} else if (key === 'Enter') {
				// epRef.current.scrollLeft = 0;
				epRef.current.scrollLeft +=
					epRef?.current?.lastChild?.offsetWidth * (ep - 1);
				setEp('');
			}
		} else {
			epRef.current.scrollLeft = 0;
		}
	};

	const handleWatchList = async () => {
		if (userMeta?.data?.user?.id) {
			await supabase.from(import.meta.env.VITE_ANIME_TABLE).upsert(
				{
					email: userMeta?.data.user.email,
					epDetails: {
						id: playEp?.id,
						image: playEp?.image,
						title: playEp?.title,
						number: playEp?.number,
						time: Math.round(playerRef?.current?.getCurrentTime()),
					},
					aniListId: epInfo,
					ani_user_id: `${epInfo}_${userMeta?.data.user.email}`,
				},
				{ onConflict: 'ani_user_id' }
			);
		}
	};

	useEffect(() => {
		if (epInfo && !animeInfo) {
			axios
				.get(
					`https://${
						import.meta.env.VITE_SECONDARY_API
					}/meta/anilist/info/${epInfo}`
				)
				.then(res => setAnimeInfo(res.data))
				.catch(err => {
					console.error('Error with API call--->', err);
					setErr(true);
				});
			window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		}
		return () => {
			setAnimeInfo(null);
		};
	}, [epInfo]);

	// useEffect(() => {
	//   if (animeInfo?.nextAiringEpisode?.timeUntilAiring) {
	//     // setNextEpTimer(new Date(animeInfo?.nextAiringEpisode?.timeUntilAiring));
	//     startTimer(animeInfo?.nextAiringEpisode?.timeUntilAiring);
	//   }
	// }, [animeInfo])

	useEffect(() => {
		if (adBlocker) {
			console.log('Adblocker detected');
			setOpen(true);
		}
	}, [adBlocker]);

	return err ? (
		<NotFound noHeader={true} />
	) : (
		<div className='player_root'>
			{!animeInfo ? (
				<div style={{ position: 'sticky', top: '8vh', height: '100vh' }}>
					<LinearProgress color='primary' />
				</div>
			) : (
				<>
					<div className='details'>
						<div
							className='cover-image'
							style={{
								backgroundImage: `url(${
									animeInfo?.cover ??
									animeInfo?.coverImage?.extraLarge ??
									animeInfo?.coverImage?.large
								})`,
							}}
						>
							<div className='details_container'>
								<div className='banner'>
									<div
										className='banner_image'
										style={{ backgroundImage: `url(${animeInfo?.image})` }}
									/>
								</div>
								{animeInfo && (
									<div className='about'>
										<div className='title'>
											{/* {animeInfo?.title?.native && (
                          <div className="title_jp">
                            {animeInfo?.title?.native} || &nbsp;
                          </div>
                        )} */}
											{animeInfo?.title?.romaji ?? animeInfo?.title?.english}
										</div>
										<div className='anime_info'>
											<div className='type'>{animeInfo?.type}</div>
											<div className='score'>
												<ThumbUpOffAltIcon /> &nbsp;
												{animeInfo?.rating / 10 ?? 'NA'}
											</div>
											<div className='status'>
												<CellTowerIcon /> &nbsp;{animeInfo?.status}
											</div>
											<div className='ep_count'>
												<TableRowsIcon /> &nbsp;
												{animeInfo?.totalEpisodes}
											</div>
											<div className='duration'>
												<AccessTimeIcon /> &nbsp;
												{animeInfo?.duration}
											</div>
											<div className='popularity'>
												<TrendingUpIcon /> &nbsp;
												{formatter.format(animeInfo?.popularity)}
											</div>
										</div>
										<div className='description'>
											{cleanHTML(animeInfo?.description) ?? 'NA'}
										</div>
										{/* <div className="popularity">{animeInfo?.poularity}</div>*/}
										<div className='genres'>
											{animeInfo?.genres
												?.slice(0, 6)
												?.map(
													item =>
														item && (
															<Chip
																label={item}
																key={item + '_key'}
																color='secondary'
															/>
														)
												)}
										</div>
										{/* <div className="studio" title='Studio'>
                        {animeInfo?.studios?.[0]}
                      </div> */}
									</div>
								)}
							</div>
						</div>
					</div>

					{animeInfo?.nextAiringEpisode?.timeUntilAiring && (
						<div className='timer'>
							<Timer time={animeInfo?.nextAiringEpisode?.timeUntilAiring} />
						</div>
					)}
					<div className='character_slider'>
						<Slider
							title={'Characters'}
							data={animeInfo?.characters}
							icon={<TheaterComedyIcon />}
						/>
					</div>
					<div className='episodes'>
						{animeInfo?.episodes?.length > 0 && (
							<div className='title'>
								<span>
									<TableRowsIcon /> &nbsp;Episodes
								</span>
								<div className='text_field'>
									<TextField
										id='standard-basic'
										label='Go to'
										variant='standard'
										value={ep}
										type='number'
										onChange={handleEpNav}
										onKeyDown={handleScroll}
									/>
								</div>
							</div>
						)}
						<div className='ep-list' ref={epRef}>
							{animeInfo?.episodes?.map((item, key) => {
								return (
									<div
										className='ep_card'
										key={item?.number}
										onClick={() => openPlayer(item)}
									>
										<img
											className='ep_image'
											// style={{ backgroundImage: `url(${item.image})` }}
											src={item.image}
											loading='lazy'
											onError={() => {
												if (!adBlocker) setAdBlocker(true);
											}}
										/>
										<div className='play'>
											<PlayCircleOutlineIcon />
										</div>
										{/* </img> */}
										<div className='ep_no'>
											Episode - {item?.number ?? key + 1}
										</div>
										<div className='ep_name'>{item.title}</div>
									</div>
								);
							})}
						</div>
					</div>
					{animeInfo?.relations?.length ? (
						<div className='related_slider'>
							<Slider
								title={'Related'}
								data={animeInfo?.relations}
								icon={<StyleIcon />}
								redirect={true}
								related={true}
							/>
						</div>
					) : (
						''
					)}
					{animeInfo?.recommendations?.length ? (
						<div className='recommended_slider'>
							<Slider
								title={'Recommendations'}
								data={animeInfo?.recommendations}
								// watch={true}
								redirect={true}
								icon={<LightbulbIcon />}
							/>
						</div>
					) : (
						''
					)}
				</>
			)}

			<Modal
				aria-labelledby='spring-modal-title'
				aria-describedby='spring-modal-description'
				open={openModal}
				onClose={handleClose}
				closeAfterTransition
				id='watchPage'
			>
				<div className='modal_root'>
					<div className='episodeTitle'>
							{epTitle}
					</div>
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
						url={`https://m3u8proxy.counterstrike828.workers.dev/?referer=${referer}&&url=${quality}`}
						ref={playerRef}
						width='100%'
						height='100%'
						controls={true}
						// config={{
						// 	file: {
						// 		attributes: {
						// 			crossOrigin: 'true',
						// 			preload: 'metadata',
						// 		},
						// 		hlsOptions: {
						// 			autoStartLoad: true,
						// 			startFragPrefetch: true,
						// 		},
						// 	},
						// }}
						// light={playEp?.image} // replace with image tag
						// playIcon={
						//   <div className="play-icon">
						//     <PlayCircleOutlineIcon />
						//   </div>
						// }
						// onEnded={handleStart}
						onReady={() => props?.setLoading(false)}
						// playIcon={loading ? <></> : null}
						// onBuffer={() => setLoading(true)}
						// onBufferEnd={() => setLoading(false)}
						volume={volume?.current ?? 0.5}
						pip={false}
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
									sources?.filter(item => item?.quality === '1080p')?.[0]?.url
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
													playEp?.number >= key + 1 ? 'watched' : ''
												} ${playEp?.number === key + 1 ? 'currentEp' : ''}`}
												key={item?.number + '_list'}
												onClick={() => openPlayer(item)}
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
			<Snackbar
				open={open}
				autoHideDuration={4000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				onClose={handleClosePopUp}
			>
				<Alert
					onClose={handleClosePopUp}
					severity='error'
					sx={{ width: '100%', color: '#f85553' }}
				>
					Episodes thumbnail might not load because of AdBlocker !
				</Alert>
			</Snackbar>
		</div>
	);
}

export default WatchPage;
