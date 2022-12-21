import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Movies from './pages'

const Router =() =>{
    return(
        <Routes>
            <Route path='/' element={<Movies/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    )
}
export default Router
