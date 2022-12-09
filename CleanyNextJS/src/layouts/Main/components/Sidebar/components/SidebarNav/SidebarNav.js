import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useTheme} from '@mui/material/styles';
import Link from '@mui/material/Link';
import {useRouter} from "next/router";

const SidebarNav = ({colorInvert}) => {
  const theme = useTheme();
  const {mode} = theme.palette;
  const router = useRouter();

  return (
      <Box>
        <Box width={1} paddingX={2} paddingY={1}>
          <Box
              display={'flex'}
              component="a"
              href="/"
              title="Cleany"
              width={{xs: 100, md: 120}}
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
        </Box>
        <Box paddingX={2} paddingY={2}>
          <Box marginBottom={1}>
            <Link
                color={router.pathname === "/" ? 'primary' : colorInvert ? 'common.white' : 'text.primary'}
                fontWeight={router.pathname === "/" ? 600 : 400}
                underline="none"
                component="a"
                href="/"
            >
              О нас
            </Link>
          </Box>
          <Box marginBottom={1}>
            <Link
                color={router.pathname === "/cleaning" ? 'primary' : colorInvert ? 'common.white' : 'text.primary'}
                fontWeight={router.pathname === "/cleaning" ? 600 : 400}
                underline="none"
                component="a"
                href="/cleaning"
            >
              Уборка
            </Link>
          </Box>
          <Box marginBottom={1}>
            <Link
                color={router.pathname === "/promo" ? 'primary' : colorInvert ? 'common.white' : 'text.primary'}
                fontWeight={router.pathname === "/promo" ? 600 : 400}
                underline="none"
                component="a"
                href="/promo"
            >
              Акции
            </Link>
          </Box>
          <Box marginBottom={1}>
            <Link
                color={router.pathname === "/contacts" ? 'primary' : colorInvert ? 'common.white' : 'text.primary'}
                fontWeight={router.pathname === "/contacts" ? 600 : 400}
                underline="none"
                component="a"
                href="/contacts"
            >
              Контакты
            </Link>
          </Box>
        </Box>
        <Box marginTop={1}>
          <Button
              size={'large'}
              variant="contained"
              color="primary"
              fullWidth
              component="a"
              target="blank"
              href="/order"
          >
            Заказать
          </Button>
        </Box>
      </Box>
  );
};

SidebarNav.propTypes = {
  colorInvert: PropTypes.bool,
};

export default SidebarNav;
