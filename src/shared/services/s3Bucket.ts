import AWS from 'aws-sdk'

const S3_BUCKET = import.meta.env.VITE_BUCKET_NAME
const REGION = import.meta.env.VITE_BUCKET_REGION
AWS.config.update({
    accessKeyId: import.meta.env.VITE_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_SECRET_KEY
})

export const myBucket =  new AWS.S3({
    params: {
        Bucket: S3_BUCKET
    },
    region: REGION
})