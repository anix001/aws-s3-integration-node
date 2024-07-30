// import { PutObjectCommand } from "@aws-sdk/client-s3";
import express, { Request, Response } from "express";
import { Upload } from '@aws-sdk/lib-storage';
// import { Readable } from "stream";
import  s3Client  from '../common/s3Client'; // Ensure this is a proper TypeScript module
import  upload  from '../common/upload'; // Ensure this is a proper TypeScript module

const router = express.Router();

interface MulterFile {
  buffer: Buffer;
  originalname: string;
}

router.post('/', upload.single('file'), async (req: Request, res: Response) => {
  // console.log("🚀 ~ router.post ~ req:", req);
  try{
  const file = req.file as MulterFile; // Cast req.file to the expected type
  console.log("🚀 ~ router.post ~ file:", file);
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  // const fileStream = Readable.from(file.buffer);

  const options = {
    Bucket: 'anix-test-s3-bucket',
    Key: file.originalname,
    Body: file.buffer
  };

  // try {
  //   await s3Client.send(new PutObjectCommand(options));
  //   console.log('File uploaded successfully');
  //   res.status(200).send('File uploaded');
  // } catch (err) {
  //   console.log("ERROR =>", err);
  //   res.status(500).send('Failed to upload file');
  // }
    
  const parallelUploads3 = new Upload({
    client: s3Client,
    params: options
  });

  await parallelUploads3.done();
  
  res.status(200).send({ message: 'File uploaded successfully!' });
} catch (error) {
  console.error('Error uploading file:', error);
  res.status(500).send({ error: 'Error uploading file.' });
}


});

export default router; // Use ES6 export syntax
