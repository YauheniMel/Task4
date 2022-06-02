export default function checkLocalStorage() {
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');

  if (token && login) {
    return {
      token,
      login,
    };
  }

  return false;
}
