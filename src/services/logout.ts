export default async function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('login');
}
