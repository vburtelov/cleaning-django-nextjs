import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Page from '../Page';
import Main from 'layouts/Main';
import {useDispatch, useSelector} from 'react-redux';
import {getOrders} from '../../../actions/orderActions';
import Loader from '../../Loader/Loader';
import TextField from '@mui/material/TextField';
import {Stack} from '@mui/material';
import moment from 'moment';


const Orders = () => {

  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return <>
    {order.orders ? (
        <Main>
          <Page>
            <Box>
              <Typography variant='h6' gutterBottom fontWeight={700}>
                Ваши заказы
              </Typography>
              <Typography
                  variant={'subtitle2'}
                  color={'text.secondary'}
                  gutterBottom
              >
                Просмотрите историю заказов, которые вы сделали ранее.
              </Typography>
              <Box paddingY={4}>
                <Divider/>
              </Box>
              <Box>
                {order.orders.map((order) => (
                    <Grid key={order.id} container spacing={4} marginBottom={4}>
                      <Grid item xs={12}>
                        <Stack key={order.id} direction='row' justifyContent='space-between'>
                          <Typography
                              variant={'subtitle2'}
                              sx={{marginBottom: 2}}
                              fontWeight={700}
                          >
                            Заказ: №{order.id}
                          </Typography>
                          <Typography
                              variant={'subtitle2'}
                              sx={{marginBottom: 1}}
                              fontWeight={700}
                          >
                            Дата заказа: {moment(order.created_time).format('DD. MM. YYYY')}
                          </Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between'>
                          <Typography
                              variant={'subtitle2'}
                              sx={{marginBottom: 1}}
                              fontWeight={700}
                          >
                            Статус заказа: {order.status}
                          </Typography>
                          <Typography
                              variant={'subtitle2'}
                              sx={{marginBottom: 1}}
                              fontWeight={700}
                          >
                            Время заказа: {moment(order.created_time).format('h:mm:ss')}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                            disabled
                            label='Город'
                            variant='outlined'
                            name={'city'}
                            fullWidth
                            value={order.city}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                            disabled
                            label='Улица'
                            variant='outlined'
                            name={'street'}
                            fullWidth
                            value={order.street}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                            disabled
                            label='Дом'
                            variant='outlined'
                            name={'house'}
                            fullWidth
                            value={order.house}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                            disabled
                            label='Квартира'
                            variant='outlined'
                            name={'apartment'}
                            fullWidth
                            value={order.apartment}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                            disabled
                            label='Площадь'
                            variant='outlined'
                            name={'square'}
                            fullWidth
                            value={order.square}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                            disabled
                            label='Частота уборки'
                            variant='outlined'
                            name={'frequency'}
                            fullWidth
                            value={order.frequency.name}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                            disabled
                            label='Дата уборки'
                            variant='outlined'
                            name={'date'}
                            fullWidth
                            value={order.date}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                            disabled
                            label='Время уборки'
                            variant='outlined'
                            name={'time'}
                            fullWidth
                            value={order.time.time}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                            disabled
                            label='Способ оплаты'
                            variant='outlined'
                            name={'payment_method'}
                            fullWidth
                            value={order.payment_method === 'cash' ? 'Наличными' : 'Картой клинеру'}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                            disabled
                            label='Клинер'
                            variant='outlined'
                            name={'cleaner_name'}
                            fullWidth
                            value={order.cleaner.name}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                            disabled
                            label='Телефон клинера'
                            variant='outlined'
                            name={'cleaner_phone'}
                            fullWidth
                            value={order.cleaner.phone_number}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                            variant={'subtitle2'}
                            sx={{marginBottom: 1}}
                            fontWeight={700}
                        >
                          Сумма: {order.price} ₽
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider/>
                      </Grid>
                    </Grid>

                ))}
              </Box>
            </Box>
          </Page>
        </Main>
    ) : <Loader/>}
  </>;
};

export default Orders;
