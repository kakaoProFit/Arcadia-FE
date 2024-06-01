import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: 'AKIA6JHGVMBAWPG7Y2P4',
  secretAccessKey: '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',
  region: 'ap-northeast-2',
})

const s3 = new AWS.S3()
const myBucket = 'arcadia-profit-1'
const signedUrlExpireSeconds = 60 * 5

export default function CreateUrl(fileName) {
  const url = s3.getSignedUrl('putObject', {
    Bucket: myBucket,
    Key: fileName,
    // Expires: signedUrlExpireSeconds,
    ContentType: 'image/*',
  })
  console.log('url2: ', url)
  return url
}
