const express = require("express"),
      app = express(),
      bodyParser = require("body-parser")

app.listen(9000, _=>{
  console.log(`server is created => 9000`);
})

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,HEAD")
  // 兼容浏览器的预判断机制(试探性请求)
  req.method === "OPTIONS" ? res.send("Current server support cors") : next()
})

app.use(bodyParser.urlencoded({
  extended: false
}))

// API接口处理
app.use('/test', require('./Test/test'))

app.use((_, res)=>{
  res.status(404).send({
    code: 0,
    codeText: "接口不存在"
  })
})