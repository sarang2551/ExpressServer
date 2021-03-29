const dotenv  = require('dotenv')
class Enviroment {
    dotenvPath;
    constructor(){
        this.setenvPath()
    }
    setenvPath = ()=>{
        if (process.env.ENVIRONMENT_FILE) {
            
            this.dotenvPath = envFile || process.env.ENVIRONMENT_FILE || ".env";

            dotenv.config({
                path: this.dotenvPath,
            });
            
        } else {
            dotenv.config();
        }
    }
    getMongoConfig = ()=>{
        return {
            mongoUrl: process.env.MONGO_URL
        }
    }
}



async function init(){
var express = require('express')
const app = express()
const cor = require('cors')
const bodyParser = require("body-parser")
app.use(cor())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// Parse JSON bodies (as sent by API clients)
var mongoConfig = new Enviroment().getMongoConfig()
require('./routes')(app,mongoConfig)
const junction = require('./mongo/junction').junction
new junction(mongoConfig).init()
app.listen(process.env.PORT || 3000,()=>{
    console.log('server started')
})

}
init()
