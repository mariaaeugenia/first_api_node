const express = require('express')
const app = express()
//FIREBASE
// const firebase = require('firebase')
// const firebaseConfig = require('./config/firebase')
// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const db = firebaseApp.firestore()

//BODY PARSER
const bodyParser = require('body-parser')

const createToken = require('./utils/createToken')
const verifyToken = require('./middlewares/verifyToken')


//SIGN IN WITH EMAIL AND PASSWORD
// app.use(bodyParser.json())
// app.post('/auth', (request, response, next) => {
//   db.collection('users')
//   .where('email', '==', request.body.email)
//   .where('password', '==', request.body.password)
//   .get()
//     .then(users => {
//       if (users.empty) {
//         const message = {message:'Login failed'}
//         return response
//           .status(401)
//           .send(message)
//       }
//       const [{ id }] = users.docs
//       response.json({token: createToken({ id }) })
//     })
//     .catch(err =>  {
//       response.json( err )
//     })
// })

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
