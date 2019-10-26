const express = require('express')
const app = express()


//BODY PARSER
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//SIGN IN WITH EMAIL AND PASSWORD
const Auth = require('./controllers/Auth')
app.post('/auth', Auth.auth)

//SINGLE USER
const routes = require('./routes')
app.use(routes)


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
