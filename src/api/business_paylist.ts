import request from '@/utils/request';

export const getBusinessPayList = (data: any) => {
  return request({
    url: '/api/business/paylist',
    method: 'get',
    data
  });
};

export const searchBusinessPayList = (data: any) => {
  return request({
    url: '/api/business/paylist',
    method: 'post',
    data
  });
};

