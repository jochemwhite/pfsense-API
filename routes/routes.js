// const router = require('express').Router()
import express from "express";
import {register, login, user} from "../Controllers/users.js"
import { add_port } from "../Functions/pfsense.js";

const router = express.Router();


router.post('/register', register)

router.post('/login', login)
router.post('/openport', add_port)
router.get('/user', user)

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'success'
    })
})

export default router 
