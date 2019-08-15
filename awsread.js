const csvtojsonV2=require("csvtojson");
require('dotenv').config();
const AWS = require('aws-sdk');
const csv = require('csvtojson');

const S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_AMAZON_SECRET_KEY ,
    region:'us-east-2'
});
var file = require('fs').createWriteStream('./file');

const params = {
    Bucket: 'lqrecon',
      Key: 'CD 1.csv',
  };
const stream = S3.getObject(params).createReadStream().pipe(file)

console.log('Stream' + stream)

