import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for routing

const NotFound = () => {
  return (
    <div>
     <div className="bg-purple-700 h-12 flex items-center">
        <Link to="/" className="text-white font-sans text-center ml-4 text-xl">Home</Link>
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-xl text-gray-600">Hmmm....The page you're looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
