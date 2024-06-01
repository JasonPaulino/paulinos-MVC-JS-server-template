import crypto from "crypto"

export const generateUniqueImageName = () => {
  return crypto.randomBytes(32).toString("hex")
}

export const getS3PutParams = ({
  bucketName,
  fileName,
  fileBuffer,
  mimeType,
}) => {
  return {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
  }
}

export const getS3GetParams = ({ bucketName, fileName }) => {
  return {
    Bucket: bucketName,
    Key: fileName,
  }
}

export const getS3DeleteParams = ({ bucketName, fileName }) => {
  return {
    Bucket: bucketName,
    Key: fileName,
  }
}
