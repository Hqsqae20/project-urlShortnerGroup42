const mongoose = require('mongoose')
require('mongoose-type-url')


const urlSchema = new mongoose.Schema({

    urlCode:{
              type:String,
              required:true,
              lowercase:true,
              unique:true,
              trim:true
    },

    longUrl:{
              type:String,
              required:true
    },

    shortUrl:{
              type:String,
              required:true
    },

    }, { timestamps: true })



module.exports = mongoose.model('Url', urlSchema)