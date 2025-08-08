import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, Mountain, ArrowRight, Calendar } from 'lucide-react';
import { featuredTreks } from '../data/mockData';

const FeaturedTreks: React.FC = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Challenging': return 'text-orange-600 bg-orange-100';
      case 'Extreme': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Trekking Adventures
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked expeditions that showcase the world's most spectacular mountain landscapes and cultural experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTreks.map((trek, index) => (
            <div 
              key={trek.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group animate-fade-in-up transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={trek.image}
                  alt={trek.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 left-4 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(trek.difficulty)} backdrop-blur-sm`}>
                    {trek.difficulty}
                  </span>
                </div>
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current animate-pulse" />
                    <span className="text-sm font-medium text-gray-900">{trek.rating}</span>
                    <span className="text-sm text-gray-600">({trek.reviewCount})</span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-emerald-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Calendar className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">Reserve Now</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Mountain className="h-4 w-4 mr-1" />
                  {trek.location}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {trek.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {trek.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {trek.duration} days
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Max {trek.maxGroupSize}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">Rs.{trek.price}</span>
                    <span className="text-gray-500 ml-1">per person</span>
                  </div>
                  <Link
                    to={`/treks/${trek.id}`}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-300 flex items-center space-x-2 group transform hover:scale-105"
                  >
                    <span>Reserve Spot</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/recommend"
              className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-xl"
            >
              <span>Find My Perfect Trek</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/treks"
              className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-xl"
            >
              <span>View All Adventures</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTreks;