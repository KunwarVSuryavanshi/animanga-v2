import React, { useRef, useState } from 'react';
import './Slider.scss';
import Skeleton from '@mui/material/Skeleton';
import { Chip, ClickAwayListener, Popper } from '@mui/material';
import { cleanHTML, getRandomeColor } from '../../Common/utils';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TableRowsIcon from '@mui/icons-material/TableRows';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate } from 'react-router-dom';
import CustomPlayer from '../CustomPlayer/CustomPlayer';
import { useEffect } from 'react';

function Slider(props) {
	const [anchorElem, setAnchorElem] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [sources, setSources] = useState([]);
	const [loading, setLoading] = useState(true);
	const slideRef = useRef(null);
	const cardRef = useRef(null);
	const arr = new Array(7).fill(1);
	const open = Boolean(anchorElem?.target);
	const navigate = useNavigate();
	const lazyRef = useRef(null);
	const options = {
		root: null,
		rootMargin: '0px 200px',
		threshold: 0,
	};
	const observer = new IntersectionObserver(
		(entries, observer )=> handleLazyLoad(entries, observer),
		options
	);

  const handleLazyLoad = (items, observer) => {
    items?.forEach(item => {
      if (!item.isIntersecting) return
      item.target.children[0].style.backgroundImage = `url(${item.target.children?.[0].getAttribute('data-src')})`;
      observer.unobserve(item.target);
    })
  }

	const handleCloseModal = () => {
		setLoading(true);
		setOpenModal(false);
	};

	const handleHover = (e, item) => {
		if (e.target?.parentElement?.getAttribute('name') === 'card') {
			e.target.parentElement.style.border = `3px solid ${
				item?.coverImage?.color ?? item?.color ?? getRandomeColor()
			}`;
			handleClose();
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

	const handleClick = (event, data) => {
		if (props.trailer) {
			// Open modal and play the trailer
			setOpenModal(true);
			setSources([
				{
					url: `https://www.youtube.com/watch?v=${data?.trailer?.id}`,
				},
			]);
		} else if (props.redirect) {
			// Redirect to manga or anime page
			if (data.type === 'MANGA') {
				navigate(`/manga/${data.id}`);
			} else {
				navigate(`/watch/${data.id}`);
			}
			event.target.parentElement.style.border = '3px solid transparent';
		} else if (
			// Sets the anchor element for the pop over watch now
			event.target.parentElement.getAttribute('name') === 'card' &&
			props.watch
		) {
			setAnchorElem({ target: event.target, data });
		}
	};

	const handleClose = () => {
		setAnchorElem(null);
	};

	const handleLeftScroll = () => {
		slideRef.current.scrollLeft -=
			cardRef?.current?.previousSibling?.offsetWidth * 2;
	};

	const handleRightScroll = () => {
		slideRef.current.scrollLeft +=
			cardRef?.current?.previousSibling?.offsetWidth * 2;
	};

	const handleWatch = data => {
		navigate(`/watch/${data.id}`);
	};

  useEffect(() => {
    if (lazyRef.current && slideRef.current) {
      [...slideRef.current.children]?.forEach(item => observer.observe(item))
    }
	}, [lazyRef?.current, props?.data?.length]);

  return (
		<div className='slider_root'>
			<div className='slider_title'>
				{props.data?.length > 0 && (
					<>
						{props.icon} {props.title}
					</>
				)}
				{/* <span className="">&#9432;</span> */}
				<span className='scroll-btn'>
					<NavigateBeforeIcon onClick={handleLeftScroll} />
					<NavigateNextIcon onClick={handleRightScroll} />
				</span>
			</div>
			<div
				ref={slideRef}
				className='slider_container snaps-inline'
				name='container'
			>
				{props.data?.length > 0
					? props.data?.map((item, key) => {
							return (
								<div
									ref={cardRef}
									id={`card_${key}`}
									className={`card`}
									key={key}
									onClick={e => handleClick(e, item)}
									onMouseOver={e => handleHover(e, item)}
									onMouseLeave={e => handleMouseLeave(e)}
									name='card'
								>
									<div
										className='card_image'
										// style={{
										// 	backgroundImage: `url(${
										// 		item?.coverImage?.extraLarge ??
										// 		item?.coverImage?.large ??
										// 		item?.image
										// 	})`,
										// }}
										ref={lazyRef}
										data-src={
											item?.coverImage?.extraLarge ??
											item?.coverImage?.large ??
											item?.image
										}
									>
										{(props?.watch || item?.rating) && (
											<div className='rating'>
												{isNaN(item?.averageScore / 10)
													? item?.rating / 10
													: item?.averageScore / 10}
											</div>
										)}
									</div>
									<div
										title={`${item?.title?.english ?? item?.title?.romaji}`}
										className='card_title'
									>
										{item?.title?.english ??
											item?.title?.romaji ??
											item?.name?.full}{' '}
									</div>

									{/* {props.trailer && (
                    <div className="startDate">
                      {item?.startDate?.day
                        ? (item?.startDate?.day +
                          "/" +
                          item?.startDate?.month +
                          "/" +
                          item?.startDate?.year)
                        : item?.startDate?.month
                        ? (item?.startDate?.month + "/" + item?.startDate?.year)
                        : item?.startDate?.year}
                    </div>
                  )} */}
									{props.related && (
										<div className='related_type'>({item?.relationType})</div>
									)}
								</div>
							);
					  })
					: arr.map((item, index) => {
							return (
								<div className={`card`} key={index}>
									<div className='card_image'>
										<Skeleton
											variant='rectangular'
											width={'12vw'}
											height={'42vh'}
											animation='pulse'
										/>
									</div>
								</div>
							);
					  })}
				<Popper
					id={open ? `card_popover` : undefined}
					open={open}
					anchorEl={anchorElem?.target}
					// anchorOrigin={{
					//   vertical: "center",
					//   horizontal: "right",
					// }}
					placement={'right'}
					// transformOrigin={{
					//   vertical: "top",
					//   horizontal: "left",
					// }}
					disablePortal
					// transition
					modifiers={[
						{
							name: 'offset',
							options: {
								offset: [20, 20],
							},
						},
					]}
					// draggable
				>
					<ClickAwayListener onClickAway={handleClose}>
						<div
							className='popover_root'
							//  style={{backgroundColor: anchorElem?.data?.coverImage?.color}}
						>
							<div className='title'>
								{anchorElem?.data?.title?.english ??
									anchorElem?.data?.title?.romaji}
							</div>
							<div className='rating'>
								<div className='rate'>
									<span>
										<StarIcon /> &nbsp;
										{anchorElem?.data?.averageScore / 10}
									</span>
								</div>
								<div className='episodes'>
									<span>
										<TableRowsIcon /> &nbsp;
										{anchorElem?.data?.episodes ?? `NA`}
									</span>
								</div>
								<div className='type'>{anchorElem?.data?.format}</div>
							</div>
							<div className='description'>
								{cleanHTML(anchorElem?.data?.description)}
							</div>
							<div className='genres'>
								<span>Genres:</span>&nbsp;&nbsp;
								{anchorElem?.data?.genres?.slice(0, 5)?.join(', ')}
							</div>
							<div className='status'>
								<span>Status:</span>&nbsp; {anchorElem?.data?.status}
							</div>
							<div className='btn'>
								<Chip
									icon={<PlayArrowIcon />}
									label='Watch Now'
									onClick={() => handleWatch(anchorElem?.data)}
								/>
							</div>
						</div>
					</ClickAwayListener>
				</Popper>
				{openModal && (
					<CustomPlayer
						handleClose={handleCloseModal}
						openModal={true}
						sources={sources}
						pip={true}
						loading={loading}
						setLoading={setLoading}
					/>
				)}
			</div>
		</div>
	);
}

export default Slider;
