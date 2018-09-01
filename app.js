#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const root = process.cwd()
let filepath = process.argv[2]
if (!filepath) {
  console.log('places give a csv file path')
  return
}
filepath = path.resolve(root, process.argv[2])

fs.readFile(filepath, function (err, data) {
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
  fs.readFile(path.resolve(__dirname, './tpl.html'), function (err, tpl) {
    if (err) {
      console.log(err)
      return
    }
    tpl = tpl.toString()
    tpl = tpl.replace('\'*****\'', JSON.stringify(ary))

    fs.writeFile(path.resolve(root, './index.html'), tpl, function (err) {
      if (err) {
        console.log(err)
        return
      }
      console.log('finish')
    })
  })
}
