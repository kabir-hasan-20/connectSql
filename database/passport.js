const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const db = require("./db");

passport.use(

    new LocalStrategy(

        (username, password, done) => {

            const sql =
            "SELECT * FROM user WHERE username=?";

            db.query(
                sql,
                [username],

                async (err, result) => {

                    // DATABASE ERROR
                    if (err) {
                        console.log(err);
                        return done(err);
                    }

                    // USER NOT FOUND
                    if (!result || result.length === 0) {
                        return done(null, false,{message:"Wrong username"});
                    }

                    const user = result[0];

                    // PASSWORD CHECK
                    const match = await bcrypt.compare(
                        password,
                        user.password
                    );

                    // LOGIN SUCCESS
                    if (match) {
                        return done(null, user);
                    }

                    // WRONG PASSWORD
                    return done(null, false,{message:"Wrong password"});

                }

            );

        }

    )

);



// SESSION SAVE
passport.serializeUser((user, done) => {

    done(null, user.id);

});



// USER GET FROM SESSION
passport.deserializeUser((id, done) => {

    const sql =
    "SELECT * FROM user WHERE id=?";

    db.query(
        sql,
        [id],

        (err, result) => {

            if (err) {
                return done(err);
            }

            done(null, result[0]);

        }

    );

});

module.exports = passport;