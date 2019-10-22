const User = require('../models/Users')
const UserModel = new User()

class UsersControllers {
    static getById(req, res) {
        const id = req.params.id
        UserModel.get(id)
            .then(user => {
                if(user.empty) {
                    res
                        .sendStatus(404)
                        .send({ message: 'User not found' })
                }
                res.json( user.data() )
            })
            .catch(err =>  {
                res
                    .sendStatus(500)
                    .json( err )
            })
    }
}

module.exports = UsersControllers