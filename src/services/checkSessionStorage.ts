export default function checkSessionStorage():
| false
| { token: string; login: string } {
  const token = sessionStorage.getItem('token');
  const login = sessionStorage.getItem('login');

  if (token && login) {
    return {
      token,
      login,
    };
  }

  return false;
}
