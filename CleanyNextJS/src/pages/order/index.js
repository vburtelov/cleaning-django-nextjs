import React from 'react';
import OrderGeneral from '../../components/Order/General';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import { useRouter } from 'next/router';

const OrderGeneralPage = () => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  {!auth.isAuthenticated ? (router.push('/login')) : null}
  return <>
    {auth.isAuthenticated ? <OrderGeneral /> : <Loader />}
  </>;
};

OrderGeneral.propTypes = {
  children: PropTypes.object,
};

export default OrderGeneralPage;
