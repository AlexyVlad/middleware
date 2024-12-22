import express from 'express'
import fileUpload from 'express-fileupload'
import path from "path"

import { router } from './routers/index.js'
import { seq } from './db/index.js'
import { initDB } from './db/init.js'

const app = express()
const PORT = 8000

app.use(express.json())
app.use('/media', express.static(path.join(`${process.cwd()}/media`)))
app.use(fileUpload({}))
app.use('/api', router)

seq
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

seq.sync({ alter: true }).then(async (result) => {
  console.log('test succesful')
  await initDB()
})

app.listen(PORT, function () {
  console.log('Server started in PORT :', PORT)
})
