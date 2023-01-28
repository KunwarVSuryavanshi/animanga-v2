import React, { useContext, useEffect, useState } from 'react';
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

	// console.log('Supabase---->',supabase, supabase.auth);

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
						{/* <div className="carousel_container_left-btn"></div> */}
						{/* {airingAnimeResponse?.response?.data?.map((item, key) => {
              return <Carousel item={item} key={key} />;
            })} */}
						<BannerCarousel
							data={airingAnimeResponse?.response?.data?.Page?.media?.slice(
								0,
								20
							)}
						/>
						{/* <div className="carousel_container_right-btn"></div> */}
					</div>
				)}
			</div>

			{/* ------------------------------Continue Watching section---------------------- */}
			{watchList && (
				<div className='episodes'>
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
									key={item?.epDetails?.number}
									// onClick={() => openPlayer(item)}
								>
									<div
										className='ep_image'
										style={{
											backgroundImage: `url(${item?.epDetails?.image})`,
										}}
									>
										<PlayCircleOutlineIcon />
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
		</>
	);
}

export default HomePage;
