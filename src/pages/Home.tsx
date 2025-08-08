import React from 'react';
import Hero from '../components/Hero';
import FeaturedTreks from '../components/FeaturedTreks';
import Destinations from '../components/Destinations';
import Testimonials from '../components/Testimonials';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedTreks />
      <Destinations />
      <Testimonials />
    </div>
  );
};

export default Home;