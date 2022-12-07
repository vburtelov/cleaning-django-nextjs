import React from 'react';
import Payment from '../../components/Order/Payment';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import { useRouter } from 'next/router';

const OrderPaymentPage = () => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  {!auth.isAuthenticated ? (router.push('/')) : null}
  return <>
    {auth.isAuthenticated ? <Payment /> : <Loader />}
  </>;
};

Payment.propTypes = {
  children: PropTypes.object,
};

export default OrderPaymentPage;
