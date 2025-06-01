import React from 'react';
import Hero from '../../components/Hero/Hero';
import NavSection from '../../components/NavSection/NavSection';
import PopularProducts from '../../components/PopularProducts/PopularProducts';
import { useLoaderData } from 'react-router';

const Home = () => {
  const coffeeDataArray = useLoaderData();
  console.log(coffeeDataArray);
    return (
      <div>
        <Hero></Hero>
        <NavSection></NavSection>
        <PopularProducts coffeeDataArray={coffeeDataArray}></PopularProducts>
      </div>
    );
};

export default Home;