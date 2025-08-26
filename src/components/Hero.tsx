import React from 'react';
import { ArrowRight, Mountain, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Discover the Magic of
          <span className="block text-orange-400">Himalayan Adventures</span>
        </h1>
        
        <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Experience breathtaking treks, pristine valleys, and unforgettable moments in the heart of the Himalayas
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            to="/recommend"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg"
          >
            Find My Perfect Trek
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link
            to="/treks"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2"
          >
            View All Treks
            <Mountain className="w-5 h-5" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Mountain className="w-8 h-8 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-orange-400">10+</div>
            <div className="text-gray-300">Epic Treks</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-8 h-8 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-orange-400">2000+</div>
            <div className="text-gray-300">Happy Trekkers</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-8 h-8 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-orange-400">5+</div>
            <div className="text-gray-300">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;