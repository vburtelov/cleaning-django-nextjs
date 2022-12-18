import React from 'react';
import Login from '../components/Login';
import { useRouter } from 'next/router';
import Loader from '../components/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import {verifyEmail} from "../actions/authActions";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const query = router.query;
  if (query.user_id && query.confirmation_token) {
    dispatch(verifyEmail(query)).then(() => {
        router.push('/login');
    });
  }
  const auth = useSelector((state) => state.auth);
  {auth.isAuthenticated ? (router.push('/')) : null;}
  return <>
    {!auth.isAuthenticated ? (<Login />) : <Loader />}
  </>;
};


export default LoginPage;
