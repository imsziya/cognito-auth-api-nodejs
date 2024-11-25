const { signUp, signIn, getUser,listUsers,adminDeleteUser } = require('../services/authService');
const {createAttributes,createUser, createUsers} = require('../helpers/utility').default

const handleSignUp = async (req, res) => 
{
  const { email, password } = req.body
  try {
     await signUp({
      username: email,
      password,
      attributes: createAttributes(req),
    });
    res.status(200).json({ message: 'Signup successful'});
  } catch (error) {
    res.status(400).json({ message: 'Signup failed', error: error.message });
  }
};


const handleSignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await signIn({ username, password });
    res.status(200).json({ message: 'Login successful', token: response.AuthenticationResult });
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
};

const handleGetUser = async (req, res) => {
  const { username } = req.params;
  try {
    const response = await getUser(username);
    res.status(200).json({ message: 'User retrieved successfully', user: createUser(response.UserAttributes) });
  } catch (error) {
    res.status(400).json({ message: 'Failed to retrieve user', error: error.message });
  }
};

const handleListUser = async(req,res)=>
    {
    try{
        const response = await listUsers();
        res.status(200).json({ message: 'User retrieved successfully', users: createUsers(response.Users) });
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