// NodeJs Crypto
const crypto = require('crypto');

module.exports = (password, secret) => {
                 const hash = crypto.createHmac('sha256', secret)
                                     .update(password)
                                     .digest('hex')
                                     return hash;
}

// const hash = crypto.createHmac('sha256', secret)
//                    .update('I Love Cupcakes')
//                    .digest('hex')
//                    return hash;
// 
// module.exports = function(password, secret) {
//                    const has = crypto.createHmac('sha256', secret)
//                                       .update(password)
//                                       .digest('hex')
//                                       return hash;
// }