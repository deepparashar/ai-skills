import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [goals, setGoals] = useState('');
  const [resume, setResume] = useState(null);

  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!resume) {
      alert("Please upload your resume PDF");
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('skills', skills);
    formData.append('interests', interests);
    formData.append('goals', goals);

    const response = await axios.post(
      `${backendUrl}/api/auth/upload-resume`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          // Don't set Content-Type; axios and browser will set it automatically for FormData
        },
      }
    );

    const data = response.data;

    if (data.success) {
      toast.success('Profile saved and resume uploaded!');
      navigate('/recommendation');
    } else {
      toast.error('Upload failed: ' + data.message);
    }
  } catch (error) {
    console.error('Error uploading resume:', error);
    toast.error('Something went wrong');
  }
};



  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center min-h-screen bg-black text-white px-4'>
        <form onSubmit={handleSubmit} className='w-full max-w-md bg-white/10 p-8 rounded-xl shadow-md'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>Complete Your Profile</h2>

          <label className='block mb-2'>Skills (comma-separated)</label>
          <input
            type='text'
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder='e.g. JavaScript, React, Node'
            className='w-full px-4 py-2 mb-4 rounded border outline-none'
          />

          <label className='block mb-2'>Interests</label>
          <input
            type='text'
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder='e.g. Web Dev, AI, Design'
            className='w-full px-4 py-2 mb-4 rounded border outline-none'
          />

          <label className='block mb-2'>Career Goals</label>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder='e.g. Become a Frontend Developer...'
            className='w-full px-4 py-2 mb-4 rounded  border outline-none resize-none'
          />

          <label className='block mb-2'>Upload Resume (PDF)</label>
          <input
            type='file'
            accept='.pdf'
            onChange={(e) => setResume(e.target.files[0])}
            className='w-full px-4 py-2 mb-6 rounded border outline-none'
          />

          <button type='submit' className='w-full bg-blue-600 py-2 rounded-full font-medium hover:bg-blue-700'>
            Save & Get Recommendations
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
