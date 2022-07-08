const HttpError = require('../models/http-error')

let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Aman Oli',
        email: 'test@test.com',
        password: 'test'
    }
]

function getUsers(req, res, next) {
    res.json({users: DUMMY_USERS})
}


function signUp(req, res, next) {
    const { name, email, password } = req.body

    const createUser = {
        id: Math.random(),
        name,
        email,
        password
    }

    DUMMY_USERS.push(createUser)

    res.status(201).json({user: createUser})
}


function login (req, res, next) {
    const { email, password } = req.body
    const identifiedUser = DUMMY_USERS.find(u => u.email === email)
    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Couldnt identify the user', 401)
    }
    
    res.json({message: "LOGGED IN"})
}


exports.getUsers = getUsers
exports.signUp = signUp
exports.login = login