const baseUrl = '/api/v1';

const routes = {
  loginPath: () => [baseUrl, 'login'].join('/'),
  signupPath: () => [baseUrl, 'signup'].join('/'),
  dataPath: () => [baseUrl, 'data'].join('/'),
  homePage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
  notFoundPage: () => '*',
};

export default routes;
