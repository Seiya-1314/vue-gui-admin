import request from '@/utils/request';

export const getBusinessTextList = (data: any) => {
  return request({
    url: '/api/business/text',
    method: 'get',
    data
  });
};

export const searchBusinessTextList = (data: any) => {
  return request({
    url: '/api/business/text',
    method: 'post',
    data
  });
};

