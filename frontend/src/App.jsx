import React, { useContext } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Recommendation from './pages/Recommendation';
import { Toaster } from 'react-hot-toast';
import { AppContext } from './context/AppContext';

const App = () => {
  const { authUser, loading } = useContext(AppContext); // ✅ use context instead of localStorage

  if (loading) {
    return <div className="text-white flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-[#000]'>
      <Toaster />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/' />} />
        <Route path='/recommendation' element={authUser ? <Recommendation /> : <Navigate to='/' />} />
      </Routes>
    </div>
  );
};

export default App;
