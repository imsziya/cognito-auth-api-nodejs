require('dotenv').config();
const { 
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  AdminGetUserCommand,
  ListUsersCommand,
  AdminDeleteUserCommand,AuthFlowType } = require('@aws-sdk/client-cognito-identity-provider');
const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION,credentials: {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
}});

const signUp = async ({ username, password, attributes }) => {
  const params = {
    ClientId: process.env.AWS_CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: attributes.map(({ name, value }) => ({ Name: name, Value: value })),
  };
  return await client.send(new SignUpCommand(params));
};

const signIn = async ({ username, password }) => {
  const params = {
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: process.env.AWS_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  return await client.send(new InitiateAuthCommand(params));
};

const getUser = async (username) => {
  const params = {
    UserPoolId: process.env.AWS_POOL_ID,
    Username: username,
  };
  return await client.send(new AdminGetUserCommand(params));
};

const listUsers = () => {
  const command = new ListUsersCommand({
    UserPoolId: process.env.AWS_POOL_ID,
  });
  return client.send(command);
};

const adminDeleteUser = async (username) => {
  const params = {
    UserPoolId: process.env.AWS_POOL_ID,
    Username: username,
  };
  return await client.send(new AdminDeleteUserCommand(params));
};
  
module.exports = { signUp, signIn, getUser,listUsers , adminDeleteUser  };