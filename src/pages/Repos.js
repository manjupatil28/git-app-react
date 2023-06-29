import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepos } from '../reposSlice';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../authSlice';

const Repos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const filteredRepos = useSelector((state) => state.repos.filteredRepos);
  const isLoading = useSelector((state) => state.repos.isLoading);

  useEffect(() => {
    dispatch(fetchRepos());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/');
  };

  if (isLoading) {
    return <p className="text-center font-sans text-3xl mt-4">Loading...</p>;
  }

  if (filteredRepos.length === 0) {
    return <p className="text-center font-sans text-3xl mt-4">No repositories found.</p>;
  }

  return (
    <div>
      <div className="bg-purple-700 h-12 flex items-center">
        <h1 className="text-white font-sans text-2xl pl-4 mx-auto">Trending Repositories</h1>
        <button
          className="text-white font-sans px-4 py-2 bg-purple-500 rounded mr-1"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="mt-4 grid lg-grid-cols-2 grid-cols-1 md:grid-cols-2 gap-4 mx-4">
        {filteredRepos.map((repo) => (
          <div key={repo.id} className="bg-white p-4 border border-gray-300 shadow-md flex items-center">
            <img
              src={repo.owner.avatar_url}
              alt={`${repo.owner.login}'s Avatar`}
              className="h-full w-32 rounded mr-4"
            />
            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">
                <Link to={`/repos/${repo.owner.login}/${repo.name}`}>{repo.name}</Link>
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Author: {repo.owner.login}</p>
                <p className="text-sm text-gray-600">Languages: {repo.language}</p>
                <p className="text-sm text-gray-600">Stars: {repo.stargazers_count}</p>
                <p className="text-sm text-gray-600">Forks: {repo.forks_count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Repos;
