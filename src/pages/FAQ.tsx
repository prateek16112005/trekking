import React, { useState } from 'react';
import { 
  ChevronDown, 
  Search, 
  Mountain, 
  Shield, 
  Settings, 
  Calendar, 
  Users, 
  Cloud, 
  Home,
  Dumbbell,
  Filter,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react';
import { faqData } from '../data/faq';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const iconMap = {
    Mountain,
    Shield,
    Settings,
    Calendar,
    Users,
    Cloud,
    Home,
    Dumbbell
  };

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Filter FAQs based on search term and category
  const filteredData = faqData
    .map(category => ({
      ...category,
      faqs: category.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => 
      category.faqs.length > 0 && 
      (selectedCategory === '' || category.category === selectedCategory)
    );

  const totalFAQs = faqData.reduce((sum, category) => sum + category.faqs.length, 0);
  const filteredFAQsCount = filteredData.reduce((sum, category) => sum + category.faqs.length, 0);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
            <HelpCircle className="h-4 w-4" />
            <span>Everything You Need to Know</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Frequently Asked
            <span className="block text-emerald-600 animate-gradient-text">Questions</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in-up-delayed">
            Find answers to common questions about our Himalayan trekking adventures, safety measures, booking process, and more.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto animate-fade-in-up-delayed-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{totalFAQs}+</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">8</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Questions</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 appearance-none"
                >
                  <option value="">All Categories</option>
                  {faqData.map((category) => (
                    <option key={category.category} value={category.category}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
            <span>
              Showing {filteredFAQsCount} of {totalFAQs} questions
              {searchTerm && ` for "${searchTerm}"`}
            </span>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredData.map((category, categoryIndex) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap] || HelpCircle;
            
            return (
              <div 
                key={category.category} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${categoryIndex * 150}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <IconComponent className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                    <p className="text-gray-600">{category.faqs.length} questions</p>
                  </div>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const itemId = `${category.category}-${faqIndex}`;
                    const isOpen = openItems.includes(itemId);
                    
                    return (
                      <div 
                        key={faqIndex}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${(categoryIndex * 150) + (faqIndex * 100)}ms` }}
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 rounded-xl"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                              isOpen ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="px-6 pb-4">
                            <div className="border-t border-gray-100 pt-4">
                              <p className="text-gray-700 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse all categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
            >
              Show All Questions
            </button>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-20 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-12 text-center text-white animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our expert team is here to help you plan your perfect Himalayan adventure. Get in touch for personalized assistance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <Phone className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <div className="text-sm opacity-90">
                <a href="tel:+917817912062" className="hover:opacity-100 transition-opacity block">+91 78179 12062</a>
                <a href="tel:+918650561564" className="hover:opacity-100 transition-opacity block">+91 86505 61564</a>
              </div>
              <p className="text-xs opacity-75 mt-1">Mon-Fri 9AM-6PM IST</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <Mail className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <a href="mailto:expeditionhappiness07@gmail.com" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                expeditionhappiness07@gmail.com
              </a>
              <p className="text-xs opacity-75 mt-1">24-hour response time</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <MessageCircle className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm opacity-90">Instant support</p>
              <p className="text-xs opacity-75 mt-1">Available 10AM-8PM IST</p>
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;