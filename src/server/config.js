module.exports = {
  aws: {
    region: process.env.AWS_REGION || 'ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  server: {
    port: process.env.PORT || 4000
  },
  dynamodb: {
    tableName: process.env.DYNAMODB_TABLE_NAME || 'TenantsTable'
  }
};
