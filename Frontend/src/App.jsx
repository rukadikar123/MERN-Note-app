import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/signup' element={<Signup/>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
