import { S3Client } from "@aws-sdk/client-s3";

//[setup AWS credentials]
const s3Client = new S3Client({
   region: 'us-east-1',
   credentials:{
     accessKeyId: 'default-access-key-id',
     secretAccessKey:'default-secret-access-key'
   },
});

export default s3Client;