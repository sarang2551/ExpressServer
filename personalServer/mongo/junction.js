
var MongoClient = require('mongodb').MongoClient


exports.junction =  class junction {
    mongoConfig = {}
    client;
    mongodb;
    static INSTANCE;
    constructor(config){
        this.mongoConfig = config
        
    }
    init = async()=>{
                try{
                 this.client = await MongoClient.connect(this.mongoConfig.mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})
                 this.mongodb = (await this.client.connect()).db();
                 console.log('somethign')
            }catch(e){
                console.error("Mongo client unable to connect")
                throw e
            }
            
           
        
    }
    loginUser = async(req,res,next)=>{
        const fallback = ()=>this.testFunction()
        try{
            console.log(req.body)
            console.log(this.mongodb)
            
        }catch(e){
            throw e + " because of js is stupid"
        }
    }
    registerUser = (req,res,next)=>{
        console.log(req.body)
    }
}