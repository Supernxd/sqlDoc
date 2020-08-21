const fs = require('fs')
const officegen = require('officegen')
const docx = officegen('docx')
const outPath = './out/'

var originStyle = {
  tableColWidth: 4261,
  tableColor: "ada",
  tableAlign: "center",
  sz: '12',
}
 
const tablehead = headAry => {
  return headAry.map( item => {
    return {
      val: item.text,
      opts: {
        align: "center",
        sz: '12',
        ...item.opts
      }
    }
  })
} 

exports.createTableData = (headAry, param, tableStyle) => {
  const head = tablehead(headAry)

  return [
    {
      type: "table",
      val: [
        head,
        ...param
      ],
      opt: tableStyle || originStyle
    }
  ]
}


exports.genDoc = (data, fileName) => {

  return new Promise((resolve, reject) => {
    docx.createByJson(data);
    const filePath = `${outPath}${fileName || Date.now().toString()}.doc`
    console.log(filePath)
    let out = fs.createWriteStream(filePath)

    docx.generate(out)

    out.on('error', function(err) {
      console.log('error数据', err)
      reject('创建失败')
    })
    
    out.on('close', function() {
      resolve()
    })
    
  })

}

