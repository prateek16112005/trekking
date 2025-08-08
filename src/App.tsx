import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Treks from './pages/Treks';
import TrekDetail from './pages/TrekDetail';
import Destinations from './pages/Destinations';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import TrekRecommenderPage from './pages/TrekRecommender';

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/treks" element={<Treks />} />
            <Route path="/treks/:id" element={<TrekDetail />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/recommend" element={<TrekRecommenderPage />} />
            <Route path="/about" element={<div className="pt-16 p-8 text-center">About page coming soon...</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;