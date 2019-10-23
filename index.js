const express = require('express')
const app = express()


//BODY PARSER
const bodyParser = require('body-parser')


const verifyToken = require('./middlewares/verifyToken')


//SIGN IN WITH EMAIL AND PASSWORD
const Auth = require('./controllers/Auth')
app.use(bodyParser.json())
app.post('/auth', Auth.auth)

//SINGLE USER
const Users = require('./controllers/UsersController')
app.get('/users/:id', Users.getById)

// let data = {
//   name: 'Kara Denvers',
//   email: 'kara@email.com'
// }
// let setDoc = db.collection('users').doc().set(data)

//LIST OF USERS
// app.get('/users', (request, response, next) => {
//     db.collection('users').get()
//       .then(users => response.json(
//         users.docs.map(user => ({
//           ...user.data(),
//           id: user.id,
//         }))
//       ))
//       .catch(err =>  {
//         response.json( err )
//       })
// })

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
