import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Users, Mountain } from 'lucide-react';
import { createContactInquiry } from '../lib/supabase';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiry_type: 'general' as 'general' | 'booking' | 'support' | 'partnership'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createContactInquiry(formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiry_type: 'general'
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg"
          alt="Contact us"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4 animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-6">
              Get in Touch
              <span className="block text-emerald-400 animate-gradient-text">Plan Your Himalayan Adventure</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Ready to embark on your next Himalayan trekking adventure? Our expert team is here to help you plan the perfect expedition in the Indian mountains.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Let's Start Planning Your Trek</h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're a first-time trekker or an experienced mountaineer, we're here to create an unforgettable Himalayan adventure tailored to your needs and experience level.
            </p>

            {/* Contact Methods */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center space-x-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <div className="text-gray-600">
                    <a href="tel:+917817912062" className="hover:text-emerald-600 transition-colors block">+91 78179 12062</a>
                    <a href="tel:+918650561564" className="hover:text-emerald-600 transition-colors block">+91 86505 61564</a>
                  </div>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM IST</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a href="mailto:expeditionhappiness07@gmail.com" className="text-gray-600 hover:text-emerald-600 transition-colors">
                    expeditionhappiness07@gmail.com
                  </a>
                  <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <div className="bg-emerald-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Office</h3>
                  <div className="text-gray-600 mb-3">
                    <p className="font-medium text-gray-900">GURUGRAM OFFICE</p>
                    <p>M3M Marina, Sector 68 - 122101</p>
                  </div>
                  <div className="text-gray-600">
                    <p className="font-medium text-gray-900">UTTARAKHAND OFFICE</p>
                    <p>Chamoli, Joshimath, near military hospital - 246443</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-emerald-50 rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Expedition Happiness?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mountain className="h-5 w-5 text-emerald-600" />
                  <span className="text-gray-700">15+ years of Himalayan trekking expertise</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-emerald-600" />
                  <span className="text-gray-700">5000+ happy trekkers across India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  <span className="text-gray-700">24/7 support during treks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700 mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours to help plan your perfect Himalayan adventure.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                    <select
                      value={formData.inquiry_type}
                      onChange={(e) => setFormData({...formData, inquiry_type: e.target.value as any})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="booking">Trek Booking Question</option>
                      <option value="support">Support</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      placeholder="Tell us about your dream Himalayan adventure or ask any questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 font-medium flex items-center justify-center space-x-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How far in advance should I book my trek?",
                answer: "We recommend booking 2-3 months in advance for popular treks like Valley of Flowers and Kedarkantha, especially during peak seasons. However, we can often accommodate last-minute bookings based on availability."
              },
              {
                question: "What's included in the trek price?",
                answer: "Our trek prices include professional guides, accommodation, meals during the trek, permits, transportation from base points, and group equipment. Personal gear, travel to base points, and travel insurance are not included."
              },
              {
                question: "Do I need previous trekking experience?",
                answer: "It depends on the trek! We offer adventures for all levels, from beginner-friendly treks like Har Ki Dun to challenging expeditions like Satopanth Lake. Our team will help match you with the perfect trek for your experience level."
              },
              {
                question: "What happens if weather affects my trek?",
                answer: "Safety is our top priority. If weather conditions are unsafe, we'll modify the itinerary or reschedule when possible. We'll work with you to find the best solution and ensure your safety throughout the journey."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;