
const jsondata = require('../endpoints.json')
exports.getEndPoints = (req,res,next) => {
    return res.status(200).send(jsondata)
    .catch((err) => {
        next(err)
    })
}
