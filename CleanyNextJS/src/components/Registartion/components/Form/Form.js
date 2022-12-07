/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { registerUser } from '../../../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Имя должно быть не менее 2 символов')
    .max(50, 'Имя должно быть не более 20 символов')
    .required('Пожалуйста, введите имя'),
  surname: yup
    .string()
    .trim()
    .min(2, 'Фамилия должна быть не менее 2 символов')
    .max(30, 'Фамилия должна быть не более 30 символов')
    .required('Пожалуйста, введите фамилию'),
  phone_number: yup
    .string()
    .trim()
    .min(11, 'Номер телефона должен быть не менее 11 символов')
    .max(12, 'Номер телефона должен быть не более 12 символов')
    .required('Пожалуйста, введите номер телефона'),
  email: yup
    .string()
    .trim()
    .email('Пожалуйста, введите корректный email')
    .required('Пожалуйста, введите email'),
  password: yup
    .string()
    .required('Пожалуйста, введите пароль')
    .min(6, 'Пароль должен быть не менее 6 символов'),
});

const Form = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const initialValues = {
    name: '',
    surname: '',
    phone_number: '',
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    dispatch(registerUser(values));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'text.secondary'}
        >
          Регистрация
        </Typography>
        <Typography
          variant='h4'
          sx={{
            fontWeight: 700,
          }}
        >
          Создайте аккаунт
        </Typography>
        <Typography color='text.secondary'>
          Заполните форму ниже, чтобы создать аккаунт
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Введите имя
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
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Введите фамилию
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
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Введите номер телефона
            </Typography>
            <TextField
              label='Телефон *'
              variant='outlined'
              name={'phone_number'}
              fullWidth
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
              helperText={formik.touched.phone_number && formik.errors.phone_number}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Введите email
            </Typography>
            <TextField
              label='Email *'
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
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Введите пароль
            </Typography>
            <TextField
              label='Пароль *'
              variant='outlined'
              name={'password'}
              type={'password'}
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item container xs={12}>
            <Box
              display='flex'
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle2'}>
                  Уже есть аккаунт?{' '}
                  <Link
                    color={'primary'}
                    href={'/login'}
                    underline={'none'}
                  >
                    Войти
                  </Link>
                </Typography>
              </Box>
              <Button size={'large'} variant={'contained'} type={'submit'}>
                Зарегистрироваться
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography color={'error'}>
              {auth.errors.register}
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
