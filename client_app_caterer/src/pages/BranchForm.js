import React, { useContext, useState, useEffect } from 'react';
import { branchInputs } from '../constants/InputBlueprints';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { createBranch } from '../apis/BranchApi';
import AuthContext from '../context/AuthContext';
import SnackBar from '../components/SnackBar';

const BranchForm = () => {
  const { accessToken } = useContext(AuthContext);
  const [branch, setBranch] = useState({
    branchName: '',
    city: '',
    address: '',
    description: '',
  });
  let navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isError, setIsError] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createBranch(accessToken, branch);
      setShowSnackbar(true);
      setIsError(false);
      console.log('usa san u try');
      setTimeout(() => {
        navigate(-1);
        clearState();
      }, 10000);
    } catch (err) {
      console.log('usa san u catch');
      setShowSnackbar(true);
      setIsError(true);
      setTimeout(() => {
        console.log('triggeraN JE SET TIMEOUT');
        setShowSnackbar(false);
        setIsError(null);
      }, 3000);
    }
  };

  const clearState = () => {
    setBranch({
      branchName: '',
      city: '',
      address: '',
      description: '',
    });
  };

  const onChange = e => {
    setBranch({ ...branch, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {branchInputs.map(input => (
          <FormInput key={input.id} {...input} value={branch[input.name]} onChange={onChange} />
        ))}
        <button>Submit</button>
      </form>
      <button onClick={clearState}>CLEAR STATE</button>
      {showSnackbar ? (
        <SnackBar
          message={isError ? 'Ooops... something went wrong' : 'Successfully added a new branch'}
          isError={isError}
        />
      ) : null}
    </>
  );
};

export default BranchForm;
