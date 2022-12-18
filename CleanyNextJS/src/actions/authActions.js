import axios from 'axios';
import {BASE_URL, SERVER_URL} from '../constants';
import {
  LOGIN_WITH_EMAIL_FAIL,
  LOGIN_WITH_EMAIL_LOADING,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  ME_FAIL,
  ME_LOADING,
  ME_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_LOADING,
  USER_EDIT_SUCCESS,
  USER_PASSWORD_CHANGE_FAIL,
  USER_PASSWORD_CHANGE_LOADING, USER_PASSWORD_CHANGE_SUCCESS,
  VERIFY_TOKEN_FAIL,
  VERIFY_TOKEN_LOADING,
  VERIFY_TOKEN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOADING,
  EMAIL_VERIFY_LOADING,
  EMAIL_VERIFY_SUCCESS,
  EMAIL_VERIFY_FAIL
} from '../slices/authSlice';
import { batch } from 'react-redux';
import { getAvaliableFrequency, getAvaliableTimes, getAvaliableTypes } from './orderActions';
import { getCleaners } from './cleanerActions';


export const changeUserPassword = (values) => async (dispatch, getState) => {
  dispatch(USER_PASSWORD_CHANGE_LOADING());
  if (values.password === values.repeat_password) {
    const options = attachTokenToHeaders(getState);
    await axios.put(`${BASE_URL}/users/me/changepass/`, {
      old_password: values.old_password,
      password: values.password,
    }, { ...options })
      .then((response) => {
        dispatch(USER_PASSWORD_CHANGE_SUCCESS(response.data));
      })
      .catch(() => {
        dispatch(USER_PASSWORD_CHANGE_FAIL('Ошибка при изменении пароля'));
      });
  } else {
    dispatch(USER_PASSWORD_CHANGE_FAIL('Пароли не совпадают'));
  }

};


export const verifyEmail = (query) => async (dispatch) => {
    dispatch(EMAIL_VERIFY_LOADING());
    const {user_id, confirmation_token} = query;
    await axios.get(`${BASE_URL}/users/me/verify/`, {
        params: {
            'user_id': user_id,
            'confirmation_token': confirmation_token
        }
    })
        .then((response) => {
        dispatch(EMAIL_VERIFY_SUCCESS(response.data));
        })
        .catch(() => {
        dispatch(EMAIL_VERIFY_FAIL('Ошибка при верификации почты'));
        });
}


export const editUser = (values) => async (dispatch, getState) => {
  dispatch(USER_EDIT_LOADING());
  const options = attachTokenToHeaders(getState);
  await axios.put(`${BASE_URL}/users/me/`, values, { ...options }).then((res) => {
    dispatch(USER_EDIT_SUCCESS(res.data));
  }).catch((err) => {
    dispatch(USER_EDIT_FAIL(err.response));
  });
};

export const loadMe = () => async (dispatch, getState) => {
  dispatch(ME_LOADING());
  try {
    const access = getState().auth.access;
    if (access) {
      const options = attachTokenToHeaders(getState);
      await axios.get(BASE_URL + '/users/me/', { ...options }).then(
        (response) => {
          batch(() => {
            dispatch(ME_SUCCESS(response.data));
            dispatch(getAvaliableTimes());
            dispatch(getAvaliableTypes());
            dispatch(getAvaliableFrequency());
            dispatch(getCleaners());
          });
        },
      ).catch(
        () => {
          dispatch(ME_FAIL('Ошибка при загрузке пользователя'));
        },
      );
    }
  } catch (err) {
    dispatch(ME_FAIL(err.response));
  }
};

export const verifyToken = () => async (dispatch) => {
  dispatch(VERIFY_TOKEN_LOADING());
  await axios.post('/api/auth/verify').then(
    (response) => {
      dispatch(VERIFY_TOKEN_SUCCESS(response.data));
      dispatch(loadMe());
    },
  ).catch((err) => {
    dispatch(VERIFY_TOKEN_FAIL('Ошибка при проверке токена'));
    return err.response;
  });
};

export const loginUserWithEmail = (formData) => async (dispatch) => {
    dispatch(LOGIN_WITH_EMAIL_LOADING());
    await axios.post('/api/auth/login', formData).then(
      (res) => {
        dispatch(LOGIN_WITH_EMAIL_SUCCESS(res.data));
        dispatch(loadMe());
      }).catch((err) => {
      dispatch(LOGIN_WITH_EMAIL_FAIL('Не верный логин или пароль'));
      return err.response;
    });
  }
;

export const logOutUser = () => async (dispatch) => {
  dispatch(LOGOUT_LOADING());
  await axios.get('/api/auth/logout').then(
    (response) => {
      if (response.status === 200) {
        dispatch(LOGOUT_SUCCESS());
      } else {
        dispatch(LOGOUT_FAIL('Ошибка при выходе'));
      }
    },
  ).catch((err) => {
      dispatch(LOGOUT_FAIL());
      return err.response;
    },
  );
};

export const registerUser = (values) => async (dispatch) => {
  dispatch(REGISTER_LOADING());
  await axios.post(`${BASE_URL}/users/`, values).then(
    (res) => {
      dispatch(REGISTER_SUCCESS(res.data));
    }).catch((err) => {
      if (err.response.status === 400) {
        dispatch(REGISTER_FAIL('Пользователь с таким email уже существует'));
      } else {
        dispatch(REGISTER_FAIL('Ошибка при регистрации'));
      }
  });
}



export const attachTokenToHeaders = (getState) => {
  const access = getState().auth.access;
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (access) {
    config.headers['Authorization'] = 'Bearer ' + access;
  }

  return config;
};
