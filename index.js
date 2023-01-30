import fs from 'fs';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';

const s3PutObjectPlugin = (options = {}) => ({
  name: 's3-put-object',
  setup(build) {
    const { Region, Bucket, Key, ACL = 'public-read', FilePath } = options;

    build.onEnd(result => {
      const params = {
        Bucket,
        Key,
        ACL,
        Body: fs.readFileSync(FilePath),
        ContentType: mime.lookup(FilePath)
      };

      // console.log(params);

      const client = new S3Client({ region: Region });
      const command = new PutObjectCommand(params);
      client
        .send(command)
        .then(data => console.log(`S3 Uploaded: ${FilePath}`))
        .catch(console.error);
    });
  }
});

export default s3PutObjectPlugin;
