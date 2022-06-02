export default async function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('login');
}
