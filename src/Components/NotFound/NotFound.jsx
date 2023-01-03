import React from 'react'
import Header from '../Header/Header';
import './NotFound.scss';

function NotFound(props) {
  return (
    <>
      {!props?.noHeader && <Header />}
      <div className="root_nf">
        <div className="container" style={{height: props?.noHeader && '120vh' }}>
          <div className="title">404 - Not Found &#127882;</div>
          <div className="desc">
            Hmmmm....The page you requested can not be found. <br/>
            Please check with the developer for more on this.
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound