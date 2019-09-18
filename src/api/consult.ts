import request from '@/utils/request';

export interface ConsultQueryConfig {
  id: string;
  userID: string;
  phone: string;
  region: string;
  caseType: CaseTypeOption | string;
  status: StatusTypeOption | string;
}

export enum CaseTypeOption {
  ESTATE = '房地产',
  MARRIAGE = '婚姻家庭',
  INVESTMENT = '投资理财',
  OWING = '债权债务',
  ACCIDENT = '交通事故',
  BUSINESS = '商业'
}

export enum StatusTypeOption {
  REPLY = '已回复',
  UNANSWERED = '未回复'
}

export interface ConsultTableConfig {
  id: string;
  phone: string;
  caseType: string;
  region: string;
  answer?: string;
  respondent: string;
  replyTime: string;
  issue: string;
  issueTime: string;
  status: string;
  option?: string;
}

export const getConsultList = (data: any) => {
  return request({
    url: '/api/consult',
    method: 'get',
    data
  });
};

export const searchConsult = (data: ConsultQueryConfig) => {
  return request({
    url: '/api/consult',
    method: 'post',
    data
  });
};
