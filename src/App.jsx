import './App.scss'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
function App() {

  return (
    <div className="App">
      <Header />
      <div className="Outlet" style={{minHeight: '100vh', maxHeight: '100%', width: '100vw', maxWidth:'100%'}}>
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default App
