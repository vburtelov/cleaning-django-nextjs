import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Footer = ({ colorInvert = false }) => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const router = useRouter();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Link href='/'>
            <Box
              display={'flex'}
              title='Cleany'
              width={80}
            >
              <Box
                component={'img'}
                src={
                  mode === 'light'
                ? 'https://gist.githubusercontent.com/vburtelov/489144770ad1cab60de77bda0ae73141/raw/79f8da8684b0a48235d112ddc4d18db296bf4814/logo-negative.svg'
                : 'https://gist.githubusercontent.com/vburtelov/489144770ad1cab60de77bda0ae73141/raw/57c939bd9756e806cf843435929096dee5507b1f/logo.svg'
                }
                height={1}
                width={1}
              />
            </Box>
          </Link>
          <Box display='flex' flexWrap={'wrap'} alignItems={'center'}>
            <Box marginTop={1} marginRight={2}>
              <Link
                color={router.pathname === '/' ? 'primary' : colorInvert ? 'common.white' : 'text.primary'}
                fontWeight={router.pathname === '/' ? 600 : 400}
                underline='none'
                href='/'
                variant={'subtitle2'}
              >
                О нас
              </Link>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                color={router.pathname === '/cleaning' ? 'primary' : colorInvert ? 'common.white' : 'text.primary'}
                fontWeight={router.pathname === '/cleaning' ? 600 : 400}
                underline='none'
                href='/cleaning'
                variant={'subtitle2'}
              >
                Уборка
              </Link>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                color={router.pathname === '/promo' ? 'primary' : colorInvert ? 'common.white' : 'text.primary'}
                fontWeight={router.pathname === '/promo' ? 600 : 400}
                underline='none'
                href='/promo'
                variant={'subtitle2'}
              >
                Акции
              </Link>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                color={router.pathname === '/contacts' ? 'primary' : colorInvert ? 'common.white' : 'text.primary'}
                fontWeight={router.pathname === '/contacts' ? 600 : 400}
                underline='none'
                href='/contacts'
                variant={'subtitle2'}
              >
                Контакты
              </Link>
            </Box>
            <Box marginTop={1}>
              <Link
                href={'/order'}
                underline='none'
              >
                <Button
                  variant='outlined'
                  color='primary'
                  target='blank'
                  size='small'
                  href=''>
                  Заказать
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={'center'}
          variant={'subtitle2'}
          color='text.secondary'
          gutterBottom
        >
          &copy; Cleany. 2022, Москва, ул. Бориса Галушкина, д.9. Все права защищены.
        </Typography>
        <Typography
          align={'center'}
          variant={'caption'}
          color='text.secondary'
          component={'p'}
        >
          Когда вы заходите на сайт, вы соглашаетесь с использованием файлов cookie.
          Мы используем файлы cookie для того, чтобы улучшить ваше взаимодействие с сайтом, а также для анализа трафика.
          Подробнее об использовании файлов cookie читайте в нашей Политике конфиденциальности.
        </Typography>
      </Grid>
    </Grid>
  );
};

Footer.propTypes = {
  colorInvert: PropTypes.bool,
};

export default Footer;
