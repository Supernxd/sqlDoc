// const { ipcRenderer } = require('electron')
// const SQL = require('../lib/sqlModule/mysql')
// const params = {
//   host: "192.168.84.91",
//   user: "root",
//   password: "Anji@1024",
//   port: "3306",
// }
// const testSql = new SQL(params)

// testSql.getTableColumn('weixintest', 'wechat_template_msg_sendlog').then(ret => {
//   const node = document.createElement('my-app')
//       let str = `<span slot='tableName'>${123}</span><span slot='remark'>${'test'}</span>`
//       str += `<table slot='colTable' rules='all' frame='box'>
//         <th>列名</th>
//         <th>主键</th>
//         <th>数据类型</th>
//         <th>额外信息</th>
//         <th>是否为空</th>
//         <th>默认值</th>
//         <th>备注</th>`
//       for(const value of ret.values()) {
//         str += `<tr>
//           <td>${value.列名}</td>
//           <td>${value.主键}</td>
//           <td>${value.数据类型}</td>
//           <td>${value.额外信息}</td>
//           <td>${value.是否为空}</td>
//           <td>${value.默认值}</td>
//           <td>${value.备注}</td>
//         </tr>`
//       }
//       str += '</table>'
//       node.innerHTML = str
//       document.getElementById('content').append(node)
// }).catch(err => console.log(err))


ipcRenderer.send('getSchema')

ipcRenderer.on('schemaList', (event, arg) => {
  const list = arg.map(item => {
    return { id: item, text: item, init: false, children: [{text: 1}]}
  })
  $('#left').jstree({
    'core' : {
      themes: {
        icons: false
      },
      'check_callback': true,
      'data' : list
    },
    'checkbox': {
      'three_state': false,
    },
    "plugins" : [
      // "checkbox"
    ]
  })
  .bind("loaded.jstree", function(event, data) {
    arg.map(item => {
      // $('#'+item).hide_checkboxes(); 
      // jstree-checkbox
    })
  })
  .bind("select_node.jstree", function(event, data) {
    if(data.node.parent === "#" && data.node.children.length === 0){
        data.node.children = []
        ipcRenderer.send('getTable', {schema: data.node.id})
    }
  })
  .on("changed.jstree", function (e, data) {
    console.log(e, data)
    if(data.selected.length) {
      
    }
  })
  .on("open_node.jstree", function (e, data) {
    if(data.node.parent === "#" && !data.node.original.init){
      data.node.children = []
      data.node.original.init = true
      ipcRenderer.send('getTable', {schema: data.node.id})
    }
  })
  .bind("check_all.jstree", function (s) {
    console.log(s)
    if(data.selected.length) {
      
    }
    return false
  });
})


ipcRenderer.on('tableList', (event, arg) => {
  const { schema, list } = arg
  if(list.length <= 0) return
  // selectedNode.children = [];
  const jsTree = $('#left').jstree()
  list.forEach(element => {
    jsTree.create_node('#'+schema,{ id: `${element.schema}_${element.table_name}`, text: element.table_name },"last");
  })
})