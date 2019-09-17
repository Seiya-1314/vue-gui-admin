function consult(method) {
  let res = null;
  switch (method) {
    case 'GET':
      res = {
        message: 'ok',
        code: 200,
        data: [
          {
            id: '20190917232300',
            phone: '1338623xxxx',
            caseType: '债权债务',
            region: '杭州',
            respondent: 'kingbaoz',
            replyTime: '09-17 08:54:35',
            issue:
              '小区收取停车服务费，说不要业主和业主小区收取停车服务费，说不要业主和业主',
            issueTime: '09-17 08:54:35',
            status: '已回复'
          },
          {
            id: '20190917232300',
            phone: '1338623xxxx',
            caseType: '债权债务',
            region: '杭州',
            respondent: '',
            replyTime: '',
            issue: '小区收取停车服务费，说不要业主和业主',
            issueTime: '09-17 08:54:35',
            status: '未回复'
          }
        ]
      };
      break;

    default:
      res = null;
  }
  return res;
}

module.exports = consult;
