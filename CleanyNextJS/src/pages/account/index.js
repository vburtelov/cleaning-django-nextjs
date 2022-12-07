import React from 'react';
import AccountGeneral from '../../components/Account/General';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const AccountGeneralPage = () => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  {!auth.isAuthenticated ? (router.push('/')) : null}
  return <>
    {auth.isAuthenticated ? <AccountGeneral /> : <Loader />}
  </>;
};


AccountGeneral.propTypes = {
  children: PropTypes.object,
};

export default AccountGeneralPage;
