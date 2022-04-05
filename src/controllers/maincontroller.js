const urlModel = require("../models/urlModel.js")

const shortid=require("shortid")

const createUrl =async function(req,res){
    try{
        let data=req.body;
        let longUrl =req.body.longUrl
        let baseUrl="http://localhost:3000"

        if(Object.keys(data).length==0){
            return res.status(400).send({ status: false, msg: "Please provide some data" })
        }
                   
            
            if(!longUrl)
            return res.status(400).send({status :false, msg:" longUrl is required"})
            console.log(longUrl)
            
            const isValidLink =/(ftp|http|https|HTTP|HTTPS|FTP):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(longUrl.trim()) 
             
            if(!isValidLink){
                return res.status(400).send({ status: false, error: " Please provide valid URL" });

            }
            
        
        //if valid we create the url code
        let urlCode=shortid.generate()
        //join the generated short code in the base url
        let shortUrl=baseUrl + "/"+ urlCode

         let Url = await urlModel.findOne({ longUrl })
         if (Url) {
        return res.status(200).send({ status: true, data: { longUrl: Url.longUrl, shortUrl: Url.shortUrl, urlCode: Url.urlCode } })
        }
        let finalobject = { longUrl,shortUrl,urlCode}

        let saveddata= await urlModel.create(finalobject)
        res.status(201).send({ status: true,msg:"URL created successfully",data :{longUrl :saveddata.longUrl , shortUrl :saveddata.shortUrl, urlCode :saveddata.urlCode}})

    }catch(err){
        return res.status(500).send({ status :false ,msg:err.message})
    }
}

const getUrlcode=async function(req,res){
    try{
       
        let urlCode=req.params.urlCode

        if(!urlCode){return res.status(400).send({status:false,message:"urlCode Required"})}

         let findUrlCode=await urlModel.findOne({urlCode})
         if(!findUrlCode){return res.status(400).send({status:false,message:"urlCode not found"})}
    
      return res.status(200).redirect(findUrlCode.longUrl)
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

  

module.exports.createUrl = createUrl
module.exports.getUrlcode=getUrlcode