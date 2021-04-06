const { readFileSync } = require('fs')
module.exports = async function(app){
    try{
    //read a json file and send the data
    const fileData  = readFileSync(__dirname+"\\data.json")
    app.get("/getData",(req,res)=>{
        console.log("Sending data")
        res.send(JSON.parse(fileData))
    })
}catch(e){throw e}
    
}