const jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    // toke 3 farkli yol ile gelebilir. Gelebicel tum yollar kontrol edilir ve token datasi ainir
    const token=req.headers['x-access-token'] || req.body.token || req.query.token
};
