require('dotenv').config()
const express = require('express')
const path = require('path')
const configsViewEngine = require('./configs/viewEngine')
const webRouters = require('./routes/web')
// const connection = require('./configs/database')


const app = express()
const port = process.env.PROT || 8080
const hostname = process.env.HOST_NAME

configsViewEngine(app)

//configs req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', webRouters)
// app.use('/v1', webRouters)


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})