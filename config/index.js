const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user-models');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'},
            (email,password,done)=>{
                User.findOne({email})
                .then(user=>{
                    if(!user){
                        return done(null,false,{msg: 'Email not registered '})
                    }

                    if(!user.validPassword(password)){
                        return done(null, false,{msg: 'Incorrect password'})
                    }

                    return done(null, user)
                })
                .catch(err=>{
                    return done(err);
                })
            }

        )
    )

    passport.use('signups', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
      }, async (req, email, password, done) => {
        try {
            const {
                firstname,
                lastname,
            } = req.body;
          const user = await User.create({ 
            firstname,
            lastname, 
            email, 
            password 
            });
            console.log('user', user);
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }));

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    })

    passport.deserializeUser((id, done)=>{
        User.findById,(err,user)=>{
            done(err,user)
        }
    })
}

