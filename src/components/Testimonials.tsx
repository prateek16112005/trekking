import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/mockData';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Stories from Fellow Adventurers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from trekkers who have embarked on unforgettable journeys with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-emerald-200" />
                <p className="text-gray-700 italic mb-4 pl-6">
                  "{testimonial.comment}"
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-emerald-600 font-medium">
                  Trek: {testimonial.trekName}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex -space-x-2">
              {testimonials.map((testimonial) => (
                <img
                  key={testimonial.id}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">Join 5,000+ Happy Trekkers</p>
              <p className="text-xs text-gray-600">Average rating: 4.8/5 ⭐</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;