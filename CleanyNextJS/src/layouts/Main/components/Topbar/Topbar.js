import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';

const Topbar = ({ onSidebarOpen, colorInvert = false }) => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const router = useRouter();

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Link href='/'>
        <Box
          display={'flex'}
          title='Cleany'
          width={{ xs: 100, md: 120 }}
        >
          <Box
            component={'img'}
            src={
              mode === 'light' && !colorInvert
                ? 'https://gist.githubusercontent.com/vburtelov/489144770ad1cab60de77bda0ae73141/raw/79f8da8684b0a48235d112ddc4d18db296bf4814/logo-negative.svg'
                : 'https://gist.githubusercontent.com/vburtelov/489144770ad1cab60de77bda0ae73141/raw/57c939bd9756e806cf843435929096dee5507b1f/logo.svg'
            }
            height={1}
            width={1}
          />
        </Box>
      </Link>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box>
          <Link
            color={router.pathname === '/' ? 'primary' : colorInvert ? 'common.white' : 'text.primary'}
            fontWeight={router.pathname === '/' ? 600 : 400}
            underline='none'
            href='/'
          >
            О нас
          </Link>
        </Box>
        <Box marginLeft={4}>
          <Link
            color={router.pathname === '/cleaning' ? 'primary' : colorInvert ? 'common.white' : 'text.primary'}
            fontWeight={router.pathname === '/cleaning' ? 600 : 400}
            underline='none'
            href='/cleaning'
          >
            Уборка
          </Link>
        </Box>
        <Box marginLeft={4}>
          <Link
            color={router.pathname === '/promo' ? 'primary' : colorInvert ? 'common.white' : 'text.primary'}
            fontWeight={router.pathname === '/promo' ? 600 : 400}
            underline='none'
            href='/promo'
          >
            Акции
          </Link>
        </Box>
        <Box marginLeft={4}>
          <Link
            color={router.pathname === '/contacts' ? 'primary' : colorInvert ? 'common.white' : 'text.primary'}
            fontWeight={router.pathname === '/contacts' ? 600 : 400}
            underline='none'
            href='/contacts'
          >
            Контакты
          </Link>
        </Box>

        <Box marginLeft={4}>
          <Link href='/order' underline='none'>
            <Button
              variant='contained'
              color='primary'
              href=''
              size='large'
            >
              Заказать
            </Button>
          </Link>
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label='Menu'
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  colorInvert: PropTypes.bool,
};

export default Topbar;
