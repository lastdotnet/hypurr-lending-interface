import env from 'dotenv';
import { createReadStream, promises } from 'fs';
import path from 'path';

import { S3 } from '@aws-sdk/client-s3';

env.config({ override: true, path: path.resolve('../../.env') });

const getMimeType = ({ filePath }: { filePath: string }) => {
  const isSVG = filePath.endsWith('.svg');
  if (isSVG) {
    return 'image/svg+xml';
  }
  const isPNG = filePath.endsWith('.png');
  if (isPNG) {
    return 'image/png';
  }
  const isJPG = filePath.endsWith('.jpg');
  if (isJPG) {
    return 'image/jpeg';
  }
  return undefined;
};

const uploadDir = async (s3Path: string, bucketName: string) => {
  const s3 = new S3({ region: process.env.AWS_DEFAULT_REGION });

  const getFiles = async (dir: string): Promise<string | string[]> => {
    const dirents = await promises.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
      })
    );
    return Array.prototype.concat(...files);
  };

  const files = (await getFiles(s3Path)) as string[];
  const uploads = files.map((filePath) => {
    const key = path.relative(s3Path, filePath).replace(/\\/g, '/'); // replace windows slash with linux slash

    return s3.putObject({
      ACL: 'public-read',
      Body: createReadStream(filePath),
      Bucket: bucketName,
      ContentType: getMimeType({ filePath }),
      Key: key,
    });
  });
  return Promise.all(uploads);
};

uploadDir(path.resolve('./data/images/'), 'astaria-web-app-images-prod');
