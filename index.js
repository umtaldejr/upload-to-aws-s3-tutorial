require('dotenv').config()
const { BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET } = process.env;

const https = require('https');
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

https.get('https://via.placeholder.com/300', (res) => {
  const data = [];

  res.on('data', (chunk) => {
    data.push(chunk);
  });

  res.on('end', () => {
    const buffer = Buffer.concat(data);
    uploadObjectToS3Bucket('image.png', buffer);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
