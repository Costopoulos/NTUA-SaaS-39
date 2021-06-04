// const Bluebird = require("bluebird");
// const LocalStrategy = require("passport-local").Strategy;

// const userQueries = require("../queries/user");

// module.exports = (passport) => {
//   passport.serializeUser((user, done) => {
//     done(null, user.userId);
//   });

//   passport.deserializeUser((id, done) =>
//     Bluebird.resolve()
//       .then(async () => {
//         const user = await userQueries.getUserById(id);

//         done(null, user);
//       })
//       .catch(done)
//   );

//   passport.use(
//     "local",
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passwordField: "password",
//         passReqToCallback: true,
//       },
//       (req, email, password, done) =>
//         Bluebird.resolve()
//           .then(async () => {
//             const user = await userQueries.getUserByEmail(email);

//             if (!user || !(await user.comparePassword(password))) {
//               return done(null, null);
//             }

//             return done(null, user);
//           })
//           .catch(done)
//     )
//   );
// };
