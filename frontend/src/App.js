import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from  './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import SingleProduct from './components/SingleProduct/SingleProduct';

import { Context } from './utils/context';
import { useContext } from 'react';

function App() {

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={`${process.env.REACT_APP_INITIAL_DOMAIN}/`} element={<Home scrollTo={"none"}/>} />
                <Route path={`${process.env.REACT_APP_INITIAL_DOMAIN}/products`} element={<Home scrollTo={"products"}/>}/>
                <Route path={`${process.env.REACT_APP_INITIAL_DOMAIN}/aboutus`} element={<Home scrollTo={"aboutus"}/>}/>
                <Route path={`${process.env.REACT_APP_INITIAL_DOMAIN}/footer`} element={<Home scrollTo={"footer"} />} />
                <Route path={`${process.env.REACT_APP_INITIAL_DOMAIN}/product/:id`} element={<SingleProduct/>}/>
                <Route path={`${process.env.REACT_APP_INITIAL_DOMAIN}/benefits`} element={<Home scrollTo={"benefits"}/>}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
