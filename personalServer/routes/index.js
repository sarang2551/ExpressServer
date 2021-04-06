
module.exports = function(app,config){
require('./auth/auth')(app,config)
require('./getData/getData')(app)
}