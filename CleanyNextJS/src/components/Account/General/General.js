import React from 'react';
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
import { editUser } from '../../../actions/authActions';

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Пожалуйста, введите имя')
    .max(50, 'Пожалуйста, введите имя')
    .required('Пожалуйста, введите имя'),
  surname: yup
    .string()
    .trim()
    .min(2, 'Пожалуйста, введите фамилию')
    .max(50, 'Пожалуйста, введите фамилию')
    .required('Пожалуйста, введите фамилию'),
  middle_name: yup
    .string()
    .trim()
    .min(2, 'Пожалуйста, введите отчество')
    .max(50, 'Пожалуйста, введите отчество'),
  email: yup
    .string()
    .trim()
    .email('Пожалуйста, введите корректный email')
    .required('Пожалуйста, введите email'),
  phone_number: yup
    .string()
    .trim()
    .min(11, 'Пожалуйста, введите корректный номер телефона')
    .max(12, 'Пожалуйста, введите корректный номер телефона')
    .required('Пожалуйста, введите номер телефона'),
});

const General = () => {

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initialValues = {
    name: auth.me?.name || '',
    surname: auth.me?.surname || '',
    middle_name: auth.me?.middle_name || '',
    phone_number: auth.me?.phone_number || '',
    email: auth.me?.email,
  };

  const onSubmit = (values) => {
    dispatch(editUser(values));
    return values;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Main>
      <Page>
        <Box>
          <Typography variant='h6' gutterBottom fontWeight={700}>
            Изменить личные данные
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
                  Имя
                </Typography>
                <TextField
                  label='Имя *'
                  variant='outlined'
                  name={'name'}
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.name && Boolean(formik.errors.name)
                  }
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Фамилия
                </Typography>
                <TextField
                  label='Фамилия *'
                  variant='outlined'
                  name={'surname'}
                  fullWidth
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  error={formik.touched.surname && Boolean(formik.errors.surname)}
                  helperText={formik.touched.surname && formik.errors.surname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Отчество
                </Typography>
                <TextField
                  label='Отчество'
                  variant='outlined'
                  name={'middle_name'}
                  fullWidth
                  value={formik.values.middle_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.middle_name && Boolean(formik.errors.middle_name)
                  }
                  helperText={formik.touched.middle_name && formik.errors.middle_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Почта
                </Typography>
                <TextField
                  label='Почта *'
                  variant='outlined'
                  name={'email'}
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Номер телефона
                </Typography>
                <TextField
                  label='Телефон *'
                  variant='outlined'
                  name={'phone_number'}
                  fullWidth
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phone_number && Boolean(formik.errors.phone_number)
                  }
                  helperText={formik.touched.phone_number && formik.errors.phone_number}
                />
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
                    <Typography color={'error'}>
                      {auth.errors.editUser}
                    </Typography>
                    <Typography color={'green'}>
                      {auth.success.editUser}
                    </Typography>
                  </Box>
                  <Button size={'large'} variant={'contained'} type={'submit'}>
                    Сохранить
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
