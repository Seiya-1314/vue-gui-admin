import request from '@/utils/request';

export const getBusinessEvaluate = (data: any) => {
  return request({
    url: '/api/business/evaluate',
    method: 'get',
    data
  });
};

export const searchBusinessEvaluate = (data: any) => {
  return request({
    url: '/api/business/evaluate',
    method: 'post',
    data
  });
};

