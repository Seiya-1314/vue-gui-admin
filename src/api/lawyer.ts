import request from '@/utils/request';

export const getLawyerList = (data: any) => {
  return request({
    url: '/api/lawyer',
    method: 'get',
    data
  });
};

export const searchLawyerList = (data: any) => {
  return request({
    url: '/api/lawyer',
    method: 'post',
    data
  });
};

