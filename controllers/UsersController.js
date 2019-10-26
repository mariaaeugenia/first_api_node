const User = require('../models/Users')
const userModel = new User()
const cacheManager = require('cache-manager')
const { cache } = require('../config/default')
//CACHE LIBRARY INSTANCE
const memoryCache = cacheManager.caching(cache)

class UsersControllers {
    static getById(req, res) {
        const id = req.params.id
        const key = 'user_${id}'
        memoryCache.get(key, (err, result) => {
            if (result) {
                return res.json(result)
            }

            userModel.get(id)
            .then(user => {
                if(user.empty) {
                    res
                        .sendStatus(404)
                        .send({ message: 'User not found' })
                }
                const userData = user.data()
                memoryCache.set(key, userData)
                res.json( userData )
            })
            .catch(err =>  {
                res
                    .sendStatus(500)
                    .json( err )
            })
        })
    }
}

module.exports = UsersControllers