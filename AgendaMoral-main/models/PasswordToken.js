const knex = require('../database/connection')
const User = require('./User.js')
const { existsOrError, notExistsOrError, equalsOrError } = require('../models/validation')

class PasswordToken {
    async create(email) {
        try {
            
            const user = await User.getByEmail(email)
            existsOrError(user, 'Usuário não encontrado.')
            const token = Date.now()
            await knex.insert({
                userId: user.id,
                used: 0,
                token: token
            }).table('passwordtokens')
            return token
        } catch (error) {
            console.log(error)
        }
    }

    async validate(token) {
        try {
            const Usertoken = await knex.select().where({ token: token }).table('passwordtokens').first()
            existsOrError(token, 'Token inválido')
            if (!Usertoken.used) {
                return { status: true, token: Usertoken }
            }else{
                return { status: false }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async setUsed(token) {
        await knex.update({ used: 1 }).where({ token: token }).table('passwordtokens')
    }
}

module.exports = new PasswordToken()