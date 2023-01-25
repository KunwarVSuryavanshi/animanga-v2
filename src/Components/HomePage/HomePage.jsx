import React, { useEffect, useState } from 'react';
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

	const getUserData = async () => {
    let { data, error } = await supabase.from('animeHistory').select();
    if (error) {
      console.error('Error while fetching user details--->', error);
    } else {
      console.log('Data--->', data);
      setWatchList(data)
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
    getUserData();
	}, []);

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
			<div className='sliderr'>
				<Slider
					title={'UPCOMING'}
					data={upcomingAnime?.response?.Page?.media}
					icon={<AutoAwesomeIcon />}
					trailer={true}
				/>
			</div>
			<div className='sliderr airing'>
				<Slider
					title={'AIRING'}
					data={airingAnimeResponse?.response?.data?.Page?.media}
					watch={true}
					icon={<SatelliteAltIcon />}
				/>
			</div>
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
