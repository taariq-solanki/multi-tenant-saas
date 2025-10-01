const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const config = require('../config');

// Configure AWS SDK v3
const client = new DynamoDBClient({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey
  },
  requestHandler: {
    requestTimeout: 10000 // 10 second timeout
  }
});

// Create DynamoDB DocumentClient
const dynamodb = DynamoDBDocumentClient.from(client);

// Log AWS configuration (without secrets)
console.log('AWS Config:', {
  region: config.aws.region,
  hasAccessKey: !!config.aws.accessKeyId,
  hasSecretKey: !!config.aws.secretAccessKey,
  tableName: config.dynamodb.tableName
});

const TABLE_NAME = config.dynamodb.tableName;

class DynamoDBService {
  // Create a new tenant/user record
  async createTenantUser(tenantID, userID, password, data) {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        tenantID: tenantID,
        userID: userID,
        password: password, // In production, this should be hashed
        data: data || {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };

    try {
      await dynamodb.send(new PutCommand(params));
      return { success: true, message: 'User created successfully' };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, message: 'Failed to create user: ' + error.message };
    }
  }

  // Validate user login
  async validateUser(tenantID, userID, password) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        tenantID: tenantID,
        userID: userID
      }
    };

    try {
      const result = await dynamodb.send(new GetCommand(params));
      
      if (!result.Item) {
        return { success: false, message: 'User not found' };
      }

      if (password && result.Item.password !== password) {
        return { success: false, message: 'Invalid password' };
      }

      return { 
        success: true, 
        message: 'Login successful',
        user: {
          tenantID: result.Item.tenantID,
          userID: result.Item.userID,
          data: result.Item.data
        }
      };
    } catch (error) {
      console.error('Error validating user:', error);
      return { success: false, message: 'Failed to validate user: ' + error.message };
    }
  }

  // Get all users for a tenant
  async getTenantUsers(tenantID) {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'tenantID = :tenantID',
      ExpressionAttributeValues: {
        ':tenantID': tenantID
      }
    };

    try {
      const result = await dynamodb.send(new QueryCommand(params));
      
      // Remove password from response for security
      const users = result.Items.map(item => ({
        tenantID: item.tenantID,
        userID: item.userID,
        data: item.data,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }));

      return { success: true, users: users };
    } catch (error) {
      console.error('Error fetching tenant users:', error);
      return { success: false, message: 'Failed to fetch tenant users: ' + error.message };
    }
  }

  // ✅ Update user orders (for "Buy Product" feature)
  async updateUserOrders(tenantID, userID, orders) {
    const params = {
      TableName: TABLE_NAME,
      Key: { tenantID, userID },
      UpdateExpression: "set #data.#orders = :orders, updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#data": "data",
        "#orders": "orders"
      },
      ExpressionAttributeValues: {
        ":orders": orders,
        ":updatedAt": new Date().toISOString()
      },
      ReturnValues: "UPDATED_NEW"
    };

    try {
      await dynamodb.send(new UpdateCommand(params));
      return { success: true, orders };
    } catch (error) {
      console.error("Error updating orders:", error);
      return { success: false, message: "Failed to update orders: " + error.message };
    }
  }
}

module.exports = new DynamoDBService();
