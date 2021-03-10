exports.success = function (message, value, code, res) {
    res.status(`${code}`).json({
        "success":true,
        "message":message,
        "data":value
    });
}

exports.notSuccess = function (message, value, code, res) {
    res.status(`${code}`).json({
        "success":false,
        "message":message,
        "data":value
    });
}