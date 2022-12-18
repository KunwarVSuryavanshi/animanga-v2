import React from 'react'
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import './Footer.scss'

function Footer() {
  return (
    <footer className="root_footer">
      <div className="title">
        <div>This website has been (or rather, is being) developed by KvS.</div>
        <br />
        <div>
          If you liked it, star the repo on{" "}
          <a
            href="https://github.com/KunwarVSuryavanshi/animanga-v2"
            target="_blank"
          >
            Github
          </a>{" "}
          &#128517;
        </div>
      </div>
      <br />
      <br />
      <div className="social">
        <FacebookIcon titleAccess="Yet to create :/" />
        <InstagramIcon titleAccess="Yet to create :/" />
        <TwitterIcon titleAccess="Yet to create :/" />
      </div>
    </footer>
  );
}

export default Footer