import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Repos from './pages/Repos';
import RepoDetails from './pages/RepoDetails';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repos/*" element={<ProtectedRepos />} />
          <Route path="/repos/:owner/:repoName" element={<ProtectedRepoDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
};

const ProtectedRepos = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Repos />;
};

const ProtectedRepoDetails = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <RepoDetails />;
};

export default App;
