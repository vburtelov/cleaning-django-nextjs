import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Page from '../Page';
import Main from 'layouts/Main';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import {
  setOrderGeneral,
} from '../../../actions/orderActions';
import { useRouter } from 'next/router';
import { CLEAR_SUCCESS } from '../../../slices/orderSlice';

const validationSchema = yup.object({
  city: yup
    .string()
    .trim()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов')
    .required('Пожалуйста, введите название города'),
  street: yup
    .string()
    .trim()
    .min(2, 'Минимальная длина 2 символа')
    .max(50, 'Максимальная длина 50 символов')
    .required('Пожалуйста, введите улицу'),
  house: yup
    .string()
    .trim()
    .min(1, 'Минимальная длина 1 символ')
    .max(10, 'Максимальная длина 10 символов')
    .required('Пожалуйста, введите номер дома'),
  apartment: yup
    .string()
    .trim()
    .min(2, 'Минимальная длина 2 символа')
    .max(10, 'Максимальная длина номера квартиры 10 символов')
    .required('Пожалуйста, введите номер квартиры'),
  date: yup
    .date()
    .min(new Date(), 'Дата не может быть раньше текущей')
    .required('Пожалуйста, введите дату'),
  time: yup
    .number()
    .min(1, 'Минимальная длина 1 символ')
    .required('Пожалуйста, введите время'),
  square: yup
    .number()
    .min(1, 'Минимальная площадь 10 кв.м')
    .required('Пожалуйста, введите площадь'),
});

const General = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const order = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(CLEAR_SUCCESS())
  }, [])

  useEffect(() => {
    if (order.success.general === true) {
      router.push('/order/cleaning');
    }
  }, [order.success.general]);


  const initialValues = {
    city: order.city || '',
    street: order.street || '',
    house: order.house || '',
    apartment: order.apartment || '',
    date: order.date || moment().add(1, 'days').format('YYYY-MM-DD'),
    time: order.time || '',
    square: order.square || '',
  };

  const onSubmit = (values) => {
    dispatch(setOrderGeneral(values));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });
  return (
    <Main>
      <Page>
        <Box>
          <Typography variant='h6' gutterBottom fontWeight={700}>
            Адрес, дата, время и площадь уборки
          </Typography>
          <Typography variant={'subtitle2'} color={'text.secondary'}>
            Пожалуйста, заполните все поля
          </Typography>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Город
                </Typography>
                <TextField
                  label='Город *'
                  variant='outlined'
                  name={'city'}
                  fullWidth
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.city && Boolean(formik.errors.city)
                  }
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Улица
                </Typography>
                <TextField
                  label='Улица *'
                  variant='outlined'
                  name={'street'}
                  fullWidth
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  error={formik.touched.street && Boolean(formik.errors.street)}
                  helperText={formik.touched.street && formik.errors.street}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Дом
                </Typography>
                <TextField
                  label='Дом *'
                  variant='outlined'
                  name={'house'}
                  fullWidth
                  value={formik.values.house}
                  onChange={formik.handleChange}
                  error={formik.touched.house && Boolean(formik.errors.house)}
                  helperText={formik.touched.house && formik.errors.house}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Квартира
                </Typography>
                <TextField
                  label='Квартира *'
                  variant='outlined'
                  name={'apartment'}
                  fullWidth
                  value={formik.values.apartment}
                  onChange={formik.handleChange}
                  error={formik.touched.apartment && Boolean(formik.errors.apartment)}
                  helperText={formik.touched.apartment && formik.errors.apartment}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Площадь
                </Typography>
                <TextField
                  type={'number'}
                  label='Площадь *'
                  variant='outlined'
                  name={'square'}
                  fullWidth
                  value={formik.values.square}
                  onChange={formik.handleChange}
                  error={formik.touched.square && Boolean(formik.errors.square)}
                  helperText={formik.touched.square && formik.errors.square}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Дата
                </Typography>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    value={formik.values.date}
                    onChange={(value) => {
                      formik.setFieldValue('date', moment(value).format('YYYY-MM-DD'));
                    }}
                    minDate={moment().add(1, 'days').format('YYYY-MM-DD')}
                    maxDate={moment().add(30, 'days').format('YYYY-MM-DD')}
                    inputFormat={'YYYY-MM-DD'}
                    renderInput={(params) => (
                      <TextField
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
                        variant='outlined'
                        label='Выберите дату *'
                        fullWidth
                        name={'date'}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Время
                </Typography>
                {order.available_times ? (
                  <FormControl fullWidth>
                    <InputLabel id='time-label'>Время</InputLabel>
                    <Select
                      label='Время'
                      labelId='time-label'
                      variant='outlined'
                      name={'time'}
                      fullWidth
                      value={formik.values.time}
                      onChange={formik.handleChange}
                      error={formik.touched.time && Boolean(formik.errors.time)}
                    >
                      {order.available_times?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.time}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText> {formik.touched.time && formik.errors.time}</FormHelperText>
                  </FormControl>) : (<Typography variant={'subtitle2'} sx={{ marginBottom: 2 }} fontWeight={700}>
                  Нет доступных времен
                </Typography>)}

              </Grid>
              <Grid item xs={12}>
                <Typography color={'error'}>
                  {order.errors.general}
                </Typography>
              </Grid>
              <Grid item container xs={12}>
                <Box
                  display='flex'
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  margin={'0 auto'}
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}>
                  </Box>
                  <Button size={'large'} variant={'contained'} type={'submit'}>
                    Продолжить
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Page>
    </Main>
  );
};


export default General;
