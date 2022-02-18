const bcrypt = require('bcrypt')

const helpers = {}
const {format} = require('timeago.js')


helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

helpers.matchPassword = async(password, savePassword) => {

    try{
        return await bcrypt.compare(password, savePassword)
    }catch(error){
        console.log(error)
    }

    
}


helpers.timeago = (fecha) => {
    return format(fecha)
}

module.exports = helpers