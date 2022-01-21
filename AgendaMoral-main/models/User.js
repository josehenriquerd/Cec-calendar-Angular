const knex = require('../database/connection')
const bcrypt = require('bcrypt-nodejs')
const PasswordToken = require('./PasswordToken')

class User {
    async create(name, email, password, admin) {
        const adminBool = Boolean(admin)
        try {
            const encryptPassword = password => {
                const salt = bcrypt.genSaltSync(10)
                return bcrypt.hashSync(password, salt)
            }
            await knex.insert({ name: name, email: email, password: encryptPassword(password), admin: adminBool}).table('users')
        } catch (error) {
            console.log(error)
        }
    }

    async get() {
        try {
            const users = await knex.select('id', 'name', 'email', 'password', 'admin').whereNull('deleteAt').from('users')
            return users
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async getById(id) {
        try {
            const user = await knex('users').select('id', 'name', 'email', 'admin').where({id: id}).whereNull('deleteAt').first()
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async getByEmail(email){
        try{
            const user = await knex('users').where({ email: email }).first()
            return user
        } catch(error){
            console.log(error)
        }
    }

    async update(id, name, email, admin){
        try{
            await knex.update({name: name,email:email, admin: admin}).where({ id: id}).whereNull('deleteAt').table('users')
        }catch(error){
            console.log(error)
        }
    }

    async delete(id){
        try{
            await knex('users').update({deleteAt: new Date}).where({id: id})
        }catch(error){
            console.log(error)
        }
    }

    async changePassword(newPassword, id, token){
        const encryptPassword = newPassword => {
            const salt = bcrypt.genSaltSync(10)
            return bcrypt.hashSync(newPassword, salt)
        }
        await knex.update({password: encryptPassword(newPassword)}).where({id: id}).table('users')
        await PasswordToken.setUsed(token)
    }
}

module.exports = new User()