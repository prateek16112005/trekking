import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Users, Mountain, Calendar, MapPin, ChevronRight, Heart, Share2, Send, CheckCircle, Backpack, Wifi, Droplets, Shield, FileText, Shirt, Footprints, Camera } from 'lucide-react';
import { featuredTreks } from '../data/mockData';
import { saveReservationToGoogleSheets, type ReservationData } from '../lib/googleSheets';

const TrekDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reservationData, setReservationData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    preferred_date: '',
    group_size: '1',
    message: ''
  });
  const [modalImage, setModalImage] = useState<string | null>(null);

  const trek = featuredTreks.find(t => t.id === id);

  if (!trek) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Trek not found</h1>
          <Link to="/treks" className="text-emerald-600 hover:text-emerald-700">
            Back to all treks
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Challenging': return 'text-orange-600 bg-orange-100';
      case 'Extreme': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reservationPayload: ReservationData = {
        trek_id: trek.id,
        trek_title: trek.title,
        ...reservationData
      };

      await saveReservationToGoogleSheets(reservationPayload);

      setSubmitSuccess(true);
      setReservationData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        preferred_date: '',
        group_size: '1',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('There was an error submitting your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Day by Day' },
    ...(trek.galleryImages && trek.galleryImages.length > 0 ? [{ id: 'gallery', label: 'Photo Gallery' }] : []),
    { id: 'inclusions', label: 'What\'s Included' },
    ...(trek.packingChecklist ? [{ id: 'packing', label: 'Packing Guide' }] : []),
    ...(trek.facilities ? [{ id: 'facilities', label: 'Facilities & Safety' }] : []),
    { id: 'reservation', label: 'Make Reservation' }
  ];

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-6 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link to="/treks" className="text-gray-500 hover:text-gray-700 transition-colors">Adventures</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{trek.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={trek.image}
          alt={trek.title}
          className="w-full h-full object-cover animate-slow-zoom"
          onError={(e) => {
            console.error(`Failed to load main image: ${trek.image}`);
            // Fallback to a default image
            e.currentTarget.src = 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white animate-fade-in-up">
          <div className="flex items-center space-x-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(trek.difficulty)} backdrop-blur-sm`}>
              {trek.difficulty}
            </span>
            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current animate-pulse" />
              <span className="text-sm font-medium">{trek.rating}</span>
              <span className="text-sm opacity-75">({trek.reviewCount} reviews)</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">{trek.title}</h1>
          <div className="flex items-center text-lg">
            <MapPin className="h-5 w-5 mr-2" />
            {trek.location}
          </div>
        </div>
        <div className="absolute top-6 right-6 flex space-x-3 animate-fade-in-up">
          <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
            <Heart className="h-5 w-5" />
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: Clock, value: `${trek.duration} Days`, label: 'Duration', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
                { icon: Mountain, value: trek.elevation, label: 'Max Elevation', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
                { icon: Users, value: trek.maxGroupSize, label: 'Group Size', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
                { icon: Calendar, value: trek.bestSeasons.join(', '), label: 'Best Seasons', bgColor: 'bg-purple-50', textColor: 'text-purple-600' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-4 ${stat.bgColor} rounded-xl animate-fade-in-up transform hover:scale-105 transition-all duration-300`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className={`h-8 w-8 ${stat.textColor} mx-auto mb-2`} />
                  <div className="font-semibold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8 animate-fade-in-up">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Trek</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">{trek.description}</p>
                    
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {trek.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center space-x-3 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Day by Day Itinerary</h3>
                  <div className="space-y-6">
                    {trek.dayByDay.map((day, index) => (
                      <div 
                        key={day.day} 
                        className="border border-gray-200 rounded-xl p-6 animate-fade-in-up hover:shadow-lg transition-all duration-300"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold animate-pulse">
                            {day.day}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{day.title}</h4>
                            <p className="text-gray-700 mb-4">{day.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              {day.distance && (
                                <div>
                                  <span className="font-medium text-gray-900">Distance:</span>
                                  <span className="text-gray-600 ml-2">{day.distance}</span>
                                </div>
                              )}
                              {day.elevation && (
                                <div>
                                  <span className="font-medium text-gray-900">Elevation:</span>
                                  <span className="text-gray-600 ml-2">{day.elevation}</span>
                                </div>
                              )}
                              <div>
                                <span className="font-medium text-gray-900">Accommodation:</span>
                                <span className="text-gray-600 ml-2">{day.accommodation}</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <span className="font-medium text-gray-900">Meals:</span>
                              <span className="text-gray-600 ml-2">{day.meals.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && trek.galleryImages && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {trek.galleryImages.map((image, index) => (
                        <div 
                          key={index}
                          className="relative overflow-hidden rounded-xl group animate-fade-in-up cursor-pointer"
                          style={{ animationDelay: `${index * 150}ms` }}
                          onClick={() => setModalImage(image)}
                        >
                          <img
                            src={image}
                            alt={`${trek.title} - Photo ${index + 1}`}
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'inclusions' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="animate-fade-in-up">
                        <h4 className="font-semibold text-gray-900 mb-4 text-green-600">✓ Included</h4>
                        <ul className="space-y-2 text-gray-700">
                          {trek.inclusions?.map((item, index) => (
                            <li key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                              {item}
                            </li>
                          )) || [
                            'Professional mountain guide',
                            'All accommodation as specified',
                            'All meals during the trek',
                            'All necessary permits',
                            'Airport transfers',
                            'First aid kit',
                            'Group equipment'
                          ].map((item, index) => (
                            <li key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="animate-fade-in-up">
                        <h4 className="font-semibold text-gray-900 mb-4 text-red-600">✗ Not Included</h4>
                        <ul className="space-y-2 text-gray-700">
                          {[
                            'International flights',
                            'Travel insurance',
                            'Personal equipment',
                            'Tips for guides and porters',
                            'Extra meals in cities',
                            'Personal expenses',
                            'Emergency evacuation'
                          ].map((item, index) => (
                            <li key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'packing' && trek.packingChecklist && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Packing Checklist</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {Object.entries(trek.packingChecklist).map(([category, items], categoryIndex) => (
                        <div key={category} className="animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 150}ms` }}>
                          <div className="flex items-center space-x-2 mb-4">
                            {category === 'documents' && <FileText className="h-5 w-5 text-emerald-600" />}
                            {category === 'backpack' && <Backpack className="h-5 w-5 text-emerald-600" />}
                            {category === 'clothing' && <Shirt className="h-5 w-5 text-emerald-600" />}
                            {category === 'footwear' && <Footprints className="h-5 w-5 text-emerald-600" />}
                            {category === 'accessories' && <Camera className="h-5 w-5 text-emerald-600" />}
                            {category === 'others' && <Mountain className="h-5 w-5 text-emerald-600" />}
                            <h4 className="font-semibold text-gray-900 capitalize">{category}</h4>
                          </div>
                          <ul className="space-y-2">
                            {(items as string[]).map((item: string, index: number) => (
                              <li key={index} className="flex items-start space-x-2 text-gray-700 animate-fade-in-up">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'facilities' && trek.facilities && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Facilities & Safety Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {Object.entries(trek.facilities).map(([category, items], categoryIndex) => (
                        <div key={category} className="animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 150}ms` }}>
                          <div className="flex items-center space-x-2 mb-4">
                            {category === 'campsites' && <Mountain className="h-5 w-5 text-emerald-600" />}
                            {category === 'water' && <Droplets className="h-5 w-5 text-emerald-600" />}
                            {category === 'connectivity' && <Wifi className="h-5 w-5 text-emerald-600" />}
                            {category === 'safety' && <Shield className="h-5 w-5 text-emerald-600" />}
                            <h4 className="font-semibold text-gray-900 capitalize">{category}</h4>
                          </div>
                          <ul className="space-y-2">
                            {(items as string[]).map((item: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start space-x-2 text-gray-700 animate-fade-in-up"
                                style={{ animationDelay: `${(categoryIndex * 150) + (index * 50)}ms` }}
                              >
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reservation' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Make Your Reservation</h3>
                    
                    {submitSuccess ? (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in-up">
                        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-green-800 mb-2">Reservation Request Sent!</h4>
                        <p className="text-green-700 mb-6">
                          Thank you for your interest in {trek.title}. Your reservation has been saved to our Google Sheets system. We'll contact you within 24 hours to discuss your adventure and answer any questions.
                        </p>
                        <button
                          onClick={() => setSubmitSuccess(false)}
                          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                        >
                          Submit Another Request
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleReservation} className="bg-gray-50 rounded-xl p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="animate-fade-in-up">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                            <input
                              type="text"
                              required
                              value={reservationData.customer_name}
                              onChange={(e) => setReservationData({...reservationData, customer_name: e.target.value})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                            <input
                              type="email"
                              required
                              value={reservationData.customer_email}
                              onChange={(e) => setReservationData({...reservationData, customer_email: e.target.value})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                              placeholder="Enter your email"
                            />
                          </div>
                          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                              type="tel"
                              value={reservationData.customer_phone}
                              onChange={(e) => setReservationData({...reservationData, customer_phone: e.target.value})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                              placeholder="Enter your phone number"
                            />
                          </div>
                          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                            <input
                              type="date"
                              value={reservationData.preferred_date}
                              onChange={(e) => setReservationData({...reservationData, preferred_date: e.target.value})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                            />
                          </div>
                          <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
                            <select
                              value={reservationData.group_size}
                              onChange={(e) => setReservationData({...reservationData, group_size: e.target.value})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                            >
                              <option value="1">1 Person</option>
                              <option value="2">2 People</option>
                              <option value="3-4">3-4 People</option>
                              <option value="5+">5+ People</option>
                            </select>
                          </div>
                        </div>
                        <div className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                          <textarea
                            rows={4}
                            value={reservationData.message}
                            onChange={(e) => setReservationData({...reservationData, message: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                            placeholder="Any special requirements or questions?"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 font-medium flex items-center justify-center space-x-2 transform hover:scale-105 animate-fade-in-up disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ animationDelay: '600ms' }}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              <span>Sending to Google Sheets...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              <span>Send Reservation Request</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in-up transform hover:scale-105 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">Rs.{trek.price}</div>
                  <div className="text-gray-600">per person</div>
                </div>
                
                <button 
                  onClick={() => setActiveTab('reservation')}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 font-medium mb-4 transform hover:scale-105 animate-pulse-gentle"
                >
                  Reserve Your Spot
                </button>
                
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium transform hover:scale-105">
                  Request Information
                </button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">Free consultation • No payment required</p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-emerald-50 rounded-2xl p-6 animate-fade-in-up transform hover:scale-105 transition-all duration-300">
                <h4 className="font-semibold text-gray-900 mb-4">Need Help Planning?</h4>
                <p className="text-gray-700 text-sm mb-4">
                  Our trek specialists are here to help you plan the perfect adventure.
                </p>
                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 font-medium transform hover:scale-105">
                  Contact a Specialist
                </button>
                <div className="text-center mt-3">
                  <p className="text-sm text-gray-600">Call: +1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setModalImage(null)}>
          <img
            src={modalImage}
            alt="Enlarged"
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute top-8 right-8 text-white text-3xl font-bold"
            onClick={() => setModalImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default TrekDetail;