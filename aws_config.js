


AWS.config.update({
    accessKeyId : process.env.AWS_AMAZON_SECRET_KEY,
    secretAccessKey : process.env.AWS_ACCESSKEYID
    });
    AWS.config.region = 'us-east-2';