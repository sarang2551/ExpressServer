module.exports = function(app,config){
    const junction  = require('../../mongo/junction').junction
    const database = new junction(config)
    app.post('/login',database.loginUser)
    app.post('/register',database.registerUser)
}