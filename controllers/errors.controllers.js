exports.handleInvalidEndpoint = ((req, res, next) => {
    res.status(404).send({msg: "Path not found"})
})

exports.handlePSQLErrors = (err, req, res, next) => {
    const badRequestCodes = ['22P02', '23502']
    if(badRequestCodes.includes(err.code)) {
        res.status(400).send({msg: "bad request"})
}
if(err.code === '23503') {
    res.status(404).send({msg: "Path not found"})
}
next(err)

}

exports.handleCustomErrors = (err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
}
next(err)
}


exports.handleServerError = ((err, req, res, next) => {
    res.status(500).send({msg: "Internal server error!"})
})