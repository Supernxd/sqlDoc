const SQL = require('../lib/sqlModule/mysql')
const params = {
  host: "192.168.84.91",
  user: "root",
  password: "Anji@1024",
  port: "3306",
}
const testSql = new SQL(params)

testSql.getAllSchema().then(ret => console.log(ret)).catch(err => console.log(err))
// testSql.getTableBySchema('weixintest').then(ret => console.log(ret)).catch(err => console.log(err))
// testSql.getTableColumn('weixintest', 'wechat_template_msg_sendlog').then(ret => console.log(ret)).catch(err => console.log(err))