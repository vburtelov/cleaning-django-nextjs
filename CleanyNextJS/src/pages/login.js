import React from 'react';
import Login from '../components/Login';
import { useRouter } from 'next/router';
import Loader from '../components/Loader/Loader';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  {auth.isAuthenticated ? (router.push('/')) : null;}
  return <>
    {!auth.isAuthenticated ? (<Login />) : <Loader />}
  </>;
};


export default LoginPage;
