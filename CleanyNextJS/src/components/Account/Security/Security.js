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
import { changeUserPassword } from '../../../actions/authActions';
import { useRouter } from 'next/router';
import Loader from '../../Loader/Loader';

const validationSchema = yup.object({
  old_password: yup.string().required('Пожалуйста, введите текущий пароль'),
  password: yup
    .string()
    .required('Пожалуйста, введите новый пароль')
    .min(6, 'Пароль должен быть не менее 6 символов'),
  repeat_password: yup
    .string()
    .required('Please specify your password')
    .min(6, 'Пароль должен быть не менее 6 символов'),
});

const Security = () => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  {
    !auth.isAuthenticated ? (router.push('/')) : null;
  }
  const dispatch = useDispatch();
  const initialValues = {
    old_password: '',
    password: '',
    repeat_password: '',
  };

  const onSubmit = (values) => {
    dispatch(changeUserPassword(values));
    return values;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (!auth.isAuthenticated ? <Loader /> : (
    <>
      <Main>
        <Page>
          <Box>
            <Box
              display={'flex'}
              flexDirection={{ xs: 'column', md: 'row' }}
              justifyContent={'space-between'}
              alignItems={{ xs: 'flex-start', md: 'center' }}
            >
              <Typography variant='h6' fontWeight={700}>
                Изменить пароль
              </Typography>
            </Box>
            <Box paddingY={4}>
              <Divider />
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography
                    variant={'subtitle2'}
                    sx={{ marginBottom: 2 }}
                    fontWeight={700}
                  >
                    Текущий пароль
                  </Typography>
                  <TextField
                    variant='outlined'
                    name={'old_password'}
                    type={'password'}
                    fullWidth
                    value={formik.values.old_password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.old_password &&
                      Boolean(formik.errors.old_password)
                    }
                    helperText={
                      formik.touched.old_password &&
                      formik.errors.old_password
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant={'subtitle2'}
                    sx={{ marginBottom: 2 }}
                    fontWeight={700}
                  >
                    Новый пароль
                  </Typography>
                  <TextField
                    variant='outlined'
                    name={'password'}
                    type={'password'}
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password &&
                      Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant={'subtitle2'}
                    sx={{ marginBottom: 2 }}
                    fontWeight={700}
                  >
                    Повторите новый пароль
                  </Typography>
                  <TextField
                    variant='outlined'
                    name={'repeat_password'}
                    type={'password'}
                    fullWidth
                    value={formik.values.repeat_password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.repeat_password &&
                      Boolean(formik.errors.repeat_password)
                    }
                    helperText={
                      formik.touched.repeat_password &&
                      formik.errors.repeat_password
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography color={'error'}>
                    {auth.errors.editPassword}
                  </Typography>
                  <Typography color={'green'}>
                    {auth.success.editPassword}
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
                      Сохранить
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Page>
      </Main>
    </>
  ));
};

export default Security;
