const createToken = require('../utils/createToken')
const User = require('../models/Users')
const UserModel = new User()

class Auth {
    static auth(req, res) {
        UserModel.auth(req.body.email, req.body.password)
            .then(users => {
                if (users.empty) {
                const message = {message:'Login failed'}
                return res
                    .status(401)
                    .send(message)
                }
                const [{ id }] = users.docs
                res.json({token: createToken({ id }) })
            })
            .catch(err =>  {
                res.json( err )
            })
    }
}

module.exports = Auth