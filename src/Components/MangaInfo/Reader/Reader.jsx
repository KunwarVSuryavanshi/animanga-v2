import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useRef } from 'react';

function Reader() {
	const meta = useOutletContext();
	const [chapter, setChapter] = useState(null);
	const [chap, setChap] = useState(null);
	const [loading, setLoading] = useState(false);
	const viewRef = useRef();
	const pageRef = useRef();
	const options = {
		root: null,
		rootMargin: '0px 0px 0px 1000px', // +ve means pre load
		threshold: 0,
	};
	const observer = new IntersectionObserver(
		(entries, observer) => handleLazyLoad(entries, observer),
		options
	);

	const loadImage = async element => {
		let src = element?.getAttribute('data-src');
		let proxiedImg = await proxyReq(src);
		element.src = proxiedImg;
	};

	const handleLazyLoad = (items, observer) => {
		console.log('Lazy load---->', items);
		items?.forEach(item => {
			if (item?.isIntersecting) {
				loadImage(item?.target?.children?.[0]);
				observer.unobserve(item.target);
			}
		});
	};

	const handleChapterFetch = event => {
		setChap(event.target?.value);
		setLoading(true);
		let url = `https://${import.meta.env.VITE_SECONDARY_API}/manga/${
			meta?.provider
		}/read?chapterId=${event.target?.value?.id}`;
		axios
			.get(url)
			.then(res => {
				setChapter(res.data);
			})
			.catch(err => console.error(err))
			.finally(() => setLoading(false));
	};

	const proxyReq = async (url, referer) => {
		const data = await axios.get(
			`https://${
				import.meta.env.VITE_SECONDARY_API
			}/utils/image-proxy?url=${url}&referer=${
				referer ?? `https://${meta?.provider}.org/`
			}`,
			{
				responseType: 'arraybuffer',
			}
		);

		let proxyImg = '';
		if (data.status === 200) {
			let image = btoa(
				new Uint8Array(data?.data).reduce(
					(data, byte) => data + String.fromCharCode(byte),
					''
				)
			);
			proxyImg = `data:${data.headers[
				'content-type'
			].toLowerCase()};base64,${image}`;
		}
		return proxyImg;
	};

	const handleLeft = () => {
		viewRef.current.scrollLeft -=
			pageRef?.current?.previousSibling?.offsetWidth * 2 > 0
				? pageRef?.current?.previousSibling?.offsetWidth * 2
				: 200 * 2;
	};

	const handleRight = () => {
		viewRef.current.scrollLeft +=
			pageRef?.current?.previousSibling?.offsetWidth * 2 > 0
				? pageRef?.current?.previousSibling?.offsetWidth * 2
				: 200 * 2;
	};

	useEffect(() => {
		if (chapter?.length && viewRef?.current && pageRef.current) {
			[...viewRef?.current?.children]
				?.slice(1, [...viewRef?.current?.children]?.length - 1)
				.forEach(item => observer.observe(item));
		}
	}, [chapter]);

	return (
		<div className='reader_container'>
			<div className='chapters-drop'>
				<div className='head'>Select Chapter: &nbsp;</div>
				<FormControl sx={{ m: 1 }}>
					<Select
						id='chapter-selector'
						value={chap}
						onChange={handleChapterFetch}
						label='Chapter(s)'
						input={<OutlinedInput label='Chapter(s)' />}
						// fullWidth
						placeholder='Chapter(s)'
					>
						{meta?.mangaDetails?.chapters?.map((item, key) => {
							return (
								<MenuItem value={item} key={key}>
									<div
										className='dr_header'
										style={{
											color: 'white',
										}}
									>
										{item?.title}
									</div>
									<div className='sub-header'>
										{item?.releasedDate ?? 'Pages - ' + item?.pages}
									</div>
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</div>
			{!loading ? (
				<div className='view_cont'>
					<div className='viewer' ref={viewRef}>
						{chap && (
							<div className='left-btn' onClick={handleLeft}>
								<span>Left</span>
							</div>
						)}
						{chapter?.map((item, key) => {
							return (
								<div
									className={`pages page_${key}`}
									// style={{ backgroundImage: `url(${item.img})` }}
									ref={pageRef}
									key={key}
								>
									<img className='images' data-src={item?.img}/>
								</div>
							);
						})}
						{chap && (
							<div className='right-btn' onClick={handleRight}>
								<span>Right</span>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className='loader'>
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
				</div>
			)}
		</div>
	);
}

export default Reader;
