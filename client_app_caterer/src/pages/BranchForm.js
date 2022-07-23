import React, { useContext, useState, useEffect } from 'react';
import { branchInputs } from '../constants/InputBlueprints';
import FormInput from '../components/FormInput';
import { createBranch } from '../apis/BranchApi';
import AuthContext from '../context/AuthContext';

const BranchForm = () => {
  const { accessToken } = useContext(AuthContext);
  const [branch, setBranch] = useState({
    branchName: '',
    city: '',
    address: '',
    description: '',
  });
  const handleSubmit = e => {
    e.preventDefault();

    createBranch(accessToken, branch)
      .then(response => console.log(response.data))
      .catch(err => console.log(err.message));
    clearState();
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
    </>
  );
};

export default BranchForm;
