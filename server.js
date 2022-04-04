const path = require('path');
const express = require("express");
<<<<<<< HEAD
const routes = require("./controllers/");
const sequelize = require("./config/connection");

=======
const session = require('express-session');
>>>>>>> develop
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret',
  cookie:{},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

const hbs = exphbs.create({});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//static() can take all contents of folder and serve as static assets. 
//useful for front-end files
app.use(express.static(path.join(__dirname, 'public')));
//set as app's preferred template engine of choice
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(require('./controllers/'));

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
