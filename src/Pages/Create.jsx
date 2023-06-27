import React, { Fragment, useContext,useEffect } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import { AuthContext } from '../store/Context';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const {user}= useContext(AuthContext)
  const navigate=useNavigate()
    useEffect(() => {
      if(!user){
        navigate('/login')
      }

    }, [user,navigate])
    if(!user){
      navigate('/login')
    }else{
  
  return (
    <Fragment>
      <Header />
      <Create/>
    </Fragment>
  );
};
}

export default CreatePage;
