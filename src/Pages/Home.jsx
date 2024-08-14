import React from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import SearchBar from '../Components/SearchBar/SearchBar';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';

const Home=()=>
{
    return (
        <div>
            <Navbar/>
             <SearchBar/>
            <Hero />
            <Popular />
            <Offers />
            <Footer/>
        </div>
    )
}
export default Home