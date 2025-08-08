import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, Mountain, Filter, ArrowRight, Calendar } from 'lucide-react';
import { featuredTreks } from '../data/mockData';

const Treks: React.FC = () => {
  const [filters, setFilters] = useState({
    difficulty: '',
    duration: '',
    priceRange: ''
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Challenging': return 'text-orange-600 bg-orange-100';
      case 'Extreme': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredTreks = featuredTreks.filter(trek => {
    if (filters.difficulty && trek.difficulty !== filters.difficulty) return false;
    if (filters.duration) {
      const duration = parseInt(filters.duration);
      if (duration === 7 && trek.duration > 7) return false;
      if (duration === 14 && (trek.duration <= 7 || trek.duration > 14)) return false;
      if (duration === 15 && trek.duration <= 14) return false;
    }
    if (filters.priceRange) {
      const price = parseInt(filters.priceRange);
      if (price === 1000 && trek.price > 1000) return false;
      if (price === 2000 && (trek.price <= 1000 || trek.price > 2000)) return false;
      if (price === 3000 && trek.price <= 2000) return false;
    }
    return true;
  });

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 py-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            All Trekking Adventures
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up-delayed">
            Explore our complete collection of world-class trekking itineraries, from beginner-friendly walks to extreme mountain expeditions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 animate-fade-in-up">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </div>

              <div className="space-y-6">
                <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Difficulty</label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  >
                    <option value="">All Levels</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Challenging">Challenging</option>
                    <option value="Extreme">Extreme</option>
                  </select>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Duration</label>
                  <select
                    value={filters.duration}
                    onChange={(e) => setFilters({...filters, duration: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  >
                    <option value="">Any Duration</option>
                    <option value="7">Up to 7 days</option>
                    <option value="14">8-14 days</option>
                    <option value="15">15+ days</option>
                  </select>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  >
                    <option value="">Any Price</option>
                    <option value="1000">Under $1,000</option>
                    <option value="2000">$1,000 - $2,000</option>
                    <option value="3000">$2,000+</option>
                  </select>
                </div>

                <button
                  onClick={() => setFilters({ difficulty: '', duration: '', priceRange: '' })}
                  className="w-full text-emerald-600 hover:text-emerald-700 font-medium py-2 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: '400ms' }}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Trek Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8 animate-fade-in-up">
              <p className="text-gray-600">
                Showing {filteredTreks.length} of {featuredTreks.length} adventures
              </p>
              <select className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300">
                <option>Sort by Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Duration: Short to Long</option>
                <option>Difficulty: Easy to Hard</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredTreks.map((trek, index) => (
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
                        <p className="font-semibold">Reserve Your Spot</p>
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
                        <span className="text-2xl font-bold text-gray-900">${trek.price}</span>
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

            {filteredTreks.length === 0 && (
              <div className="text-center py-16 animate-fade-in-up">
                <Mountain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No adventures found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                <button
                  onClick={() => setFilters({ difficulty: '', duration: '', priceRange: '' })}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treks;