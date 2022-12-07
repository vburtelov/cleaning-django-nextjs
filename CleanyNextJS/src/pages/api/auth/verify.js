import axios from 'axios';
import { BASE_URL } from '../../../constants';
import { getCookie, deleteCookie, setCookie } from 'cookies-next';

export default async function(req, res) {
  try {
    const access = getCookie('access', { req, res });
    const refresh = getCookie('refresh', { req, res });
    if (access && refresh) {
      const axiosResponseVerifyAccess = await axios.post(`${BASE_URL}/users/token/verify/`,
        { token: access },
      ).catch((err) => {
        return err.response;
      });
      if (axiosResponseVerifyAccess.status === 200) {
        return res
          .status(200)
          .json({
            access: access,
            refresh: refresh,
          });
      } else {
        const axiosResponseVerifyRefresh = await axios.post(`${BASE_URL}/users/token/verify/`, {
          token: refresh,
        }).catch((err) => {
          return err.response;
        });
        if (axiosResponseVerifyRefresh.status === 200) {
          const axiosResponseRefresh = await axios.post(`${BASE_URL}/users/token/refresh/`, {
            refresh: refresh,
          }).catch((err) => {
            return err.response;
          });

          if (axiosResponseRefresh.status === 200) {
            deleteCookie('access', { req, res });
            deleteCookie('refresh', { req, res });
            setCookie('access', axiosResponseRefresh.data.access, {
              req,
              res,
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
              maxAge: 60 * 60 * 24 * 7,
              path: '/',
            });
            setCookie('refresh', axiosResponseRefresh.data.refresh, {
              req,
              res,
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
              maxAge: 60 * 60 * 24 * 7,
              path: '/',
            });
            return res
              .status(200)
              .json({
                access: axiosResponseRefresh.data.access,
                refresh: axiosResponseRefresh.data.refresh,
              });
          } else {
            deleteCookie('access', { req, res });
            deleteCookie('refresh', { req, res });
            return res
              .status(401)
              .json('Токен не валиден');
          }
        } else {
          deleteCookie('access', { req, res });
          deleteCookie('refresh', { req, res });
          return res
            .status(401)
            .json('Токен не валиден');
        }
      }
    } else {
      return res
        .status(401)
        .json('Токен не найден');
    }
  } catch (err) {
    res
      .json({ err });
  }

}