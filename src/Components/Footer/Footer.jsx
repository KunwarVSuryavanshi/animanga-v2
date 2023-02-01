import React from 'react'
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import './Footer.scss'

function Footer() {
  return (
		<footer className='root_footer'>
			<div className='title'>
				<div>This website has been (or rather, is being) developed by KvS.</div>
				<br />
				<div>
					If you liked the website, star the repo on{' '}
					<a
						href='https://github.com/KunwarVSuryavanshi/animanga-v2'
						target='_blank'
					>
						<span>Github</span>
					</a>{' '}
					&#128517;
				</div>
			</div>
			<br />
			<br />
			<div className='disclaimer'>
				(NOTE: AniManga does not store any files on our server, we only link to media
				hosted on third party services. <br/> Also this project is merely just out of hobby, nothing more nothing less.)
			</div>
			<div className='social'>
				<FacebookIcon titleAccess='Yet to create :/' />
				<InstagramIcon titleAccess='Yet to create :/' />
				<TwitterIcon titleAccess='Yet to create :/' />
			</div>
		</footer>
	);
}

export default Footer