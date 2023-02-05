import React, { useEffect, useRef, useState } from 'react';
import './Manga.scss';
import { fetchtopManga } from '../../app/feature/topManga.slice';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, LinearProgress } from '@mui/material';
import { getRandomeColor } from '../../Common/utils';
import { useNavigate } from 'react-router-dom';

function Manga() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const page = useRef(null);
	const { topManga } = useSelector(state => {
		return {
			topManga: state.topManga,
		};
	});
	const options = {
		root: null,
		rootMargin: '0px',
		threshold: 0.25,
	};
	const observer = new IntersectionObserver(
		entries => handleDebounce(entries),
		options
	);
	const mangaRef = useRef();
	let timer;

	const handleCardHover = (item, e) => {
		e.stopPropagation();
		if (e.target.getAttribute('name') === 'child') {
			e.target.parentElement.style.border = `3px solid ${
				item?.coverImage?.color ?? item?.color ?? getRandomeColor()
			}`;
		} else if (e.target.getAttribute('name') === 'parent') {
			e.target.style.border = `3px solid ${
				item?.coverImage?.color ?? item?.color ?? getRandomeColor()
			}`;
		}
	};

	const handleMouseLeave = e => {
		// e.stopPropagation();
		if (e.target.getAttribute('name') === 'child') {
			e.target.parentElement.style.border = `3px solid transparent`;
		} else if (e.target.getAttribute('name') === 'parent') {
			e.target.style.border = `3px solid transparent`;
		}
	};

	function handleDebounce(entries) {
		if (mangaRef?.current) {
			clearTimeout(timer);
			timer = setTimeout(() => handleObserver(entries), 500);
		}
	}

	function handleObserver(e) {
		if (e?.[0]?.isIntersecting && page.current < 5) {
			dispatch(fetchtopManga(page.current));
			page.current += 1;
		}
	}

	const handleClick = id => {
		navigate(`${id}`);
	};

	useEffect(() => {
		if (!topManga?.response) {
			dispatch(fetchtopManga());
			page.current = 2;
		}
	}, []);

	useEffect(() => {
		if (topManga?.response?.Page?.media?.length === 50) {
			observer.observe(mangaRef?.current);
		}
	}, [topManga?.response?.Page?.media]);

	return (
		<div className='manga_root'>
			{topManga?.loading ? (
				<div style={{ position: 'sticky', top: '8vh', height: '100vh' }}>
					<LinearProgress color='primary' />
				</div>
			) : (
				<>
					{topManga?.response?.Page?.media?.length > 0 && (
            <>
              <div className="cards">
                {topManga?.response?.Page?.media?.map((item, key) => {
                  return (
                    <div
                      name="parent"
                      className="card_wrap"
                      onMouseOver={(e) => handleCardHover(item, e)}
                      onMouseLeave={(e) => handleMouseLeave(e)}
                      onClick={() => handleClick(item?.id)}
                    >
                      <div
                        name="child"
                        className="image"
                        style={{
                          backgroundImage: `url(${
                            item?.coverImage?.extraLarge ??
                            item?.coverImage?.large
                          })`,
                        }}
                      ></div>
                      <div name="child" className="title">
                        {item?.title?.romaji ?? item?.title?.english}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="loader" ref={mangaRef}></div>
              {page.current < 5 && (
                <div className="c_spinner">
                  <CircularProgress />
                </div>
              )}
              {page.current >= 5 && (
                <div className="c_spinner" style={{fontSize: '1.25rem'}}>
                  &#128161;Pro-Tip: Try searching for the manga you are looking
                  for
                </div>
              )}
            </>
          )}
				</>
			)}
		</div>
	);
}

export default Manga;
