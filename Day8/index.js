const express = require("express");
const fs = require("fs");
const {
  readAllData,
  writeData,
  findTodoById,
  lastData,
  updateTodoStatus
} = require("./controller");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/todos", (req, res) => {
  const data = [
    {
      id: 1,
      username: "budi",
      email: "budi@mail.com",
    },
    {
      id: 2,
      username: "lala",
      email: "lala@gmail.com",
    },
  ];
  res.json(data);
});

app
  .route("/api/v1/todos")
  .get((req, res) => {
    const data = readAllData();
    const resData = {
      status: true,
      message: "success retrieved todos",
      data: data,
    };
    res.json(resData);
  })
  .post((req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let completed = req.body.completed;

    const data = readAllData();
    const todo = {
      id: lastData(),
      title: title,
      description: description,
      completed: completed,
    };
    data.push(todo);
    writeData(data);
    res.json({
      success: true,
      message: "success input data",
      data: todo,
    });
  });

app
  .route("/api/v1/todos/:id")
  .get((req, res) => {
    let id = req.params.id;
    // res.json(parseInt(id))
    const data = readAllData();
    const dataById = data.filter((e) => {
      return e.id == parseInt(id);
    });
    res.json({
      success: true,
      message: "success retrivied todo",
      data: dataById,
    });
  })
  .put((req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let description = req.body.description;
    // let dataById = readAllData().find((e) => e.id === parseInt(id));
    if (findTodoById(id) === undefined) {
      return false;
    } else {
      const todos = readAllData();
      const newTodos = todos.map((todo) => {
        if (todo.id === parseInt(id)) {
          todo.title = title;
          todo.description = description;
        }
        return todo;
      });
      writeData(newTodos);
      let dataUpdate = readAllData().find((e) => e.id === parseInt(id));
      res.json({
        success: true,
        message: "success update todos",
        data: dataUpdate,
      });
      return true;
    }
  })

  .delete((req, res) => {
      let id = req.params.id
      if (findTodoById(id) !== undefined) {
        const todos = readAllData();
        const newTodos = todos.map((todo) => {
            if (todo.id === parseInt(id)) {
                // todo.delete = true;
                // console.log(todo)
                // index = todos.indexOf(todo)
                // console.log(index -1 )
                // todos.splice(index,1)
                todos.splice(todos.indexOf(todo),1)
            }
            return todo;
        });
        writeData(newTodos);
        // res.json(newTodos)
        // console.log(newTodos)
        return true
        // logger.info("Selesai");
    } 
  })

app.route('/todos/:id/complete').put((req,res)=>{
    let id = parseInt(req.params.id) 
    let status = req.body.status
    // console.log(typeof(id))
    let resutl = updateTodoStatus(id, status)
    if (resutl){
        let data = findTodoById(id)
        res.json({
            "success": true,
            "message":"success update todos",
            "data": data
        })
    }
})

app.route('/todos/:id/uncomplete').put((req,res)=>{
    let id = parseInt(req.params.id) 
    let status = req.body.status
    // console.log(typeof(id))
    let resutl = updateTodoStatus(id, status)
    
    if (resutl){
        let data = findTodoById(id)
        res.json({
            "success": true,
            "message":"success update todos",
            "data": data
        })
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
