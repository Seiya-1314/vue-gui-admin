function consult(method) {
  let res = null;
  switch (method) {
    case 'GET':
      res = {
        message: 'ok',
        code: 200,
        data: [
          {
            id: '叶**',
            userID: '2184868',
            caseType: '婚姻家庭',
            region: '上海',
            phone: '15443567890',
            origin: 'zzzz@163.com',
            issueTime: '09-17 08:54:35',
            status: '待认证'
          },
          {
            id: '王**',
            userID: '2184868',
            caseType: '公司合同',
            region: '南京',
            phone: '15443567890',
            origin: '',
            issueTime: '09-17 08:54:35',
            status: '认证成功'
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
            id: '叶**',
            userID: '2184868',
            caseType: '婚姻家庭',
            region: '上海',
            phone: '15443567890',
            origin: 'zzzz@163.com',
            issueTime: '09-17 08:54:35',
            status: '待认证'
          },
          {
            id: '王**',
            userID: '2184868',
            caseType: '公司合同',
            region: '南京',
            phone: '15443567890',
            origin: '',
            issueTime: '09-17 08:54:35',
            status: '认证成功'
          },
          {
            id: '叶**',
            userID: '2184868',
            caseType: '婚姻家庭',
            region: '上海',
            phone: '15443567890',
            origin: 'zzzz@163.com',
            issueTime: '09-17 08:54:35',
            status: '待认证'
          },
          {
            id: '王**',
            userID: '2184868',
            caseType: '公司合同',
            region: '南京',
            phone: '15443567890',
            origin: '',
            issueTime: '09-17 08:54:35',
            status: '认证成功'
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
