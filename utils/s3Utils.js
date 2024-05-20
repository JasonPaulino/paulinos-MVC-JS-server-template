import crypto from "crypto"

export const generateUniqueImageName = () =>
  crypto.randomBytes(32).toString("hex")

export const getS3PutParams = (bucketName, fileName, fileBuffer, mimeType) => ({
  Bucket: bucketName,
  Key: fileName,
  Body: fileBuffer,
  ContentType: mimeType,
})

export const getS3GetParams = (bucketName, fileName) => ({
  Bucket: bucketName,
  Key: fileName,
})

export const getS3DeleteParams = (bucketName, fileName) => ({
  Bucket: bucketName,
  Key: fileName,
})
