import React, { useEffect, useState } from "react";
import { getQuotes } from "../../Common/utils";
import { supabase } from "../../config/supabase";
import './LandingPage.scss'

function LandingPage() {
  const [quotes, setQuotes] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  async function dummy() {
    const {data, error} = await supabase.auth.getUser();
    console.log('user data', data);
    setUserInfo(data)
    const datas = await supabase.from('animeWatchList').insert({user_id: data.user.identities[0].user_id, watchList: { id: 21, name: 'Conan', more: '' } })
    console.log('datas----->', datas);
  }

  useEffect(() => {
    getQuotes().then((res) => setQuotes(res));
    // dummy()
  }, []);
	// console.log('Supabase---->', supabase, supabase.auth.getUser());

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
