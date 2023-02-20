const handles404Errors = (err, req, res, next)=>{
    if(err.status && err.msg){
        response.status(404).send({ msg: err.msg })
    } else{
        next(err)
    }
}

const handles400Errors = (err, req, res, next)=>{
    if(err.status && err.msg){
        response.status(400).send({ msg: err.msg })
    }  else{
        next(err)
    }
}









module.exports = {handles404Errors, handles400Errors}