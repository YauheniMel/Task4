const baseUrl = 'https://task-4-deploy.herokuapp.com';

const Routes = {
  login: `${baseUrl}/api/login`,
  register: `${baseUrl}/api/register`,
  getUsers: `${baseUrl}/api/users`,
  block: `${baseUrl}/api/block/`,
  unblock: `${baseUrl}/api/unblock/`,
  delete: `${baseUrl}/api/del/`,
  logout: `${baseUrl}/api/logout`,
};

export default Routes;
