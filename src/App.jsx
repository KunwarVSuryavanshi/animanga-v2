import './App.scss';
import Header from './Components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
function App() {
	const location = useLocation();
	console.log(location);
	return (
		<div className='App'>
			{location?.pathname !== '/login' && <Header />}
			<div
				className='Outlet'
				style={{ paddingBottom: location?.pathname === '/login' ? '0vh' : '' }}
			>
				<Outlet />
			</div>
			{location?.pathname !== '/login' && <Footer />}
		</div>
	);
}

export default App;
