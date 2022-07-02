import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      Guest application
      <Link to={'/menu/1'}>
        <button>View menu</button>
      </Link>
    </div>
  );
};

export default Home;
