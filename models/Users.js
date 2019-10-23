const BaseModel = require('./BaseModel')
const OPERATORS = {
    MINOR: '<',
    MONIOR_EQUAL: '<=',
    EQUAL: '==',
    GRATER_EQUAL: '>=',
    GRATER: '>',
    CONTAIN: 'array-contains'
}


class Users extends BaseModel {

    constructor() {
        super()
        this.collection = this.db.collection('users')
        
    } 
    auth(email, password) {
        return this.collection
                    .where('email', OPERATORS.EQUAL, email)
                    .where('password', OPERATORS.EQUAL, password)
                    .get()
    }
    
    get(id) {
        return this.collection
            .doc(id).get()
    }
}

module.exports = Users