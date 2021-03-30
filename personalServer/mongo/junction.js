
var MongoClient = require('mongodb').MongoClient
const {asValue} = require('awilix')
const Container = require('../container')


class junction {
    mongoConfig = {}
    client;
    collection;
    
    constructor(config){
        this.mongoConfig = config
        
    }
    
    init = async()=>{
                try{
                    const mongo =  new MongoClient(this.mongoConfig.mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})
                    this.client = (await mongo.connect()).db('training')
                    this.collection = this.client.collection('train')
            }catch(e){
                console.error("Mongo client unable to connect")
                throw e
            }
            
           
        
    }
    loginUser = async(req,res,next)=>{
        const fallback = ()=>this.testFunction()
        try{
            if(this.client){
            console.log("Incoming login request")
            const userData = await this.collection.findOne({username:req.body.username})
            if(userData){
                
                var {username,password,toDoList} = userData
                
                if(password === req.body.password){
                    res.send({username:username,toDoList:toDoList,loginStatus:"success"})
                    console.log('Logged in successfully')
                }else{
                    console.log('Login failed as password did not match')
                    res.send({username:username,loginStatus:"failed"})
                }
            }else{
                res.send({username:req.body.username,loginStatus:"notFound"})
            }
            }
        }catch(e){
            throw e + " because of js is stupid"
        }
    }
    checkDuplicateUser = async(req,res,next)=>{
        var userData = await this.collection.findOne({username:req.body.username})
        if(userData){
            console.log(`Duplicate Username: ${userData}`)
            res.send({username:req.body.username,success:"duplicate"})
            return;
        }else{
            console.log('Registering...')
            next()
        }
    }
    registerUser = (req,res,next)=>{
        console.log(req.body)
        try{
        this.collection.insertOne({username:req.body.username,password:req.body.password,email:req.body.email,toDoList:[]})
        res.send({username:req.body.username,success:"registered"})
        }catch(e){
            res.send({username:req.body.username,success:"failed"})
            throw e
        }
        
    }
}
exports.databaseInit = async function(config){
    const database = new junction(config)
    await database.init()
    Container.register('database',asValue(database))
    console.log(Container.has('database'))
}
exports.junction = junction