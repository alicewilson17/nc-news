exports.handleInvalidEndpoint = ((req, res, next) => {
    res.status(404).send({msg: "Path not found"})
})

exports.handlePSQLErrors = (err, req, res, next) => {
    if(err.code === '22P02') {
        res.status(400).send({msg: "bad request"})
}
next(err)

}

exports.handleCustomErrors = (err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(404).send({msg: err.msg})
}
next(err)
}


exports.handleServerError = ((err, req, res, next) => {
    res.status(500).send({msg: "Internal server error!"})
})