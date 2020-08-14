const mysql = require('mysql')

class MySqlDoc {
  constructor(props) {
    this.pool = mysql.createPool({
      host: props.host,
      user: props.user,
      password: props.password,
      port: props.port,
    });
  }

  endPool() {
    this.pool.end
    this.pool = null
  }

  runSql(sql, param = []) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function(err, connection) {
        if (err) return reject(err);
  
        connection.query(sql, param, (error, results, fields) => {
          connection.release();
          if (error) return reject(error);
          resolve(results);
        });
      });
    })
  }
  
  async getTableBySchema(schema) {
    const sql = `SELECT table_name, table_comment from information_schema.tables WHERE table_schema='${schema}' and table_type='base table'`
    try{
      let tableList = await this.runSql(sql)
      return tableList
    } catch(e) {
      console.error(e)
      return []
    }
  }
  
  async getAllSchema() {
    const sql = `SELECT SCHEMA_NAME AS 'Database' FROM INFORMATION_SCHEMA.SCHEMATA`
    try{
      let schemaList = await this.runSql(sql)
      return schemaList.map(item => item.Database)
    } catch(e) {
      console.error(e)
      return []
    }
  }
  
  async getTableColumn(schema, table) {
    const sql = `SELECT
        COLUMN_NAME 列名,
        column_key 主键,
        COLUMN_TYPE 数据类型,
        DATA_TYPE 字段类型,
        CHARACTER_MAXIMUM_LENGTH 长度,
        IS_NULLABLE 是否为空,
        COLUMN_DEFAULT 默认值,
        COLUMN_COMMENT 备注 ,
        ORDINAL_POSITION 排序,
        NUMERIC_SCALE 小数位,
        EXTRA 额外信息
      FROM
      INFORMATION_SCHEMA.COLUMNS
      where
      table_schema ='${schema}'
      and table_name='${table}'`
    try{
      let columnList = await this.runSql(sql)
      return columnList
    } catch(e) {
      console.error(e)
      return []
    }
  }
}

module.exports = MySqlDoc