function consult(method) {
  let res = null;
  switch (method) {
    case 'GET':
      res = {
        message: 'ok',
        code: 200,
        data: [
          {
            id: '201909081435',
            userID: '2184868',
            origin: '支付宝',
            caseType: '婚姻家庭',
            region: '上海',
            phone: '15333342233',
            issueTime: '09-17 08:54:35',
            status: '未通知'
          },
          {
            id: '201909081435',
            userID: '2184868',
            origin: '支付宝',
            caseType: '交通事故',
            region: '上海',
            phone: '15333342233',
            issueTime: '09-17 08:54:35',
            status: '已通知'
          },
          {
            id: '201909081435',
            userID: '2184868',
            origin: '支付宝',
            caseType: '婚姻家庭',
            region: '南京',
            phone: '15333342233',
            issueTime: '09-17 08:54:35',
            status: '已通知'
          },
          {
            id: '201909081435',
            userID: '2184868',
            origin: '支付宝',
            caseType: '婚姻家庭',
            region: '北京',
            phone: '15333342233',
            issueTime: '09-17 08:54:35',
            status: '未通知'
          }
        ]
      };
      break;

    case 'POST':
      res = {
        message: 'ok',
        code: 200,
        data: [
          {
            id: '201909081435',
            userID: '2184868',
            origin: '支付宝',
            caseType: '交通事故',
            region: '上海',
            phone: '15333342233',
            issueTime: '09-17 08:54:35',
            status: '已通知'
          },
          {
            id: '201909081435',
            userID: '2184868',
            origin: '支付宝',
            caseType: '婚姻家庭',
            region: '南京',
            phone: '15333342233',
            issueTime: '09-17 08:54:35',
            status: '已通知'
          },
          {
            id: '201909081435',
            userID: '2184868',
            origin: '支付宝',
            caseType: '婚姻家庭',
            region: '北京',
            phone: '15333342233',
            issueTime: '09-17 08:54:35',
            status: '未通知'
          },
          {
            id: '201909081435',
            userID: '2184868',
            origin: '支付宝',
            caseType: '交通事故',
            region: '上海',
            phone: '15333342233',
            issueTime: '09-17 08:54:35',
            status: '已通知'
          },
          {
            id: '201909081435',
            userID: '2184868',
            origin: '支付宝',
            caseType: '婚姻家庭',
            region: '南京',
            phone: '15333342233',
            issueTime: '09-17 08:54:35',
            status: '已通知'
          },
          {
            id: '201909081435',
            userID: '2184868',
            origin: '支付宝',
            caseType: '婚姻家庭',
            region: '北京',
            phone: '15333342233',
            issueTime: '09-17 08:54:35',
            status: '未通知'
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
