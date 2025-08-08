import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Mountain className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold">Expedition Happiness</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your trusted partner for epic Himalayan trekking adventures. Creating unforgettable memories in the Indian mountains since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/treks" className="text-gray-400 hover:text-white transition-colors">All Treks</Link></li>
              <li><Link to="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Popular Destinations</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Uttarakhand Himalayas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Himachal Pradesh</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Garhwal Region</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Winter Treks</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">High Altitude Lakes</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div className="text-gray-400">
                  <div className="font-medium text-white mb-1">GURUGRAM OFFICE</div>
                  <div>M3M Marina, Sector 68 - 122101</div>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div className="text-gray-400">
                  <div className="font-medium text-white mb-1">UTTARAKHAND OFFICE</div>
                  <div>Chamoli, Joshimath, near military hospital - 246443</div>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div className="text-gray-400">
                  <a href="tel:+918650561564" className="hover:text-white transition-colors block">+91 86505 61564</a>
                  <a href="tel:+917817912062" className="hover:text-white transition-colors block">+91 78179 12062</a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <a href="mailto:expeditionhappiness07@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  expeditionhappiness07@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-emerald-400 text-white"
                />
                <button className="bg-emerald-600 px-4 py-2 rounded-r-lg hover:bg-emerald-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Expedition Happiness Treks. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/booking" className="text-gray-400 hover:text-white text-sm transition-colors">
                Booking Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;