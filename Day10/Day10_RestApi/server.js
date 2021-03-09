const express = require('express')
const app = express()
const port = 3000
const router = express.Router()
const {router:routerStock}=require('./app/routes/stock')

app.use(express.json())

router.use('/api/v1', routerStock)

app.use(router)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})