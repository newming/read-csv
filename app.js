var fs = require('fs')

fs.readFile('./3379121-唯品会图片抽样.csv', function (err, data) {
  if (err) {
    console.log(err)
    return
  }
  convert(data)
})

function convert(data) {
  data = data.toString()
  var ary = data.split('\r\n')

  ary = ary.map(item => item.replace(/^"""(.+)"""$/, '$1'))
  fs.readFile('./tpl.html', function (err, tpl) {
    if (err) {
      console.log(err)
      return
    }
    tpl = tpl.toString()
    tpl = tpl.replace('*****', JSON.stringify(ary))

    fs.writeFile('index.html', tpl, function (err) {
      if (err) {
        console.log(err)
        return
      }
      console.log('fini')
    })
  })
}