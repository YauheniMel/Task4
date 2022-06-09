const baseUrl = 'https://task-deploy-5.herokuapp.com';

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
