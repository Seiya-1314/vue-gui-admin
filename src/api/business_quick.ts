import request from '@/utils/request';

export const getBusinessQuickList = (data: any) => {
  return request({
    url: '/api/business/quick',
    method: 'get',
    data
  });
};

export const searchBusinessQuickList = (data: any) => {
  return request({
    url: '/api/business/quick',
    method: 'post',
    data
  });
};
