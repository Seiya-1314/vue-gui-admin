import request from '@/utils/request';

const userService = {
  login: (data: any) =>
    request({
      url: '/users/login',
      method: 'post',
      data
    }),
  loginOut: () => request({ url: '/users/logout', method: 'post' }),
  getUserInfo: (data: any) =>
    request({
      url: '/users/info',
      method: 'post',
      data
    })
};

export default userService;
