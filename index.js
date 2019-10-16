const express = require('express');
const app = express();
//FIREBASE
const firebase = require('firebase');
const firebaseConfig = require('./config/firebase');
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

//JWT
const config = require('./config/default');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


//SIGN IN WITH EMAIL AND PASSWORD
app.use(bodyParser.json());
app.post('/auth', (request, response, next) => {
  db.collection('users')
  .where('email', '==', request.body.email)
  .where('password', '==', request.body.password)
  .get()
    .then(users => {
      if (users.empty) {
        const message = {message:'Login failed'};
        return response
          .status(401)
          .send(message);
      }
      const id = users.docs[0].id;
      const token = jwt.sign(
        { id },
        config.secret,
        { expiresIn: 300}
      );
      const result = {'token':token};

      response.json(result);
    })
    .catch(err =>  {
      response.json( err );
    });
});


const verifyJWT = (request, response, next) => {
  const token = request.headers['x-access-token'];
  if (!token) {
    return response
    .status(401)
    .send({
        code: 'not_authorized',
        message: 'Not authorized'
      });
  }

  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return response
      .status(500)
      .send({ message: error });
    }
    console.log(decoded);
    next();
  });
}

//SINGLE USER
app.get('/users/:id', verifyJWT, (request, response, next) => {
    const id = request.params.id;
    db.collection('users').doc(id).get()
      .then(user => {
        if(user.empty) {
               response
                   .sendStatus(404)
                   .send({ message: 'User not found' });
           }
        response.json( user.data() );
      })
      .catch(err =>  {
        response
          .sendStatus(500)
          .json( err );
      });
});

// let data = {
//   name: 'Kara Denvers',
//   email: 'kara@email.com'
// };
// let setDoc = db.collection('users').doc().set(data);

//LIST OF USERS
app.get('/users', (request, response, next) => {
    db.collection('users').get()
      .then(users => response.json(
        users.docs.map(user => ({
          ...user.data(),
          id: user.id,
        }))
      ))
      .catch(err =>  {
        response.json( err );
      });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
