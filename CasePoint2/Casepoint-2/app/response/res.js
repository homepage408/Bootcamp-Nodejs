exports.resJsonSucces = function (message, values, code,res) {
    let data = {
        "success": true,
        "message": message,
        "data": values
    }
    res.status(`${code}`).json(data)
}

exports.resJsonNotSuccess = function (message, values, code,res) {
    let data = {
        "success": false,
        "message": message,
        "data": values
    }
    res.status(`${code}`).json(data)
}

// exports.Create = function (values, message,res) {
//     let data = {
//         "success": true,
//         "message": message,
//         "data":[
//             values
//         ]
//     }
//     res.status(201).json(data)
// }

// exports.Delete = function (values, message,res) {
//     let data = {
//         "success": true,
//         "message": message,
//         "data":[
//             values
//         ]
//     }
//     res.status(204).json(data)
// }

// exports.Error404 = function (values, message ,res) {
//     let data = {
//         "success": true,
//         "message": message,
//         "data":[
//             values
//         ]
//     }
//     res.status(404).json(data)
// }

// exports.notSuccess = function (values,message,res) {
//     let data = {
//         "success": false,
//         "message": values.message,
//         "data":values
//     }
//     res.status(500).json(data)
// }