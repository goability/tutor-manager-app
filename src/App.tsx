import React from 'react';
import Splash from './components/Splash';
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Course from './components/Course';
import Privacy from './components/Privacy';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/" element={<Splash />} />
          <Route path="/courses/:course_name" element={<Course />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};
export default App;