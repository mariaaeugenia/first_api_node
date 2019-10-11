const express = require('express');
//FIREBASE
const firebase = require('firebase');
const firebaseConfig = require('./config/firebase');

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const app = express();

app.get('/users/:id', (request, response, next) => {
    console.log("ENTREI NA PORTA USERS");
    const id = request.params.id;
    db.collection('users').doc(id).get()
      .then(user => {
        //console.log(user.data());
        response.json(user.data());
      })
      .catch(err =>  {
        return response.json( err );
      });
});

app.get('/users', (request, response, next) => {
    console.log("ENTREI NA PORTA USERS");
    response.json({ success: true });
    //console.log(response);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
