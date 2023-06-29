import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepos } from '../reposSlice';

const RepoDetails = () => {
  const { owner, repoName } = useParams();
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.repos.repos);
  const repo = repos.find((repo) => repo.owner.login === owner && repo.name === repoName);

  useEffect(() => {
    dispatch(fetchRepos());
  }, [dispatch]);

  if (!repo) {
    return <div className='text-center font-sans text-3xl mt-4'>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-purple-700 h-12 flex items-center">
        <Link
          to="/repos"
          className="text-white font-sans px-4 py-2 bg-purple-700 rounded ml-4 flex items-center"
        >
          <span className="mr-2">&#9664;</span> Back
        </Link>
      </div>
      <div className="bg-white h-screen flex items-center justify-center p-6">
        <div className="flex flex-col items-center text-center font-sans">
          <img
            src={repo.owner.avatar_url}
            alt={`${repo.owner.login}'s Avatar`}
            className="h-48 w-48 rounded-full mb-6"
          />
          <h1 className="text-4xl font-normal mb-2">{repo.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{repo.description}</p>
          <p className="text-xl text-gray-600 mb-2">Owner: {repo.owner.login}</p>
          <p className="text-xl text-gray-600 mb-2">Languages: {repo.language}</p>
          <p className="text-xl text-gray-600 mb-2">Stars: {repo.stargazers_count}</p>
          <p className="text-xl text-gray-600 mb-2">Forks: {repo.forks_count}</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default RepoDetails;
