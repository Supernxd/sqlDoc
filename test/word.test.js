const {createTableData, genDoc} = require('../lib/gen/word') 

const SQL = require('../lib/sqlModule/mysql')
const params = {
  host: "192.168.84.91",
  user: "root",
  password: "Anji@1024",
  port: "3306",
}
const testSql = new SQL(params)

testSql.getTableColumn('weixintest', 'wechat_template_msg_sendlog').then(ret => {
  const head = [
    { text: '列名'},
    { text: '主键'},
    { text: '数据类型'},
    { text: '字段类型'},
    { text: '长度'},
    { text: '是否为空'},
    { text: '默认值'},
    { text: '备注'},
    { text: '排序'},
    { text: '小数位'},
    { text: '额外信息'},
  ]

  let params = ret.map( item => Object.values(item))

  

  const data = createTableData(head, params)
  genDoc(data).then(ret => console.log('success')).catch(err => console.log('fail'))

}).catch(err => console.log(err))

