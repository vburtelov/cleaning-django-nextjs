import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import Container from 'components/Container';
import { useSelector } from 'react-redux';
import { ListItemButton, Stack } from '@mui/material';

const pages = [
  {
    id: 'general',
    href: '/order',
    title: 'Шаг 1 - Основное',
  },
  {
    id: 'cleaning',
    href: '/order/cleaning',
    title: 'Шаг 2 - Уборка',
  },
  {
    id: 'payment',
    href: '/order/payment',
    title: 'Шаг 3 - Оплата',
  },
];

const Page = ({ children }) => {
  const order = useSelector((state) => state.order);
  const [activeLink, setActiveLink] = useState('');
  useEffect(() => {
    setActiveLink(window && window.location ? window.location.pathname : '');
  }, []);

  const theme = useTheme();


  return (
    <Box>
      <Box bgcolor={'primary.main'} paddingY={4}>
        <Container>
          <Typography
            variant='h4'
            fontWeight={700}
            gutterBottom
            sx={{ color: 'common.white' }}
          >
            Оформление заказа
          </Typography>
          <Typography variant='h6' sx={{ color: 'common.white' }}>
            Заполните данные для оформления заказа
          </Typography>
        </Container>
      </Box>
      <Container paddingTop={'0 !important'} marginTop={-8}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card sx={{ boxShadow: 3 }}>
              <List
                disablePadding
                component={Stack}
                direction={{ xs: 'row', md: 'column' }}
                sx={{
                  // display: { xs: 'inline-flex', md: 'flex' },
                  // flexDirection: { xs: 'row', md: 'column' },
                  // justifyContent: 'space-between',

                  overflow: 'auto',
                  flexWrap: 'nowrap',
                  width: '100%',
                  paddingY: { xs: 2, md: 4 },
                  paddingX: { xs: 4, md: 0 },
                }}
              >
                  {pages.map((item) => (

                    <ListItemButton
                      key={item.id}
                      component={Link}
                      href={item.href}
                      disabled={
                        (!order.steps[item.id] && item.id !== 'general')
                      }
                      disableGutters
                      sx={{
                        flexBasis: 'auto',
                        flexShrink: 0,
                        marginRight: { xs: 2, md: 0 },
                        paddingX: { xs: 0, md: 3 },
                        borderLeft: {
                          xs: 'none',
                          md: '2px solid transparent',
                        },
                        borderLeftColor: {
                          md:
                            activeLink === item.href
                              ? theme.palette.primary.main
                              : 'transparent',
                        },
                      }}
                    >
                      <Typography
                        variant='subtitle1'

                        noWrap
                        // color={
                        //   !order.steps[item.id] && item.id !== 'general'
                        //     ? 'text.primary'
                        //     : 'text.secondary'
                        // }
                      >
                        {item.title} {order.steps[item.id] && '✓'}
                      </Typography>
                    </ListItemButton>
                  ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card sx={{ boxShadow: 3, padding: 4 }}>{children}</Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
