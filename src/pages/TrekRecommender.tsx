import React from 'react';
import TrekRecommender from '../components/TrekRecommender';

const TrekRecommenderPage: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <TrekRecommender />
    </div>
  );
};

export default TrekRecommenderPage;