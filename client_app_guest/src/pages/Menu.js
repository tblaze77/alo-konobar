import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMenuForSpecificBranchTable } from '../apis/MenuApis';

const Menu = () => {
  const { tableId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        getMenuForSpecificBranchTable(tableId)
          .then(response => setMenuItems(response.data))
          .finally(() => setLoading(false));
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [loading]);

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
