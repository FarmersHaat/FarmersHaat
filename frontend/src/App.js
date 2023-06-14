import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from  './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import SingleProduct from './components/SingleProduct/SingleProduct';

import { Context } from './utils/context';
import { useContext } from 'react';

function App() {

    const { productRef, aboutUsRef, footerRef } = useContext(Context);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/FarmersHaat/' element={<Home scrollTo={"none"}/>} />
                <Route path='/FarmersHaat/products' element={<Home scrollTo={"products"}/>}/>
                <Route path='/FarmersHaat/aboutus' element={<Home scrollTo={"aboutus"}/>}/>
                <Route path='/FarmersHaat/footer' element={<Home scrollTo={"footer"}/>}/>
                <Route path='/FarmersHaat/product/:id' element={<SingleProduct/>}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
