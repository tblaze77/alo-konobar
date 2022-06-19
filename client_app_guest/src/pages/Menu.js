import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Menu = () => {
  const { tableId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/v1/api/product/branchMenu/${tableId}`
        );
        setMenuItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);

  return (
    <ul>
      {menuItems.map(item => {
        return (
          <li>
            <div>
              <b>{item.productName}</b> <b>{item.price}</b>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
