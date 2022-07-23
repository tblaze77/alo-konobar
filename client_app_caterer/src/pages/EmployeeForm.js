import React, { useContext, useState, useEffect } from 'react';
import { employeeInputs } from '../constants/InputBlueprints';
import { useParams } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { createEmployee } from '../apis/EmployeeApi';
import AuthContext from '../context/AuthContext';

const AdminForm = () => {
  const { branchId } = useParams();
  const { accessToken } = useContext(AuthContext);
  const [admin, setAdmin] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    branch: {
      id: branchId,
    },
    role: {
      id: 3,
    },
    description: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    createEmployee(accessToken, admin)
      .then(response => console.log(response.data))
      .catch(err => console.log(err.message));
    clearState();
  };

  const clearState = () => {
    setAdmin({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      description: '',
    });
  };

  const onChange = e => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {employeeInputs.map(input => (
          <FormInput key={input.id} {...input} value={admin[input.name]} onChange={onChange} />
        ))}
        <button>Submit</button>
      </form>
      <button onClick={clearState}>CLEAR STATE</button>
    </>
  );
};

export default AdminForm;
