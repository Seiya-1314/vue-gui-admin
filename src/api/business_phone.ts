import request from '@/utils/request';

export const getBusinessPhoneList = (data: any) => {
  return request({
    url: '/api/business/phone',
    method: 'get',
    data
  });
};

export const searchBusinessPhoneList = (data: any) => {
  return request({
    url: '/api/business/phone',
    method: 'post',
    data
  });
};

