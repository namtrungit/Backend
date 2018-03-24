var jwt = require('jsonwebtoken');
var key = 'trungnhan';
module.exports = {
    encode: function(data){
        return jwt.sign({
            id: data
        }, key);
    },
    decode: function(token){
        try {
            var decoded = jwt.verify(token, key);
            return decoded;
        } catch(err) {
            return false;
        }
    }
}