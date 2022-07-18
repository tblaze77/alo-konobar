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
    // allDepartmentAPIMethods
    // .createDepartment(department)
    // .then(() => {
    //   setResponseMessage('Successfully added new department !');
    //   handleSuccess();
    // })
    // .catch(err => {
    //   setIsError(true);
    //   setResponseMessage(err.response.data.errors[0]);
    //   setTimeout(() => {
    //     setIsError(false);
    //     setShowSnackBar(false);
    //     setResponseMessage(null);
    //   }, 2000);
    // });
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
