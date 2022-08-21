import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as RoutePaths from '../../constants/RoutePaths';
import AuthContext from '../../context/AuthContext';
import './ButtonGrid.css';
const ButtonGrid = ({ isAdmin }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="button-grid">
      <div className="button-row">
        <button className="homepage-button">
          <Link to={RoutePaths.BRANCH + '/' + user.branch.id + RoutePaths.BRANCH_PRODUCTS}>
            View product from your caffe
          </Link>
        </button>
        <button className="homepage-button">
          <Link to={RoutePaths.BRANCH + '/' + user.branch.id + RoutePaths.ORDERS}>View orders</Link>
        </button>
      </div>
      <div className="button-row">
        <button className={isAdmin ? 'homepage-button' : 'one-button-row'}>
          <Link to={RoutePaths.BRANCH + '/' + user.branch.id + RoutePaths.ORDER + RoutePaths.CREATE}>
            Create new order
          </Link>
        </button>
        {isAdmin ? (
          <button className="homepage-button">
            <Link to={RoutePaths.PRODUCTS}>Add new product to your</Link>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ButtonGrid;
