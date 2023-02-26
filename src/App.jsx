import './App.scss';
import Header from './Components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import { useEffect, useState } from 'react';
import { AuthContext } from './Common/AuthContext';
import { supabase } from './config/supabase';
import { Alert, Snackbar } from '@mui/material';

function App() {
	const location = useLocation(null);
	const [userInfo, setUserInfo] = useState(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!userInfo)
			(async function () {
				const res = await supabase.auth.getUser();
				setUserInfo(res);
				if (res?.data?.user?.aud === 'authenticated') setOpen(true);
				else setOpen(false);
			})();
	}, []);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<AuthContext.Provider value={{ userInfo, setUserInfo }}>
			<div className='App'>
				{location?.pathname !== '/login' && <Header />}
				<div
					className='Outlet'
					style={{
						paddingBottom:
							location?.pathname !== '/anime'
								? '0vh'
								: '',
					}}
				>
					<Outlet />
				</div>
				{location?.pathname !== '/login' && <Footer />}
				{/* {userInfo?.data?.user?.aud === 'authenticated' && */}
				<Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity='success'
						sx={{ width: '100%', color: '#4caf50' }}
					>
						Signed In successfully!
					</Alert>
				</Snackbar>
				{/* } */}
			</div>
		</AuthContext.Provider>
	);
}

export default App;
