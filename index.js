require('dotenv').config()
const { BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET } = process.env;

const AWS = require('aws-sdk');

const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
});

function uploadObjectToS3Bucket(objectName, objectData) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: objectName,
    Body: objectData
  };
  s3bucket.upload(params, function (err, data) {
    if (err) throw err;
    console.log(`File uploaded successfully at ${data.Location}`)
  });
}

uploadObjectToS3Bucket('helloworld.json', 'Hello World!');
