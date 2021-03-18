const express = require("express"),
  route = express.Router(),
  fsPromises = require('fs').promises

route.use(async (req, _ ,next)=>{
  req.test_data = await fsPromises.readFile(`${__dirname}/test.json`, 'utf8')
  next()
})

route.use(async (req, _ ,next)=>{
  req.get_data = await fsPromises.readFile(`${__dirname}/testGet.json`, 'utf8')
  next()
})

route.get('/info', (req, res)=>{
  res.send(JSON.parse(req.get_data)[1]["name"]);
})

route.post('/postInfo', (req, res)=>{
  let { name } = req.body
  let test_data = req.test_data || JSON.stringify([])
  test_data = JSON.parse(test_data)
  test_data.push({
    id: test_data.length === 0 ? 1 : parseInt(test_data[test_data.length - 1]["id"] + 1),
    name
  })
  fsPromises.writeFile(`${__dirname}/test.json`, JSON.stringify(test_data), 'utf8').then(_=>{
    res.status(200).type('application/json').send({
      code: 1,
      codeText: 'ok'
    })
  }).catch(_=>{
    res.status(404).type('application/json').send({
      code: 0,
      codeText: "error"
    })
  })
})

module.exports = route