import React, { useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import './OnlinePaymentPage.css';

const OnlinePaymentPage = () => {
  let location = useLocation();
  let tableId = useParams();
  let total = location.state;

  useEffect(() => {}, []);

  return (
    <div className="menu-container">
      <div className="three-div-row">
        <button className="button">
          <Link className="link" to={'/menu/1'}>
            Back
          </Link>
        </button>
        <h1>This is online payment page</h1>
        <div className="invisible-div"></div>
      </div>

      <p>
        You have to pay <b>{total} HRK</b>
      </p>
    </div>
  );
};

export default OnlinePaymentPage;
