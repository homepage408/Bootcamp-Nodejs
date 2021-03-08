const express = require('express')
const app = express()
const port = 3000
const router = express.Router()
const {router : routerUser } = require('./app/routes/user')
const {router : routerTodo } = require('./app/routes/todo')
const {router : routerComment} = require('./app/routes/comments')

app.use(express.json())

router.use("/api/v1", [routerUser, routerTodo, routerComment])

app.use(router)


app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})