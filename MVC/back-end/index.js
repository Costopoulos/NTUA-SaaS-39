const express = require("express");
const app = express();
const cors = require("cors");
var Sequelize = require("sequelize");
const session = require("express-session");
const pgSession = require("express-pg-session")(session);
// const pool = require("./db");
// const flash = require("req-flash");
const flash = require("connect-flash");
require('dotenv').config();
const sessionPool = require('pg').Pool;






  const sessionDBaccess = new sessionPool({
    user: "postgres",
    password: "68709900",
    host: "localhost",
    port: 5432,
    database: "soa_db"
  });

  
    const sessionConfig = {
      store: new pgSession({
          pool: sessionDBaccess,
          tableName: 'sessions'
      }),
      name: 'SID',
      expire: 24 * 60 * 60 * 1000,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: true, //aameSite
          secure: false // ENABLE ONLY ON HTTPS
      }};

// const fs = require('fs');
// const path = require('path');

// const options = {
// 	host: 'localhost',
// 	port: 5432,
// 	user: 'postgres',
// 	password: '68709900',
// 	database: 'soa_db',
// };

// const knex = require('knex')({
// 	client: 'pg',
// 	connection: options,
// });

// knex.schema.hasTable('session').then(exists => {
// 	if (exists) return;
// 	return new Promise((resolve, reject) => {
// 		const schemaFilePath = path.join(__dirname, 'node_modules', 'connect-pg-simple', 'table.sql');
// 		fs.readFile(schemaFilePath, (error, contents) => {
// 			if (error) return reject(error);
// 			const sql = contents.toString();
// 			knex.raw(sql).then(() => {
// 				resolve();
// 			}).catch(reject);
// 		});
// 	});
// }).then(() => {
// 	// Session table ready.
// 	const pgSession = require('connect-pg-simple')(session);
// 	const sessionStore = new pgSession({
// 		conObject: options,
// 	});
// 	console.log(sessionStore);
// });


// const sequelize = require("./utils/sequelize-singleton");

// require('./models/user');
// require('./models/Sessions');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");
app.use(flash());

// console.log(pool);
// console.log(pool.options.database);

// user = pool.options.user; //postgres

app.use(session(sessionConfig));

// var SequelizeStore = require("connect-session-sequelize")(session.Store);

// var sequelize = new Sequelize("soa_db", "postgres", "68709900", {
//   dialect: "postgres",
// });

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 3600,
//     },
//     store: new SequelizeStore({
//       db: sequelize,
//       table: "Sessions", //Sessions
//       conString : 'pg://' + process.env.DATABASE_USERNAME + ':' + process.env.DATABASE_PASSWORD + '@' + process.env.DATABASE_HOST + '/' + process.env.DATABASE_NAME
//     }),
//   })
// );

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  next();
});

////////////////////////////////////////////////      ENDPOINTS      ///////////////////////////////////////////////////////////////////////////////////

//Home
app.get("/", (req,res) => {
  return res.render('home.ejs', {successMessage: req.flash("successMessage")});
});

///////////////// AUTH /////////////////////

//Signup
app.use("/signup", require("./routes/api/signup.js"));

//Signin
app.use("/signin", require("./routes/api/signin.js"));

//Signout
app.use("/signout", require("./routes/api/signout.js"));

///////////////// Questions CRUD /////////////////////

//Create Question
app.use("/createquestion", require("./routes/api/questionscreate.js"));

//Read-List Question
app.use("/listquestions", require("./routes/api/questionslist.js"));

//Answer Question
// app.use("/questions/:id", function(req,res){
//   return res.render("questionsanswer.ejs", {question_id: req.params.id})
// })
app.use("/answerquestion", require("./routes/api/questionsanswer.js"))

///////////////// Graphs /////////////////////
    //Signed Out Graphs
//Questions per Keyword
app.use("/statisticsperkeyword", require("./routes/api/kwstats.js"))

//Questions per day
app.use("/statisticsperperiod", require("./routes/api/kwperiod.js"))

//Dashboard
app.use("/dashboard", require('./routes/api/profile.js'))
// app.get("/dashboard", (req,res) => {
//   return res.render('dashboard.ejs', {successMessage: req.flash("successMessage")});
// });

//About
app.get("/about", (req,res) => {
  return res.render('about.ejs');
});

//Contact
app.get("/contact", (req,res) => {
  return res.render('contact.ejs');
});



//Static files
app.use('/static', express.static('media'));

app.use("/test", require("./routes/api/test.js"));

//Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
  // console.log('started at port 5000');
});

// app.listen(5000, () => {
//   console.log("server started at 5000");
// })

