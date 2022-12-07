import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThemeModeToggler from 'components/ThemeModeToggler';
import { logOutUser } from '../actions/authActions';

const TopNav = ({ colorInvert = false }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogOut = (event) => {
    event.preventDefault();
    dispatch(logOutUser());
  };

  return (
    <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
      <Box marginRight={{ xs: 1, sm: 2 }}
           underline='none'
           color={colorInvert ? 'common.white' : 'text.primary'}
           sx={{ display: 'flex', alignItems: 'center' }}>
        <LocationOnIcon
          fontSize={'small'}
          padding={0.5}
          display={'inline-flex'}
          bgcolor={'primary.main'}>
        </LocationOnIcon>
        Москва
      </Box>
      <Box marginRight={{ xs: 1, sm: 2 }}>
        <Link
          underline='none'
          href='tel:89256668840'
          color={colorInvert ? 'common.white' : 'text.primary'}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          8 (925) 666-88-40
        </Link>
      </Box>
      {!auth.isAuthenticated ? (
        <Box marginRight={{ xs: 1, sm: 2 }}>
          <Link
            underline='none'
            href='/login'
            color={colorInvert ? 'common.white' : 'text.primary'}
          >
            Войти
          </Link>
        </Box>
      ) : (<>
        <Box marginRight={{ xs: 1, sm: 2 }}>
          <Link
            underline='none'
            href='/account'
            color={colorInvert ? 'common.white' : 'text.primary'}
          >
            {auth.me.name}
          </Link>
        </Box>
        <Box marginRight={{ xs: 1, sm: 2 }}>
          <Link
            onClick={onLogOut}
            underline='none'
            href='/logout'
            color={colorInvert ? 'common.white' : 'text.primary'}
          >
            Выйти
          </Link>
        </Box>
      </>)}
      <Box>
        <ThemeModeToggler />
      </Box>
    </Box>
  );
};

TopNav.propTypes = {
  colorInvert: PropTypes.bool,
};


export default TopNav;
