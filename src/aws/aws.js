import AWS from 'aws-sdk';
import config from './config';

const albumBucketName = config.albumBucketName;
const bucketRegion = config.bucketRegion;
const IdentityPoolId = config.IdentityPoolId;
const accessKey = config.accessKey;
const secretKey = config.secretKey;

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

// AWS.config.update({
//   region: bucketRegion,
//   credentials: {
//     accessKey: accessKey,
//     secretKey: secretKey
//   }
// });

// AWS.config.loadFromPath('./config.json');

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName},
});


export function addPhoto(imageFile) {
  const photoKey = albumBucketName + imageFile.name;
  s3.upload({
    Key: photoKey,
    Body: imageFile,
    ACL: 'public-read'
  }, function(err, data) {
    if (err) {
      console.log('ERROR: ', err);
      return ('There was an error uploading your photo: ', err.message);
    }
    alert('Successfully uploaded photo.');
  });
}

// export function addPhoto1(albumName) {
//   var files = document.getElementById('photoupload').files;
//   if (!files.length) {
//     return alert('Please choose a file to upload first.');
//   }
//   var file = files[0];
//   var fileName = file.name;
//   var albumPhotosKey = encodeURIComponent(albumName) + '//';
//
//   var photoKey = albumPhotosKey + fileName;
//   s3.upload({
//     Key: photoKey,
//     Body: file,
//     ACL: 'public-read'
//   }, function(err, data) {
//     if (err) {
//       return alert('There was an error uploading your photo: ', err.message);
//     }
//     alert('Successfully uploaded photo.');
//     viewAlbum(albumName);
//   });
// }