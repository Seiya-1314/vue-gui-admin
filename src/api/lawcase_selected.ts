import request from '@/utils/request';

export const getSelectedLawcase = (data: any) => {
  return request({
    url: '/api/lawcase',
    method: 'get',
    data
  });
};

export const searchSelectedLawcase = (data: any) => {
  return request({
    url: '/api/lawcase',
    method: 'post',
    data
  });
};

