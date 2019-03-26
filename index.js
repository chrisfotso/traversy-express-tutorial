const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const logger = require('./middleware/Logger');
const members = require('./Members')

const app = express();

//Init middleware
// app.use(logger);

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Set a static folder
app.use(express.static(path.join(__dirname, "public")));

//Members API routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));