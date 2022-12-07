import React from 'react';
import Cleaning from '../../components/Order/Cleaning';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import { useRouter } from 'next/router';

const OrderCleaningPage = () => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  {!auth.isAuthenticated ? (router.push('/')) : null}
  return <>
    {auth.isAuthenticated ? <Cleaning /> : <Loader />}
  </>;
};

Cleaning.propTypes = {
  children: PropTypes.object,
};

export default OrderCleaningPage;
