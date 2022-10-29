const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const HttpError = require('../middleware/http-error');
const User = require('../model/user-model');
const passwordHash = require('password-hash');
const jwt = require('../utils/token')

const createAccount = async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed , please check your Data ', 422))
    }

    const { name, email, password } = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Sign In Failed', 500)
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError('Email Already In Use', 422)
        return next(error)
    }
    const hashed_key = passwordHash.generate(password)
    const createdUser = new User({
        name,
        email,
        password: hashed_key,
    })


    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError('Cannot Save the user record' + err, 500)
        return next(error)
    }

    const data = createdUser.toJSON()
    delete data.password

    res.status(201).json({ user: data })
}

const signIn = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError(`Invalid inputs passed , please check your Data `, 422))
    }

    const { email, password } = req.body
    // return res.status(200).json({ email, password })

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return next(new HttpError('User Doesnot Exists , Please Create A New Account ', 500))
    }

    if (!existingUser) {
        return next(new HttpError('User Doesnot Exists , Please Create A New Account ', 500))
    }
    const existingUser_password = existingUser.password;

    if (!passwordHash.verify(password, existingUser_password)) {

        return next(new HttpError('Invalid Password Provided', 500))
    }




    const user = {
        _id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
    }

    return res.status(202).json({ user })

}

exports.createAccount = createAccount
exports.signIn = signIn

