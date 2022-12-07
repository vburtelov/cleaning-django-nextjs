import { deleteCookie} from 'cookies-next';

export default async function(req, res) {
  deleteCookie('access', { req, res });
  deleteCookie('refresh', { req, res });
  return res
    .status(200)
    .json('Выход выполнен');
}