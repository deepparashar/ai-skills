import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const RecommendationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const {data} = await axios.get(`${backendUrl}/api/ai/recommendation`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (data.success) {
          setRecommendations(data.recommendations);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar />
      <div className='max-w-3xl mx-auto py-10 px-5'>
        <h1 className='text-3xl font-bold mb-6'>🎯 Your Career Recommendations</h1>

        <hr className='mb-4 text-gray-500' />

        {loading ? (
          <p>Loading recommendations...</p>
        ) : recommendations ? (
          <pre className='whitespace-pre-wrap text-white text-base'>
            {recommendations}
          </pre>
        ) : (
          <p>No recommendations found. Please complete your profile.</p>
        )}

        <div className='text-center mt-8'>
          <button
            onClick={() => navigate('/profile')}
            className='bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700'
          >
            🔄 Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
