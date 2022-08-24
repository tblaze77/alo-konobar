import React, { useContext, useState, useEffect } from 'react';
import { employeeInputs } from '../constants/InputBlueprints';
import { useParams, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { createEmployee } from '../apis/EmployeeApi';
import AuthContext from '../context/AuthContext';
import './AdminForm.css';
import SnackBar from '../components/SnackBar';

const AdminForm = ({ type }) => {
  const { branchId } = useParams();
  let navigate = useNavigate();
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
      id: type === 'admin' ? 2 : 3,
    },
    description: '',
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createEmployee(accessToken, admin);
      setShowSnackbar(true);
      setIsError(false);

      setTimeout(() => {
        navigate(-1);
        clearState();
      }, 3000);
    } catch (err) {
      setShowSnackbar(true);
      setIsError(true);
    }
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
    <div className="list-container admin-form">
      <h1>Adding new employee</h1>
      <form onSubmit={handleSubmit} className="create-form">
        {employeeInputs.map(input => (
          <FormInput key={input.id} {...input} value={admin[input.name]} onChange={onChange} />
        ))}
        <button>Submit</button>
      </form>
      <button onClick={clearState}>CLEAR STATE</button>
      {showSnackbar ? (
        <SnackBar
          message={isError ? 'Ooops... something went wrong' : 'Successfully added a new employee'}
          isError={isError}
        />
      ) : null}
    </div>
  );
};

export default AdminForm;
