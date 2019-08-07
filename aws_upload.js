const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_AMAZON_SECRET_KEY ,
    secretAccessKey: process.env.AWS_ACCESSKEYID,
    region:'us-east-2'
});

const fileName = './upload/CD 1.csv';

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'lqrecon', // pass your bucket name
         Key: 'CD 1.csv', // file will be saved as testBucket/contacts.csv
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};

uploadFile();

