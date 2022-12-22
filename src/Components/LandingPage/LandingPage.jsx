import React, { useEffect, useState } from "react";
import { getQuotes } from "../../Common/utils";
import './LandingPage.scss'

function LandingPage() {
  const [quotes, setQuotes] = useState(null);

  useEffect(() => {
    getQuotes().then((res) => setQuotes(res));
  }, []);

  return (
    <div className="container_lp">
      <div className="greeting">
        <div className="japanese">もしもし。今日は元気ですか？</div>
        {/* <div className="english">Moshi Moshi. How are you today?</div> */}
      </div>
      {quotes && (
        <div className="quotes_container">
          <div className="quote">"{quotes?.quote}"</div>
          <div className="character">
            {quotes?.character} - {quotes?.anime}
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
