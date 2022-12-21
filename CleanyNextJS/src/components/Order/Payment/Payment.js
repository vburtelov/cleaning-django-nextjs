import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import Page from '../Page';
import Main from 'layouts/Main';
import {useDispatch, useSelector} from 'react-redux';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from '@mui/material';
import {
  setOrderPayment,
} from '../../../actions/orderActions';
import {useRouter} from 'next/router';
import TextField from '@mui/material/TextField';
import {CLEAR_SUCCESS} from '../../../slices/orderSlice';

const validationSchema = yup.object({
  payment_method: yup
      .string()
      .min(1, 'Минимум 1 символа')
      .max(50, 'Максимум 50 символов')
      .required('Пожалуйста, выберите способ оплаты'),
  discount_code: yup
      .string()
      .min(1, 'Минимум 1 символа')
      .max(50, 'Максимум 50 символов'),
});

const Payment = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const order = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(CLEAR_SUCCESS());
    if (order.steps.cleaning === false) {
      router.push('/order/cleaning');
    }
  }, []);


  useEffect(() => {
    if (order.isSubmitted === true) {
      router.push('/account/orders');
    }
  }, [order.isSubmitted]);


  const initialValues = {
    payment_method: order.payment_method || '',
    discount_code: order.discount_code || '',
  };

  const onSubmit = (values) => {
    dispatch(setOrderPayment(values));
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
              Оплата
            </Typography>
            <Typography variant={'subtitle2'} color={'text.secondary'}>
              Пожалуйста, заполните все поля
            </Typography>
            <Box paddingY={4}>
              <Divider/>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Typography
                      variant={'subtitle2'}
                      sx={{marginBottom: 2}}
                      fontWeight={700}
                  >
                    Выберите способ оплаты
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id='method-label'>Способ оплаты *</InputLabel>
                    <Select
                        label='Способ оплаты'
                        labelId='method-label'
                        variant='outlined'
                        name={'payment_method'}
                        fullWidth
                        value={formik.values.payment_method}
                        onChange={formik.handleChange}
                        error={formik.touched.payment_method && Boolean(formik.errors.payment_method)}
                    >
                      <MenuItem key={1} value={'cash'}>
                        <Typography variant={'subtitle2'} fontWeight={700} alignItems='center' display='flex'>
                          <AccountBalanceWalletOutlinedIcon fontSize='small'/>⠀Наличные
                        </Typography>
                      </MenuItem>
                      <MenuItem key={2} value={'card-cleaner'}>
                        <Typography variant={'subtitle2'} fontWeight={700} alignItems='center' display='flex'>
                          <CreditCardOutlinedIcon fontSize='small'/>⠀Картой клинеру
                        </Typography>
                      </MenuItem>
                      <MenuItem key={3} value={'card-online'} disabled>
                        <Typography variant={'subtitle2'} fontWeight={700} alignItems='center' display='flex'>
                          <AddCardOutlinedIcon fontSize='small'/>⠀Картой онлайн
                        </Typography>
                      </MenuItem>
                    </Select>
                    <FormHelperText> {formik.touched.payment_method && formik.errors.payment_method}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                      variant={'subtitle2'}
                      sx={{marginBottom: 2}}
                      fontWeight={700}
                  >
                    Промокод
                  </Typography>
                  <TextField
                      label='Промокод'
                      variant='outlined'
                      name={'discount_code'}
                      fullWidth
                      value={formik.values.discount_code}
                      onChange={formik.handleChange}
                      error={
                          formik.touched.discount_code && Boolean(formik.errors.discount_code)
                      }
                      helperText={formik.touched.discount_code && formik.errors.discount_code}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={'body2'} fontWeight='bold'>
                    Итого к
                    оплате: {order.available_types?.find(x => x.id === order.type)?.price_per_meter * order.square} ₽
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color={'error'}>
                    {order.errors.payment}
                  </Typography>
                </Grid>
                <Grid item container xs={12}>
                  <Box
                      display='flex'
                      flexDirection={{xs: 'column', sm: 'row'}}
                      alignItems={{xs: 'stretched', sm: 'center'}}
                      justifyContent={'space-between'}
                      width={1}
                      margin={'0 auto'}
                  >
                    <Box marginBottom={{xs: 1, sm: 0}}>
                    </Box>
                    <Button size={'large'} variant={'contained'} type={'submit'}>
                      Создать заказ
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


export default Payment;
