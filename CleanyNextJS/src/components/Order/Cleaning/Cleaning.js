import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Page from '../Page';
import Main from 'layouts/Main';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import {
  setOrderCleaning,
} from '../../../actions/orderActions';
import { useRouter } from 'next/router';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { CLEAR_SUCCESS } from '../../../slices/orderSlice';

const validationSchema = yup.object({
  type: yup
    .number()
    .min(1, 'Минимум 1 символа')
    .max(50, 'Максимум 50 символов')
    .required('Пожалуйста, выберите тип'),
  frequency: yup
    .number()
    .min(1, 'Минимум 1 символа')
    .max(50, 'Максимум 50 символов')
    .required('Пожалуйста, выберите частоту уборки'),
  cleaner: yup
    .number()
    .min(1, 'Минимум 1 символа')
    .max(50, 'Максимум 50 символов')
    .required('Пожалуйста, выберите уборщика'),
});

const Cleaning = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const cleaner = useSelector((state) => state.cleaner);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(CLEAR_SUCCESS());
    if (order.steps.general === false) {
      router.push('/order');
    }
  }, []);


  useEffect(() => {
    if (order.success.cleaning === true) {
      router.push('/order/payment');
    }
  }, [order.success.cleaning]);


  const initialValues = {
    type: order.type || '',
    frequency: order.frequency || '',
    cleaner: order.cleaner || '',
  };

  const onSubmit = (values) => {
    dispatch(setOrderCleaning(values));
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
            Тип, частота и уборщик
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
                  Тип уборки
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id='type-label'>Тип уборки *</InputLabel>
                  <Select
                    label='Тип уборки'
                    labelId='type-label'
                    variant='outlined'
                    name={'type'}
                    fullWidth
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                  >
                    {order.available_types?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText> {formik.touched.type && formik.errors.type}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Частота уборки
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id='frequency-label'>Частота уборки *</InputLabel>
                  <Select
                    label='Частота уборки'
                    labelId='frequency-label'
                    variant='outlined'
                    name={'frequency'}
                    fullWidth
                    value={formik.values.frequency}
                    onChange={formik.handleChange}
                    error={formik.touched.frequency && Boolean(formik.errors.frequency)}
                  >
                    {order.available_frequencies?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText> {formik.touched.frequency && formik.errors.frequency}</FormHelperText>
                </FormControl>
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
                  Клинер
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id='cleaner-label'>Клинер *</InputLabel>
                  <Select
                    label='Клинер'
                    labelId='cleaner-label'
                    variant='outlined'
                    name={'cleaner'}
                    fullWidth
                    value={formik.values.cleaner}
                    onChange={formik.handleChange}
                    error={formik.touched.cleaner && Boolean(formik.errors.cleaner)}
                  >
                    {cleaner.cleaners?.map((cleaner) => (
                      <MenuItem key={cleaner.id} value={cleaner.id}>
                        <Typography variant={'subtitle2'} fontWeight={700} alignItems='center' display='flex'>
                          <PersonOutlineIcon fontSize='small' /> {cleaner.name}⠀<StarOutlinedIcon
                          fontSize='small' />{cleaner.rating}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText> {formik.touched.cleaner && formik.errors.cleaner}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography color={'error'}>
                  {order.errors.cleaning}
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


export default Cleaning;
