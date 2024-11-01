import React from 'react';
import { useNavigate } from 'react-router-dom';
import OceanWaveLogo from '../components/OceanWaveLogo';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <OceanWaveLogo className="h-24 w-24" />
        </div>
        <h1 className="text-4xl font-bold mb-6">
          Build and Deploy with Confidence
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A unified platform for seamless development and deployment
        </p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;