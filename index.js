const express = require('express');
const app = express();
//FIREBASE
const firebase = require('firebase');
const firebaseConfig = require('./config/firebase');
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

//SINGLE USER
// app.get('/users/:id', (request, response, next) => {
//     const id = request.params.id;
//     db.collection('users').doc(id).get()
//       .then(user => {
//         response.json( user.data() );
//       })
//       .catch(err =>  {
//         response.json( err );
//       });
// });

// let data = {
//   name: 'Kara Denvers',
//   email: 'kara@email.com'
// };
// let setDoc = db.collection('users').doc().set(data);

//LIST OF USERS
app.get('/users/:id', (request, response, next) => {
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
