require('dotenv').config();
const { 
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  AdminGetUserCommand,
  ListUsersCommand,
  AdminDeleteUserCommand } = require('@aws-sdk/client-cognito-identity-provider');

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION});

const signUp = async ({ username, password, attributes }) => {
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: attributes.map(({ name, value }) => ({ Name: name, Value: value })),
  };
  return await client.send(new SignUpCommand(params));
};

const signIn = async ({ username, password }) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  return await client.send(new InitiateAuthCommand(params));
};

const getUser = async (username) => {
  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: username,
  };
  return await client.send(new AdminGetUserCommand(params));
};

const listUsers = () => {
  const command = new ListUsersCommand({
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
  });
  return client.send(command);
};

const adminDeleteUser = async (username) => {
  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: username,
  };
  return await client.send(new AdminDeleteUserCommand(params));
};
  
module.exports = { signUp, signIn, getUser,listUsers , adminDeleteUser  };