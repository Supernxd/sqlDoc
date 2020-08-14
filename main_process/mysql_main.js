const { ipcMain } = require('electron');
const SQL = require('../lib/sqlModule/mysql')

const params = {
  host: "192.168.84.91",
  user: "root",
  password: "Anji@1024",
  port: "3306",
}
const testSql = new SQL(params)

ipcMain.on('getSchema', async (event, arg) => {
  try {
    const list = await testSql.getAllSchema()
    event.sender.send('schemaList', list)
  } catch (error) {
    // event.sender.send('schemaList', [])
  }
})


ipcMain.on('getTable', async (event, arg) => {

  try {
    const list = await testSql.getTableBySchema(arg.schema)
    event.sender.send('tableList', {schema: arg.schema, list})
  } catch (error) {
    // event.sender.send('tableList', {schema: arg.schema, list: []})
  }
})
