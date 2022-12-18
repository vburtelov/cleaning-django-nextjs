import axios from 'axios';
import {SERVER_URL} from '../../../constants';
import { setCookie } from 'cookies-next';

export default async function(req, res) {
  const { email, password } = req.body;
  if (email && password) {
    const axiosResponse = await axios.post(`${SERVER_URL}/users/token/`, {
      email,
      password,
    }).catch((err) => {
      if (err.response) {
        return res
          .status(err.response.status)
          .json(err.response.data);
      } else {
        return res
          .status(500)
          .json(err);
      }
    });
    if (axiosResponse.status === 200 && axiosResponse.data.access) {
      setCookie('access', axiosResponse.data.access, {
        req,
        res,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      setCookie('refresh', axiosResponse.data.refresh, {
        req,
        res,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return res
        .status(200)
        .json({
          access: axiosResponse.data.access,
          refresh: axiosResponse.data.refresh,
        });
    }
  } else {
    return res
      .status(400)
      .json({
        detail: 'Email and password are required',
      });

  }
}