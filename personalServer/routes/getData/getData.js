const { readFileSync } = require('fs')
const Container = require('../../container')
module.exports = async function(app){
    try{
    //read a json file and send the data
    var database = await Container.resolve('database')
    const fileData  = readFileSync(__dirname+"\\data.json")
    app.get("/getPersonalData",(req,res)=>{
        console.log("Sending data")
        res.send(JSON.parse(fileData))
    })
    app.get("/getProducts",database.getAllProducts)
}catch(e){throw e}
    
}