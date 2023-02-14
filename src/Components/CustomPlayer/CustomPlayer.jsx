import { Modal } from '@mui/material';
import React from 'react';
import ReactPlayer from 'react-player';
import Saitama from '../../assets/saitama_NT.png';
import './CustomPlayer.scss';

function CustomPlayer(props) {
	return (
		<Modal
			aria-labelledby='spring-modal-title'
			aria-describedby='spring-modal-description'
			open={props?.openModal}
			onClose={props?.handleClose}
			closeAfterTransition
			id='customPlayer'
		>
			<div className='modal_root_custom'>
				{ReactPlayer.canPlay(props?.sources?.[0]?.url) ? (
					<>
						<svg
							className={`spinner ${!props?.loading && 'hidden'}`}
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
							url={props?.sources?.[0]?.url}
							// file={}
							width='100%'
							height='100%'
							controls={true}
							light={props?.playEp?.image} // replace with image tag
							playIcon={props?.loading ? <></> : null}
							onReady={() => props?.setLoading(false)}
							// onBuffer={() => props?.setLoading(true)}
							onBufferEnd={() => props?.setLoading(false)}
							pip={props.pip ?? false}
							volume={0.5}
						></ReactPlayer>
					</>
				) : (
					<div
						style={{
							height: '100%',
							width: '100%',
							backgroundImage: `url(${Saitama})`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
						}}
					/>
				)}
			</div>
		</Modal>
	);
}

export default CustomPlayer;
