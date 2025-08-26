import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Mountain, Users, Calendar, Star, Filter, Search, Globe } from 'lucide-react';
import { destinations } from '../data/mockData';

const Destinations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const regions = ['All Regions', 'Asia', 'Europe', 'Africa', 'South America', 'North America'];

  const getRegion = (country: string) => {
    if (country.includes('Nepal')) return 'Asia';
    if (country.includes('Chile') || country.includes('Argentina')) return 'South America';
    if (country.includes('France') || country.includes('Switzerland') || country.includes('Italy')) return 'Europe';
    if (country.includes('Tanzania')) return 'Africa';
    return 'Other';
  };

  const filteredDestinations = destinations
    .filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dest.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = !selectedRegion || selectedRegion === 'All Regions' || 
                           getRegion(dest.country) === selectedRegion;
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'treks': return b.treksCount - a.treksCount;
        case 'popularity':
        default: return b.treksCount - a.treksCount;
      }
    });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg"
          alt="Mountain destinations"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4 animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-6">
              Legendary Trekking
              <span className="block text-emerald-400 animate-gradient-text">Destinations</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Discover the world's most spectacular mountain ranges and wilderness areas, each offering unique adventures and unforgettable experiences.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-emerald-400" />
                <span>10+ Destinations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mountain className="h-5 w-5 text-emerald-400" />
                <span>200+ Adventures</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-emerald-400" />
                <span>Expert Guides</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Destinations</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, country, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 appearance-none"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
              >
                <option value="popularity">Most Popular</option>
                <option value="name">Name A-Z</option>
                <option value="treks">Most Adventures</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
          <p className="text-gray-600">
            Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedRegion && selectedRegion !== 'All Regions' && ` in ${selectedRegion}`}
          </p>
          <div className="text-sm text-gray-500">
            Total: {destinations.reduce((sum, dest) => sum + dest.treksCount, 0)} adventures available
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <div 
              key={destination.id} 
              className="group cursor-pointer animate-fade-in-up transform hover:-translate-y-2 transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Region Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-600/90 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-medium">
                      {getRegion(destination.country)}
                    </span>
                  </div>

                  {/* Trek Count Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <div className="flex items-center space-x-1">
                        <Mountain className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium text-gray-900">{destination.treksCount}</span>
                        <span className="text-xs text-gray-600">treks</span>
                      </div>
                    </div>
                  </div>

                  {/* Destination Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                      {destination.name}
                    </h3>
                    <div className="flex items-center text-gray-200 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {destination.country}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-emerald-600/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Mountain className="h-12 w-12 mx-auto mb-4 animate-bounce" />
                      <h4 className="text-xl font-bold mb-2">Explore Adventures</h4>
                      <p className="text-sm opacity-90 mb-4">Discover {destination.treksCount} unique treks</p>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                        <ArrowRight className="h-5 w-5 inline animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {destination.description}
                  </p>

                  {/* Popular Treks */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Popular Adventures:</h4>
                    <div className="space-y-2">
                      {destination.popularTreks.slice(0, 3).map((trek, trekIndex) => (
                        <div key={trekIndex} className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700 hover:text-emerald-600 transition-colors cursor-pointer">
                            {trek}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      to="/treks"
                      className="flex-1 bg-emerald-600 text-white text-center py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 font-medium transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span>View Adventures</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                      <Star className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <Mountain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to discover more destinations.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('');
                setSortBy('popularity');
              }}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="mt-20 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-12 text-center text-white animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our expert team is ready to help you plan the perfect trekking experience. From beginner-friendly trails to extreme expeditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/treks"
              className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Mountain className="h-5 w-5" />
              <span>Browse All Adventures</span>
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Talk to an Expert</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;