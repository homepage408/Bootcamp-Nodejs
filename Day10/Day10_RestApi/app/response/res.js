exports.success = function(message, values, code, res){
    let data = {
        success: true,
        message: message,
        data: values
    }
    res.status(`${code}`).json(data)
}

exports.notSuccess = function(message, values, code, res){
    let data = {
        success: false,
        message: message,
        data: values
    }
    res.status(`${code}`).json(data)
}