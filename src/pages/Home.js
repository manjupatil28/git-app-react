import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../authSlice';
import { useNavigate } from 'react-router-dom';


const CLIENT_ID = '0335034375609b7170b7';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handleLogin = () => {
    if (isLoggedIn) {
      return;
    }
    const redirectUri = 'http://localhost:3000/repos';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=user`;
    navigate(authUrl);
    navigate('/repos');
    dispatch(login());
  };

  return (
    <div className='bg-background-image min-h-screen'>
      <div className="bg-purple-700 h-12 flex justify-center items-center">
        <h1 className='text-white font-sans text-center text-2xl'>GitHub OAuth App</h1>
      </div>
      <h3 className='text-xl text-center text-black mt-4 font-sans'>You can view the trending repositories from Github</h3>
      <p className='text-center mt-2 font-sans text-black'>Please log in with your GitHub account to continue.</p>
      <div className="flex justify-center items-center mt-2">
      <button className=' font-sans rounded bg-purple-700 text-white h-8 w-40' onClick={handleLogin}>Login with GitHub</button>
      </div>
    </div>
  );
};

export default Home;
