const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./backend/routes');

const app = express();

app.use(bodyParser.json());
routes(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
