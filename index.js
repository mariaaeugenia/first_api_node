const express = require('express');

const app = express();

app.get('/users', (request, response, next) => {
    console.log("ENTREI NA PORTA USERS");
    response.json({ success: true });
    //console.log(response);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});