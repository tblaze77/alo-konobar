import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      APLIKACIJA ZA GOSTA
      <Link to={'/menu/1'}>
        <button>VIDI MENI</button>
      </Link>
    </div>
  );
};

export default Home;
