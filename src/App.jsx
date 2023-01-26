import './App.scss';
import Header from './Components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import { useEffect, useState } from 'react';
import { AuthContext } from './Common/AuthContext';
import { supabase } from './config/supabase';

function App() {
	const location = useLocation(null);
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		console.log('App')
		if (!userInfo)
			(async function () {
				const res = await supabase.auth.getUser();
				setUserInfo(res);
				console.log('async');
			})();
	}, []);
	return (
		<AuthContext.Provider value={{userInfo, setUserInfo}}>
			<div className='App'>
				{location?.pathname !== '/login' && <Header />}
				<div
					className='Outlet'
					style={{
						paddingBottom: location?.pathname === '/login' ? '0vh' : '',
					}}
				>
					<Outlet />
				</div>
				{location?.pathname !== '/login' && <Footer />}
			</div>
		</AuthContext.Provider>
	);
}

export default App;
