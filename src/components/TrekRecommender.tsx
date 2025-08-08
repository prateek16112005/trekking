import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mountain, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  Filter,
  MapPin,
  Calendar,
  Zap,
  Heart,
  RefreshCw,
  CheckCircle
} from 'lucide-react';
import { featuredTreks } from '../data/mockData';
import { TrekItinerary } from '../types';

interface UserPreferences {
  experience: 'beginner' | 'intermediate' | 'advanced' | '';
  duration: 'short' | 'medium' | 'long' | '';
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme' | '';
  location: 'uttarakhand' | 'himachal' | 'any' | '';
  season: 'summer' | 'winter' | 'monsoon' | 'any' | '';
  budget: 'low' | 'medium' | 'high' | '';
  interests: string[];
}

const TrekRecommender: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    experience: '',
    duration: '',
    difficulty: '',
    location: '',
    season: '',
    budget: '',
    interests: []
  });
  
  const [recommendations, setRecommendations] = useState<TrekItinerary[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const interests = [
    'Photography', 'Wildlife', 'Cultural Experience', 'High Altitude Lakes',
    'Snow Trekking', 'Alpine Flowers', 'Sacred Sites', 'Technical Climbing',
    'Glaciers', 'Mountain Peaks', 'Village Life', 'Adventure Sports'
  ];

  const questions = [
    {
      id: 'experience',
      title: 'What\'s your trekking experience?',
      options: [
        { value: 'beginner', label: 'Beginner', desc: 'First time or limited experience' },
        { value: 'intermediate', label: 'Intermediate', desc: '2-5 treks completed' },
        { value: 'advanced', label: 'Advanced', desc: '5+ treks, comfortable with challenges' }
      ]
    },
    {
      id: 'duration',
      title: 'How many days do you prefer?',
      options: [
        { value: 'short', label: '3-5 Days', desc: 'Quick weekend getaway' },
        { value: 'medium', label: '6-8 Days', desc: 'Week-long adventure' },
        { value: 'long', label: '9+ Days', desc: 'Extended expedition' }
      ]
    },
    {
      id: 'difficulty',
      title: 'What difficulty level interests you?',
      options: [
        { value: 'Easy', label: 'Easy', desc: 'Gentle trails, suitable for families' },
        { value: 'Moderate', label: 'Moderate', desc: 'Some challenging sections' },
        { value: 'Challenging', label: 'Challenging', desc: 'Steep climbs, high altitude' },
        { value: 'Extreme', label: 'Extreme', desc: 'Technical skills required' }
      ]
    },
    {
      id: 'location',
      title: 'Which region do you prefer?',
      options: [
        { value: 'uttarakhand', label: 'Uttarakhand', desc: 'Garhwal Himalayas, spiritual sites' },
        { value: 'himachal', label: 'Himachal Pradesh', desc: 'Diverse landscapes, apple valleys' },
        { value: 'any', label: 'No Preference', desc: 'Open to all locations' }
      ]
    },
    {
      id: 'season',
      title: 'When do you plan to trek?',
      options: [
        { value: 'summer', label: 'Summer (Apr-Jun)', desc: 'Pleasant weather, clear views' },
        { value: 'winter', label: 'Winter (Dec-Mar)', desc: 'Snow trekking, unique experience' },
        { value: 'monsoon', label: 'Monsoon (Jul-Sep)', desc: 'Lush greenery, flowers' },
        { value: 'any', label: 'Flexible', desc: 'Can trek anytime' }
      ]
    },
    {
      id: 'budget',
      title: 'What\'s your budget range?',
      options: [
        { value: 'low', label: 'Budget (₹10k-15k)', desc: 'Value for money treks' },
        { value: 'medium', label: 'Standard (₹15k-25k)', desc: 'Good balance of comfort & adventure' },
        { value: 'high', label: 'Premium (₹25k+)', desc: 'Luxury experience, best facilities' }
      ]
    }
  ];

  const calculateRecommendations = () => {
    let scored = featuredTreks.map(trek => {
      let score = 0;
      let reasons = [];

      // Experience matching
      if (preferences.experience === 'beginner' && trek.difficulty === 'Easy') {
        score += 30;
        reasons.push('Perfect for beginners');
      } else if (preferences.experience === 'intermediate' && trek.difficulty === 'Moderate') {
        score += 25;
        reasons.push('Great for intermediate trekkers');
      } else if (preferences.experience === 'advanced' && (trek.difficulty === 'Challenging' || trek.difficulty === 'Extreme')) {
        score += 30;
        reasons.push('Challenging adventure for experts');
      }

      // Duration matching
      if (preferences.duration === 'short' && trek.duration <= 5) {
        score += 20;
        reasons.push('Perfect duration for quick getaway');
      } else if (preferences.duration === 'medium' && trek.duration >= 6 && trek.duration <= 8) {
        score += 20;
        reasons.push('Ideal week-long adventure');
      } else if (preferences.duration === 'long' && trek.duration >= 9) {
        score += 20;
        reasons.push('Extended expedition experience');
      }

      // Difficulty matching
      if (preferences.difficulty && trek.difficulty === preferences.difficulty) {
        score += 25;
        reasons.push(`Matches your ${preferences.difficulty.toLowerCase()} preference`);
      }

      // Location matching
      if (preferences.location === 'uttarakhand' && trek.location.includes('Uttarakhand')) {
        score += 20;
        reasons.push('Located in beautiful Uttarakhand');
      } else if (preferences.location === 'himachal' && trek.location.includes('Himachal')) {
        score += 20;
        reasons.push('Located in scenic Himachal Pradesh');
      } else if (preferences.location === 'any') {
        score += 10;
      }

      // Season matching
      if (preferences.season === 'winter' && trek.bestSeasons.some(season => 
        season.includes('December') || season.includes('January') || season.includes('February') || season.includes('March'))) {
        score += 15;
        reasons.push('Perfect for winter trekking');
      } else if (preferences.season === 'summer' && trek.bestSeasons.some(season => 
        season.includes('April') || season.includes('May') || season.includes('June'))) {
        score += 15;
        reasons.push('Ideal for summer adventures');
      } else if (preferences.season === 'monsoon' && trek.bestSeasons.some(season => 
        season.includes('July') || season.includes('August') || season.includes('September'))) {
        score += 15;
        reasons.push('Great for monsoon season');
      }

      // Budget matching
      if (preferences.budget === 'low' && trek.price <= 15000) {
        score += 15;
        reasons.push('Budget-friendly option');
      } else if (preferences.budget === 'medium' && trek.price > 15000 && trek.price <= 25000) {
        score += 15;
        reasons.push('Great value for money');
      } else if (preferences.budget === 'high' && trek.price > 25000) {
        score += 15;
        reasons.push('Premium experience');
      }

      // Interest matching
      preferences.interests.forEach(interest => {
        if (trek.highlights.some(highlight => 
          highlight.toLowerCase().includes(interest.toLowerCase()) ||
          trek.description.toLowerCase().includes(interest.toLowerCase())
        )) {
          score += 10;
          reasons.push(`Matches your interest in ${interest.toLowerCase()}`);
        }
      });

      // Rating bonus
      score += trek.rating * 2;

      return { ...trek, score, reasons: reasons.slice(0, 3) };
    });

    // Sort by score and take top 3
    scored.sort((a, b) => b.score - a.score);
    setRecommendations(scored.slice(0, 3));
    setShowResults(true);
  };

  const handleOptionSelect = (questionId: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateRecommendations();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetRecommender = () => {
    setPreferences({
      experience: '',
      duration: '',
      difficulty: '',
      location: '',
      season: '',
      budget: '',
      interests: []
    });
    setCurrentStep(0);
    setShowResults(false);
    setRecommendations([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Challenging': return 'text-orange-600 bg-orange-100';
      case 'Extreme': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (showResults) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="h-4 w-4" />
            <span>Personalized Recommendations</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Perfect Treks for You
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Based on your preferences, here are the best trek recommendations tailored just for you.
          </p>
          <button
            onClick={resetRecommender}
            className="inline-flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Start Over</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {recommendations.map((trek, index) => (
            <div 
              key={trek.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group animate-fade-in-up transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {index === 0 && (
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-center py-2 font-semibold">
                  🏆 Best Match
                </div>
              )}
              
              <div className="relative overflow-hidden">
                <img
                  src={trek.image}
                  alt={trek.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(trek.difficulty)} backdrop-blur-sm`}>
                    {trek.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{trek.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {trek.location}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {trek.title}
                </h3>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-emerald-600 mb-2">Why this trek is perfect for you:</h4>
                  <ul className="space-y-1">
                    {(trek as any).reasons.map((reason: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

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
                    <span className="text-2xl font-bold text-gray-900">₹{trek.price.toLocaleString()}</span>
                    <span className="text-gray-500 ml-1">per person</span>
                  </div>
                  <Link
                    to={`/treks/${trek.id}`}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up">
          <p className="text-gray-600 mb-6">
            Not satisfied with these recommendations? 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetRecommender}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
            >
              Try Different Preferences
            </button>
            <Link
              to="/treks"
              className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105"
            >
              Browse All Treks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = currentStep < questions.length ? questions[currentStep] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Zap className="h-4 w-4" />
          <span>Smart Trek Finder</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Trek
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Answer a few questions and we'll recommend the best treks based on your preferences and experience level.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm text-gray-600">{currentStep + 1} of {questions.length + 1}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / (questions.length + 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {currentQuestion ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-up">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {currentQuestion.title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg transform hover:scale-105 ${
                  preferences[currentQuestion.id as keyof UserPreferences] === option.value
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <h4 className="font-semibold text-gray-900 mb-2">{option.label}</h4>
                <p className="text-sm text-gray-600">{option.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={!preferences[currentQuestion.id as keyof UserPreferences]}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-up">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What interests you most? (Optional)
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Select any interests that appeal to you. This helps us fine-tune our recommendations.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm hover:shadow-md transform hover:scale-105 ${
                  preferences.interests.includes(interest)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              Previous
            </button>
            <button
              onClick={calculateRecommendations}
              className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 font-semibold transform hover:scale-105 flex items-center space-x-2"
            >
              <Heart className="h-5 w-5" />
              <span>Get My Recommendations</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrekRecommender;