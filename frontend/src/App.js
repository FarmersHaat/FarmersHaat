import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from  './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import SingleProduct from './components/SingleProduct/SingleProduct';

import AppContext from './utils/context';

function App() {
    return (
        <AppContext>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/FarmersHaat/' element={<Home/>}/>
                    <Route path='/FarmersHaat/product/:id' element={<SingleProduct/>}/>
                </Routes>
                <Footer />
            </BrowserRouter>
        </AppContext>
    );
}

export default App;
