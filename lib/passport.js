const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const helpers = require('./helpers')

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    
}, async(req, email, password, done) => {


    const user = await new User(req.body)
    user.password = await helpers.encryptPassword(password)
    user.id = user.insertId
    await user.save()
    done(null, user)
}))

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    
}, async(req, email, password, done) => {

    const user =  await User.findOne({email:email})

    const match = await helpers.matchPassword(password, user.password)

    if(match){
        done(null, user)
    }else{
        done(null, false)
    }
    
}))


passport.serializeUser(async(user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id)
    done(null, user)
})