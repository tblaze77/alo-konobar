import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
const Select = ({ changeState, APIMethod, label, id, isSelected, paramId }) => {
  const [avaliableChoices, setAvaliableChoices] = useState([]);
  const { accessToken } = useContext(AuthContext);

  const handleSelectChange = e => {
    changeState({ id: e.target.value });
  };

  useEffect(() => {
    let mounted = true;
    if (paramId != undefined) {
      APIMethod(accessToken, paramId).then(response => {
        if (mounted) {
          setAvaliableChoices(response.data);
        }
      });
    } else {
      APIMethod().then(response => {
        if (mounted) setAvaliableChoices(response.data);
      });
    }

    return () => (mounted = false);
  }, [APIMethod]);

  return (
    <div className="select-label">
      <label>{label}</label>
      <select className="select" name={id} id={id} defaultValue="Choose here" onChange={handleSelectChange}>
        {isSelected === '' ? (
          <option value="" selected>
            None
          </option>
        ) : (
          <option value="">None</option>
        )}

        {avaliableChoices.map(choice => {
          if (choice.id === isSelected) {
            return (
              <option selected value={choice.id} key={choice.id}>
                {id === 'employee'
                  ? `${choice.firstname} ${choice.lastname}`
                  : id === 'table'
                  ? `Table ${choice.teamName}`
                  : choice.product.productName}
              </option>
            );
          } else {
            return (
              <option value={choice.id} key={choice.id}>
                {id === 'employee'
                  ? `${choice.firstname} ${choice.lastname}`
                  : id === 'table'
                  ? `Table ${choice.number}`
                  : choice.product.productName}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default Select;
