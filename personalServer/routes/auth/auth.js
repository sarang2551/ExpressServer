const Container = require('../../container')
module.exports = async function(app,config){
    try{
        Container.has('database')
        var database = await Container.resolve('database')
    app.post('/login',database.loginUser)
    app.post('/register',database.checkDuplicateUser,database.registerUser)
}catch(e){throw e}
    
}