const {baseResponse}= require('./../helpers/baseResponse')

const notFound=(req, res)=>{
    const urlOrigin = req.urlOrigin
    return baseResponse({
        success:false,
        message:`Sorry ${urlOrigin} not Found`,
    })(res, 404)
}
module.exports = {
    notFound
};
