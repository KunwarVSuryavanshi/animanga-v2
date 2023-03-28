import { Button, LinearProgress, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	clearSearchData,
	searchAnimes,
} from '../../app/feature/searchAnime.slice';
import { getRandomeColor } from '../../Common/utils';
import './SearchPage.scss';
import CategoryIcon from '@mui/icons-material/Category';
import FilterListIcon from '@mui/icons-material/FilterList';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CellTowerIcon from '@mui/icons-material/CellTower';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Chip from '@mui/material/Chip';

function SearchPage() {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [open, setOpen] = useState(false);
	const searchResult = useSelector(state => state.searchedAnime);
	const navigate = useNavigate();
	const [type, setType] = useState([
		{ id: 'ANIME', text: 'Anime', selected: false, color: '#E90064' },
		{ id: 'MANGA', text: 'Manga', selected: false, color: '#810CA8' },
	]);
	const [season, setSeason] = useState([
		{ id: 'WINTER', text: 'Winter', selected: false, color: '#59C1BD' },
		{ id: 'SPRING', text: 'Spring', selected: false, color: '#C780FA' },
		{ id: 'SUMMER', text: 'Summer', selected: false, color: '#FFB100' },
		{ id: 'FALL', text: 'Fall', selected: false, color: '#ABC270' },
	]);
	const [format, setFormat] = useState([
		{ id: 'TV', text: 'TV	', selected: false, color: '#B9F3E4' },
		{ id: 'TV_SHORT', text: 'TV SHORT', selected: false, color: '#B5F1CC' },
		{ id: 'OVA', text: 'OVA', selected: false, color: '#FD8A8A' },
		{ id: 'ONA', text: 'ONA', selected: false, color: '#BA94D1' },
		{ id: 'MOVIE', text: 'MOVIE', selected: false, color: '#E97777' },
		{ id: 'SPECIAL', text: 'SPECIAL', selected: false, color: '#F675A8' },
		{ id: 'MUSIC', text: 'MUSIC', selected: false, color: '#68A7AD' },
	]);
	const [genres, setGenres] = useState([
		{ id: 'Action', text: 'Action', selected: false, color: '#FC7300' },
		{ id: 'Adventure', text: 'Adventure', selected: false, color: '#C539B4' },
		{ id: 'Comedy', text: 'Comedy', selected: false, color: '#4649FF' },
		{ id: 'Drama', text: 'Drama', selected: false, color: '#FFC6D3' },
		{ id: 'Fantasy', text: 'Fantasy', selected: false, color: '#A3423C' },
		{ id: 'Horror', text: 'Horror', selected: false, color: '#FFEF6F' },
		{ id: 'Mecha', text: 'Mecha', selected: false, color: '#C92C6D' },
		{ id: 'Music', text: 'Music', selected: false, color: '#9F71DB' },
		{ id: 'Mystery', text: 'Mystery', selected: false, color: '#FFE15D' },
		{
			id: 'Psychological',
			text: 'Psychological',
			selected: false,
			color: '#FBD6D2',
		},
		{ id: 'Romance', text: 'Romance', selected: false, color: '#FF449F' },
		{ id: 'Sci-Fi', text: 'Sci-Fi', selected: false, color: '#1363DF' },
		{
			id: 'Slice of Life',
			text: 'Slice of Life',
			selected: false,
			color: '#FFD124',
		},
		{ id: 'Sports', text: 'Sports', selected: false, color: '#FC3A52' },
		{
			id: 'Supernatural',
			text: 'Supernatural',
			selected: false,
			color: '#F0134D',
		},
		{ id: 'Thriller', text: 'Thriller', selected: false, color: '#F7E2E2' },
	]);
	const [status, setStatus] = useState([
		{ id: 'RELEASING', text: 'Releasing', selected: false, color: '#16FF00' },
		{
			id: 'NOT_YET_RELEASED',
			text: 'Not Yet Released',
			selected: false,
			color: '#FFEA20',
		},
		{ id: 'FINISHED', text: 'Finished', selected: false, color: '#F0FF42' },
		{ id: 'CANCELLED', text: 'Cancelled', selected: false, color: '#54B435' },
		{ id: 'HIATUS', text: 'Hiatus', selected: false, color: '#EA047E' },
	]);
	const [sort, setSort] = useState([
		{
			id: 'POPULARITY_DESC',
			text: 'Most Popular',
			selected: false,
			color: '#EA047E',
		},
		{
			id: 'POPULARITY',
			text: 'Least Popular',
			selected: false,
			color: '#38E54D',
		},
		{
			id: 'TRENDING_DESC',
			text: 'Trending',
			selected: false,
			color: '#00FFAB',
		},
		{
			id: 'UPDATED_AT_DESC',
			text: 'Updated',
			selected: false,
			color: '#247881',
		},
		{
			id: 'START_DATE_DESC',
			text: 'Newest to Oldest',
			selected: false,
			color: '#FF5F00',
		},
		{
			id: 'START_DATE',
			text: 'Oldest to Newest',
			selected: false,
			color: '#5800FF',
		},
		{
			id: 'SCORE_DESC',
			text: 'Highest score',
			selected: false,
			color: '#F47340',
		},
		{
			id: 'EPISODES',
			text: 'Episodes Count',
			selected: false,
			color: '#FF00E4',
		},
	]);

	const handleChange = e => {
		// console.log(e?.target?.value, e?.key)
		if (e?.key === 'Enter') {
			handleClick();
		}
		setSearchText(e.target.value);
	};

	const handleRoute = (e, item) => {
		if (item.type === 'MANGA') {
			navigate(`/manga/${item.id}`);
		} else {
			navigate(`/watch/${item.id}`);
		}
	};

	const handleHover = (e, item) => {
		if (e.target?.parentElement?.getAttribute('name') === 'card') {
			e.target.parentElement.style.border = `3px solid ${
				item?.coverImage?.color ?? item?.color ?? getRandomeColor()
			}`;
		} else if (e.target.getAttribute('name') === 'card') {
			e.target.style.border = `3px solid ${
				item?.coverImage?.color ?? item?.color ?? getRandomeColor()
			}`;
		}
	};

	const handleMouseLeave = e => {
		if (e.target.getAttribute('name') === 'card') {
			e.target.style.border = '3px solid transparent';
		} else if (e.target?.parentElement?.getAttribute('name') === 'card') {
			e.target.parentElement.style.border = '3px solid transparent';
		}
	};

	const openAdvancedSearch = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClick = () => {
		if (searchText.trim()?.length > 0) {
			dispatch(clearSearchData());
			dispatch(searchAnimes({ page: 1, perPage: 50, text: searchText }));
		}
	};

	const handleChipClick = (item, region, index) => {
		switch (region) {
			case 'type':
				type[index].selected = !type[index].selected;
				setType([...type]);
				break;
			case 'genres':
				genres[index].selected = !genres[index].selected;
				setGenres([...genres])
				break;
			case 'format':
				format[index].selected = !format[index].selected;
				setFormat([...format])
				break;
			case 'status':
				status[index].selected = !status[index].selected;
				setStatus([...status])
				break
			case 'season':
				season[index].selected = !season[index].selected;
				setSeason([...season]);
				break;
			case 'sort':
				sort[index].selected = !sort[index].selected;
				setSort([...sort]);
				break;
			default:
				break;
		}
	};

	return (
		<div style={{ position: 'relative', minHeight: '100vh' }}>
			<div style={{ position: 'sticky', height: '2vh' }}>
				{searchResult?.loading && <LinearProgress color='primary' />}
			</div>
			<div className={`search-bar display_bar`}>
				<TextField
					value={searchText}
					onChange={handleChange}
					placeholder='Search Anime/Manga'
					focused
					onKeyDown={handleChange}
				/>
				<Button
					variant='contained'
					onClick={handleClick}
					disableElevation={true}
				>
					Search
				</Button>
			</div>
			<div className='filter-genres filter-bar adv-text'>
				<span>
					Not sure what to look for? Try{' '}
					<span className='adv' onClick={openAdvancedSearch}>
						<u>advanced search</u>
					</span>
				</span>
			</div>
			{searchResult?.list?.Page?.media?.length > 0 ? (
				<div className='cards' name='container'>
					{searchResult?.list?.Page?.media?.map((item, key) => {
						return (
							<div
								key={key}
								className='card_wrap'
								onMouseOver={e => handleHover(e, item)}
								onMouseLeave={e => handleMouseLeave(e)}
								name='card'
								onClick={e => handleRoute(e, item)}
							>
								<div
									className='image'
									style={{
										backgroundImage: `url(${
											item?.coverImage?.extraLarge ?? item?.coverImage?.large
										})`,
									}}
								></div>
								<div className='title'>
									{item?.title?.romaji ?? item?.title?.english}
								</div>
								<div className='type'>{item?.format}</div>
							</div>
						);
					})}
				</div>
			) : (
				searchResult?.error && (
					<div className='no_result'>
						The term you searched, didn't bring up anything :/
					</div>
				)
			)}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<div className='filter_root'>
					{console.log('Type---->', type)}
					<div className='category'>
						UNDER CONSTRUCTION &#128517;
						<br />
						{`\n`}
						<div className='filter_header'>
							<CategoryIcon /> Type
						</div>
						<div className='filter_body'>
							{type?.map((item, key) => {
								return (
									<Chip
										className={'category ' + item.id}
										label={item.text}
										onDelete={
											item.selected
												? () => handleChipClick(item, 'type', key)
												: null
										}
										style={{
											border: `2px solid ${item?.color}`,
											boxShadow: `${
												item.selected ? `0 0 1rem 0 ${item?.color}` : ``
											}`,
											// textShadow: `${item?.color} 0.05rem 0.05rem`,
											// color: `${item?.color}`,
										}}
										onClick={() => handleChipClick(item, 'type', key)}
									/>
								);
							})}
						</div>
					</div>
					<div className='format'>
						<div className='filter_header'>
							<VerticalSplitIcon />
							Format
						</div>
						<div className='filter_body'>
							{format?.map((item, key) => {
								return (
									<Chip
										className={'format ' + item.id}
										label={item.text}
										onDelete={
											item.selected
												? () => handleChipClick(item, 'format', key)
												: null
										}
										style={{
											border: `2px solid ${item?.color}`,
											boxShadow: `${
												item.selected ? `0 0 1rem 0 ${item?.color}` : ``
											}`,
										}}
										onClick={() => handleChipClick(item, 'format', key)}
									/>
								);
							})}
						</div>
					</div>
					<div className='season'>
						<div className='filter_header'>
							<AcUnitIcon />
							Season
						</div>
						<div className='filter_body'>
							{season?.map((item, key) => {
								return (
									<Chip
										className={'season ' + item.id}
										label={item.text}
										onDelete={
											item.selected
												? () => handleChipClick(item, 'season', key)
												: null
										}
										style={{
											border: `2px solid ${item?.color}`,
											boxShadow: `${
												item.selected ? `0 0 1rem 0 ${item?.color}` : ``
											}`,
										}}
										onClick={() => handleChipClick(item, 'season', key)}
									/>
								);
							})}
						</div>
					</div>
					<div className='status'>
						<div className='filter_header'>
							<CellTowerIcon />
							Status
						</div>
						<div className='filter_body'>
							{status?.map((item, key) => {
								return (
									<Chip
										className={'status ' + item.id}
										label={item.text}
										onDelete={
											item.selected
												? () => handleChipClick(item, 'status', key)
												: null
										}
										style={{
											border: `2px solid ${item?.color}`,
											boxShadow: `${
												item.selected ? `0 0 1rem 0 ${item?.color}` : ``
											}`,
										}}
										onClick={() => handleChipClick(item, 'status', key)}
									/>
								);
							})}
						</div>
					</div>
					<div className='genres'>
						<div className='filter_header'>
							<AutoFixHighIcon />
							Genres
						</div>
						<div className='filter_body'>
							{genres?.map((item, key) => {
								return (
									<Chip
										className={'status ' + item.id}
										label={item.text}
										onDelete={
											item.selected
												? () => handleChipClick(item, 'genres', key)
												: null
										}
										style={{
											border: `2px solid ${item?.color}`,
											boxShadow: `${
												item.selected ? `0 0 1rem 0 ${item?.color}` : ``
											}`,
										}}
										onClick={() => handleChipClick(item, 'genres', key)}
									/>
								);
							})}
						</div>
					</div>
					<div className='sort'>
						<div className='filter_header'>
							<FilterListIcon />
							Sort
						</div>
						<div className='filter_body'>
							{sort?.map((item, key) => {
								return (
									<Chip
										className={'sort ' + item.id}
										label={item.text}
										onDelete={
											item.selected
												? () => handleChipClick(item, 'sort', key)
												: null
										}
										style={{
											border: `2px solid ${item?.color}`,
											boxShadow: `${
												item.selected ? `0 0 1rem 0 ${item?.color}` : ``
											}`,
										}}
										onClick={() => handleChipClick(item, 'sort', key)}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default SearchPage;
