// src/controllers/authController.js
const { signUp, signIn, getUser,listUsers,adminDeleteUser } = require('../services/cognitoService');

/**
 * Signup handler
 */
const handleSignUp = async (req, res) => {
  const { email, password, given_name, family_name, phone_number, gender } = req.body;

  try {
    const response = await signUp({
      username: email,
      password,
      attributes: [
        { name: 'email', value: email },
        { name: 'given_name', value: given_name },
        { name: 'family_name', value: family_name },
        { name: 'phone_number', value: phone_number },
        { name: 'gender', value: gender },
      ],
    });
    res.status(200).json({ message: 'Signup successful', data: response });
  } catch (error) {
    res.status(400).json({ message: 'Signup failed', error: error.message });
  }
};

/**
 * Signin handler
 */
const handleSignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await signIn({ username, password });
    res.status(200).json({ message: 'Login successful', token: response.AuthenticationResult });
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
};

/**
 * Get user handler
 */
const handleGetUser = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await getUser(username);
    res.status(200).json({ message: 'User retrieved successfully', data: response });
  } catch (error) {
    res.status(400).json({ message: 'Failed to retrieve user', error: error.message });
  }
};

const handleListUser = async(req,res)=>
    {
    try{
        const response = await listUsers();
        res.status(200).json({ message: 'User retrieved successfully', data: response });
    }
    catch(error)
    {
        res.status(400).json({ message: 'Failed to retrieve users', error: error.message });
    }
}
const handleDeleteUser =async (req,res)=>
{
    const { username } = req.params;
    try{
        const response = await adminDeleteUser(username);
        res.status(200).json({ message: 'User deleted successfully', data: response });
    }catch(error)    {
        res.status(400).json({ message: 'Failed to delete users', error: error.message });
    }
}
module.exports = { handleSignUp, handleSignIn, handleGetUser ,handleListUser,handleDeleteUser};
