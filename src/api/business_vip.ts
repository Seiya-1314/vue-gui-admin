import request from '@/utils/request';

export const getBusinessVipList = (data: any) => {
  return request({
    url: '/api/business/vip',
    method: 'get',
    data
  });
};

export const searchBusinessVipList = (data: any) => {
  return request({
    url: '/api/business/vip',
    method: 'post',
    data
  });
};

