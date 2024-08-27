import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv";
dotenv.config();

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, PRIVATE_BUCKET_NAME } = process.env;

const s3Client = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: PRIVATE_BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function init() {
  console.log("URL for the Goku image is ", await getObjectURL("goku.jpg"));
}

init();
