import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mountain, Star, Calendar, Snowflake, Users, Shield } from 'lucide-react';

const Destinations: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Mountain className="h-4 w-4" />
            <span>4 Epic Adventures Available</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore Legendary
            <span className="block text-emerald-600 animate-gradient-text">Himalayan Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From blooming alpine valleys to sacred glacial lakes, discover four extraordinary trekking destinations that showcase the diverse beauty of the Indian Himalayas.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {[
            { number: '7', label: 'Epic Adventures', icon: Mountain },
            { number: '43', label: 'Total Trek Days', icon: Calendar },
            { number: '5,029m', label: 'Highest Altitude', icon: Snowflake },
            { number: '98%', label: 'Success Rate', icon: Star }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <stat.icon className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 border border-white rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-white rounded-full animate-pulse delay-500"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready for Your Himalayan Adventure?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Choose from our carefully curated collection of treks, each offering unique experiences and unforgettable memories in the Indian Himalayas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/treks"
                  className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Mountain className="h-5 w-5" />
                  <span>View All Adventures</span>
                </Link>
                
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Users className="h-5 w-5" />
                  <span>Talk to Expert</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex items-center justify-center space-x-8 text-sm opacity-80">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>100% Safe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4" />
                  <span>4.7+ Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Expert Guides</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Destinations;