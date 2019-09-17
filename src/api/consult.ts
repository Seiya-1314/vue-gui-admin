import request from '@/utils/request';

const consultService = {
  getConsultList() {
    return request({
      url: '/api/consult',
      method: 'get'
    })
  }
};

export default consultService;