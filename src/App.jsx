import './App.scss'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
function App() {

  return (
    <div className="App">
      <Header />
      <div style={{minHeight: '100vh'}}>
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default App
