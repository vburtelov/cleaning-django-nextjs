import { attachTokenToHeaders } from './authActions';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { deleteCookie, setCookie } from 'cookies-next';
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_LOADING, CREATE_ORDER_SUCCESS,
  GET_ORDER_AVAILABLE_FREQUENCY_FAIL,
  GET_ORDER_AVAILABLE_FREQUENCY_LOADING,
  GET_ORDER_AVAILABLE_FREQUENCY_SUCCESS,
  GET_ORDER_AVAILABLE_TIME_FAIL,
  GET_ORDER_AVAILABLE_TIME_LOADING,
  GET_ORDER_AVAILABLE_TIME_SUCCESS,
  GET_ORDER_AVAILABLE_TYPE_FAIL,
  GET_ORDER_AVAILABLE_TYPE_LOADING,
  GET_ORDER_AVAILABLE_TYPE_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_LOADING,
  GET_ORDERS_SUCCESS,
  SET_ORDER_CLEANING_FAIL,
  SET_ORDER_CLEANING_LOADING,
  SET_ORDER_CLEANING_SUCCESS,
  SET_ORDER_GENERAL_FAIL,
  SET_ORDER_GENERAL_LOADING,
  SET_ORDER_GENERAL_SUCCESS, SET_ORDER_PAYMENT_FAIL, SET_ORDER_PAYMENT_LOADING, SET_ORDER_PAYMENT_SUCCESS,
} from '../slices/orderSlice';

const cookieOrderOptions = {
  maxAge: 60 * 60,
  path: '/',
  sameSite: 'strict',
};

export const getAvaliableTimes = () => async (dispatch, getState) => {
  dispatch(GET_ORDER_AVAILABLE_TIME_LOADING());
  const options = attachTokenToHeaders(getState);
  const response = await axios.get(BASE_URL + '/api/cleaning-time/', options).catch(
    () => {
      dispatch(GET_ORDER_AVAILABLE_TIME_FAIL('Ошибка при загрузке доступного времени'));
    });
  if (response.status === 200 && response.data) {
    dispatch(GET_ORDER_AVAILABLE_TIME_SUCCESS(response.data));
  } else {
    dispatch(GET_ORDER_AVAILABLE_TIME_FAIL('Ошибка при загрузке доступного времени'));
  }
};

export const getAvaliableTypes = () => async (dispatch, getState) => {
  dispatch(GET_ORDER_AVAILABLE_TYPE_LOADING());
  const options = attachTokenToHeaders(getState);
  const response = await axios.get(BASE_URL + '/api/type-of-cleaning/', options).catch(
    () => {
      dispatch(GET_ORDER_AVAILABLE_TYPE_FAIL('Ошибка при загрузке доступных типов'));
    });
  if (response.status === 200 && response.data) {
    dispatch(GET_ORDER_AVAILABLE_TYPE_SUCCESS(response.data));
  } else {
    dispatch(GET_ORDER_AVAILABLE_TYPE_FAIL('Ошибка при загрузке доступных типов'));
  }
};

export const getAvaliableFrequency = () => async (dispatch, getState) => {
  dispatch(GET_ORDER_AVAILABLE_FREQUENCY_LOADING());
  const options = attachTokenToHeaders(getState);
  const response = await axios.get(BASE_URL + '/api/frequency/', options).catch(
    () => {
      dispatch(GET_ORDER_AVAILABLE_FREQUENCY_FAIL('Ошибка при загрузке доступных частот'));
    });
  if (response.status === 200 && response.data) {
    dispatch(GET_ORDER_AVAILABLE_FREQUENCY_SUCCESS(response.data));
  } else {
    dispatch(GET_ORDER_AVAILABLE_FREQUENCY_FAIL('Ошибка при загрузке доступных частот'));
  }
};

export const createOrder = () => async (dispatch, getState) => {
  dispatch(CREATE_ORDER_LOADING());
  const order = getState().order;
  if (order.steps.cleaning && order.steps.payment && order.steps.general) {
    const orderData = {
      'city': order.city,
      'street': order.street,
      'house': order.house,
      'apartment': order.apartment,
      'date': order.date,
      'time': order.time,
      'type': order.type,
      'square': order.square,
      'payment_method': order.payment_method,
      'frequency': order.frequency,
      'cleaner': order.cleaner,
      'steps': {
        'cleaning': order.steps.cleaning,
        'payment': order.steps.payment,
        'general': order.steps.general,
      },
    };
    if (order.discount_code !== '') {
      orderData['discount_code'] = order.discount_id;
    }
    const options = attachTokenToHeaders(getState);
    const response = await axios.post(BASE_URL + '/api/order/', orderData, options).catch(
      () => {
        dispatch(CREATE_ORDER_FAIL('Ошибка при создании заказа'));
      });
    if (response)
      if (response.status === 201 && response.data) {
        dispatch(CREATE_ORDER_SUCCESS('Заказ успешно создан'));
        deleteCookie('city');
        deleteCookie('street');
        deleteCookie('house');
        deleteCookie('apartment');
        deleteCookie('date');
        deleteCookie('time');
        deleteCookie('type');
        deleteCookie('frequency');
        deleteCookie('square');
        deleteCookie('cleaner');
        deleteCookie('payment_method');
        deleteCookie('steps_cleaning');
        deleteCookie('steps_payment');
        deleteCookie('steps_general');
        deleteCookie('discount_code');
        return response.data;
      } else {
        dispatch(CREATE_ORDER_FAIL('Ошибка при создании заказа'));
      }
    else {
      dispatch(CREATE_ORDER_FAIL('Ошибка при создании заказа'));
    }
  } else {
    dispatch(CREATE_ORDER_FAIL('Ошибка при создании заказа'));
  }
};


export const setOrderPayment = (values) => async (dispatch, getState) => {
  dispatch(SET_ORDER_PAYMENT_LOADING());
  if (values.discount_code !== '') {
    const access = getState().auth.access;
    const config = {
      headers: {
        'Authorization': `Bearer ${access}`,
      },
      params: {
        'discount_code': values.discount_code,
      },
    };
    const response = await axios.get(BASE_URL + '/api/check-discount-code/', { ...config }).catch(
      () => {
        dispatch(SET_ORDER_PAYMENT_FAIL('Ошибка при проверке кода'));
        setCookie('discount_code', values.discount_code, cookieOrderOptions);
        setCookie('payment_method', values.payment_method, cookieOrderOptions);
        setCookie('steps_payment', false, cookieOrderOptions);
      });
    if (response)
      if (response.status === 200 && response.data) {
        response.data['payment_method'] = values.payment_method;
        dispatch(SET_ORDER_PAYMENT_SUCCESS(response.data));
        setCookie('payment_method', values.payment_method, cookieOrderOptions);
        setCookie('discount_code', values.discount_code, cookieOrderOptions);
        setCookie('steps_payment', true, cookieOrderOptions);
        dispatch(createOrder());
      } else {
        dispatch(SET_ORDER_PAYMENT_FAIL('Ошибка при проверке кода'));
        setCookie('discount_code', values.discount_code, cookieOrderOptions);
        setCookie('payment_method', values.payment_method, cookieOrderOptions);
        setCookie('steps_payment', true, cookieOrderOptions);
      }
  } else {
    dispatch(SET_ORDER_PAYMENT_SUCCESS(values));
    setCookie('payment_method', values.payment_method, cookieOrderOptions);
    setCookie('steps_payment', true, cookieOrderOptions);
    dispatch(createOrder());
  }

};

export const setOrderGeneral = (values) => async (dispatch) => {
  try {
    dispatch(SET_ORDER_GENERAL_LOADING());
    setCookie('city', values.city, cookieOrderOptions);
    setCookie('street', values.street, cookieOrderOptions);
    setCookie('house', values.house, cookieOrderOptions);
    setCookie('apartment', values.apartment, cookieOrderOptions);
    setCookie('date', values.date, cookieOrderOptions);
    setCookie('time', values.time, cookieOrderOptions);
    setCookie('steps_general', true, cookieOrderOptions);
    setCookie('square', values.square, cookieOrderOptions);
    dispatch(SET_ORDER_GENERAL_SUCCESS(values));
  } catch (err) {
    dispatch(SET_ORDER_GENERAL_FAIL(err));
    deleteCookie('city');
    deleteCookie('street');
    deleteCookie('house');
    deleteCookie('apartment');
    deleteCookie('date');
    deleteCookie('time');
    deleteCookie('steps_general');
    deleteCookie('square');
  }
};

export const setOrderCleaning = (values) => async (dispatch) => {
  try {
    dispatch(SET_ORDER_CLEANING_LOADING());
    setCookie('type', values.type, cookieOrderOptions);
    setCookie('frequency', values.frequency, cookieOrderOptions);
    setCookie('cleaner', values.cleaner, cookieOrderOptions);
    setCookie('steps_cleaning', true, cookieOrderOptions);
    dispatch(SET_ORDER_CLEANING_SUCCESS(values));
  } catch (err) {
    dispatch(SET_ORDER_CLEANING_FAIL(err));
    deleteCookie('type');
    deleteCookie('frequency');
    deleteCookie('cleaner');
    deleteCookie('steps_cleaning');

  }
};

export const getOrders = () => async (dispatch, getState) => {
  dispatch(GET_ORDERS_LOADING());
  const options = attachTokenToHeaders(getState);
  const response = await axios.get(BASE_URL + '/api/order/', options).catch(
    () => {
      dispatch(GET_ORDERS_FAIL('Ошибка при получении заказов'));
    });
  if (response)
    if (response.status === 200 && response.data) {
      dispatch(GET_ORDERS_SUCCESS(response.data));
    } else {
      dispatch(GET_ORDERS_FAIL('Ошибка при получении заказов'));
    }
  else {
    dispatch(GET_ORDERS_FAIL('Ошибка при получении заказов'));
  }
}

