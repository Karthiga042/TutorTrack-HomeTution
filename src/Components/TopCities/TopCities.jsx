

import React from "react";
import "./TopCities.css";
import CityCard from "./CityCard";
import mumbai from '../Assets/mumbai.jpg';
import chennai from '../Assets/chennai.jpg';
import pondicherry from '../Assets/pondicherry.jpeg';
import hyderabad from '../Assets/hyderabad.jpeg';
import delhi from '../Assets/delhi.jpg';
import bangalore from '../Assets/bangalore.jpg';
import TopCitiesDescription from "./TopCitiesDescription";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const cities = [
  {
    name: "Mumbai",
    country: "India",
    population: "20,411,274",
    description:
      "The financial capital of India, known for its bustling streets and Bollywood film industry.",
    imageUrl: mumbai,
    coordinates: [19.0760, 72.8777],
  },
  {
    name: "Chennai",
    country: "India",
    population: "10,971,108",
    description:
      "A cultural hub in southern India, famous for its music, arts, and cuisine.",
      imageUrl: chennai,
    coordinates: [13.0827, 80.2707],
  },
  {
    name: "Hyderabad",
    country: "India",
    population: "10,534,418",
    description:
      "Known for its rich history, cultural heritage, and as a major center for the tech industry.",
      imageUrl: hyderabad,
    coordinates: [17.3850, 78.4867],
  },
  {
    name: "Bangalore",
    country: "India",
    population: "12,765,000",
    description: "The Silicon Valley of India, known for its pleasant climate and vibrant tech scene.",
    imageUrl: bangalore,
    coordinates: [12.9716, 77.5946],
  },
  {
    name: "Delhi",
    country: "India",
    population: "31,181,376",
    description: "The capital city of India, famous for its historical monuments and bustling markets.",
    imageUrl: delhi,
    coordinates: [28.6139, 77.2090],
  },
  {
    name: 'Pondicherry',
    country: 'India',
    population: '250,000',
    description: 'A charming coastal city known for its French colonial architecture and serene beaches.',
    imageUrl: pondicherry,
    coordinates: [11.9416, 79.8083],
  },
];

const TopCities = () => {
  return (
    <div>
      <Navbar/>
    <div className="top-cities">
      <h1 className="title">Top Cities in India Where we Provide Services</h1>
      <TopCitiesDescription/>
      <div className="city-list">
        {cities.map((city) => (
          <CityCard key={city.name} city={city} />
        ))}
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default TopCities;
