const connection = require('../configs/db')

module.exports = {
    response: (res, result, status, err, pagination)=>{
        const data = {};
        if(pagination){
            data.paginations = pagination
        }
        data.status = 'succses'
        data.status_code = status
        data.result = result
        data.err = err || null
        return res.status(data.status_code).json(data)
    },
    actionQuery: (...arg) =>{
        return new Promise((resolve, reject)=>{
            connection.query(...arg, (err, result)=>{
                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}