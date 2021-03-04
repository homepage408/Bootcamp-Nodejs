const fs = require('fs')

const readAllData = () => {
    `get semua data yang ada`;
    const file = fs.readFileSync("./todo.json", {
        encoding: "utf-8",
    });
    return JSON.parse(file);
};

const writeData = (obj) => {
    fs.writeFileSync("./todo.json", JSON.stringify(obj, null, 4));
    return true;
};

const findTodoById = (id) => {
    return readAllData().find((e) => e.id === parseInt(id));
};

const lastData = () =>{
    let data = readAllData()
    let last = data.length
    // console.log(data[last-1].id + 1)
    return data[last-1].id + 1

}



const updateTodoStatus = (id, status) => {
    if (findTodoById(id) === undefined) {
        return false;
    } else {
        const todos = readAllData();
        const newTodos = todos.map((todo) => {
            if (todo.id === parseInt(id)) {
                todo.completed = status;
            }
            return todo;
        });
        writeData(newTodos);
        return true;
    }
};
// console.log(lastData())

// if (findTodoById(7) !== undefined) {
//     const todos = readAllData();
//     const newTodos = todos.map((todo) => {
//         if (todo.id === parseInt(7)) {
//             // todo.delete = true;
//             console.log(todos.indexOf(todo))
//         }
//         return todo;
//     });
//     // writeData(newTodos);
//     // logger.info("Selesai");
// } 

module.exports = {
    readAllData,
    writeData,
    findTodoById,
    lastData,
    updateTodoStatus
}