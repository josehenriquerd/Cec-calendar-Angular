const { existsOrError, notExistsOrError, equalsOrError } = require('../models/validation')
const User = require('../models/User')
const PasswordToken = require('../models/PasswordToken')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const authSecret = 'gabi&&jose&&lucas'

class UserController {
    async create(req, res) {
        const user = { ...req.body }
        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            const userFromDB = await User.getByEmail(user.email)
            if (!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
            await User.create(user.name, user.email, user.password)
            return res.status(200).send('Usuário Cadastrado.')
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    async index(req, res) {
        try {
            const users = await User.get()
            existsOrError(users, 'Usuário não encontrado.')
            res.status(200).json(users)
        } catch (msg) {
            return res.status(500).send(msg)
        }
    }

    async findUser(req, res) {
        try {
            const id = req.params.id
            const user = await User.getById(id)
            existsOrError(user, 'Usuário não encontrado.')
            res.status(200).json(user)
        } catch (msg) {
            return res.status(500).send(msg)
        }
    }

    async update(req, res){
        const id = req.params.id
        const editUser = {...req.body}
        try{
            existsOrError(editUser.name, 'Nome não informado')
            existsOrError(editUser.email, 'E-mail não informado')
            const userFromDB = await User.getByEmail(editUser.email)
            if (!editUser.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
            await User.update(id, editUser.name, editUser.email, editUser.admin)
            return res.status(204).send('Usuário Atualizado.')
        }catch(error){
            return res.status(500).send(error)
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id
            const userFromDB = await User.getById(id)
            existsOrError(userFromDB, 'Usuário não encontrado')
            await User.delete(userFromDB.id)
            return res.status(204).send('Usuário Apagado.')
        }catch(error){
            return res.status(400).send(error)
        }
    }

    async login(req, res){
        try{
            const user = { ...req.body }
            if (!user.email || !user.password){
                return res.status(400).send('Informe o usuário e senha!')
            }
            const userFromDB = await User.getByEmail(user.email)
            if (!userFromDB) return res.status(400).send('Usuário não encontrado')

            const isMatch = bcrypt.compareSync(user.password, userFromDB.password)
            if(!isMatch) return res.status(401).send('Email/Senha inválidos!')

            const now = Math.floor(Date.now() / 1000)

            const payload = {
                id: userFromDB.id,
                name: userFromDB.name,
                email: userFromDB.email,
                admin: userFromDB.admin,
                iat: now,
                exp: now + (60 * 60 * 24 * 3)
            }
    
            res.json({
                ...payload,
                token: jwt.sign(payload, authSecret)
            })
        }catch(error){
            console.log(error)
            return res.status(500).send(error)
        }
    }

    async recoverPassword(req, res){
        try{
            const email = req.body.email
            const token = await PasswordToken.create(email)
            return res.status(204).json(token)
        }catch(error){
            return res.status(400).send(error)
        }
    }

    async changePassword(req, res){
        const token = req.body.token
        const password = req.body.password
        const isTokenValid = await PasswordToken.validate(token)
        if(isTokenValid.status){
            await User.changePassword(password, isTokenValid.token.userId, isTokenValid.token.token)
            return res.status(200).send('Senha Alterada.')
        }else{
            res.status(500).send('Token inválido')
        }
    }
}

module.exports = new UserController()