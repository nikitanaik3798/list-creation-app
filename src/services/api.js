import { API_URL } from '../constants';
export const fetchLists = () => fetch(API_URL).then(res => {
  if (!res.ok) throw new Error();
  return res.json();
});