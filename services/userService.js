var db = require('../database/database');

async function findAll1(req, res, next) {
    try {
      const { User } = await db();
      const users = await User.findAll();
      res.render('Userforms.twig', { users: users });
    } catch (e) {
      console.log(e);
      res.status(500).send('Internal Server Error');
    }
  }

async function createUser(req, res, next) {
    const { User } = await db();
    const { username,password,birthday } = req.body;
    await User.create({username,password,birthday});
    res.redirect('/Userforms');
}

async function displayUpdateUserform (req, res, next){
  try {
    const { User } = await db();
    // Assuming you send the updated user data in the request body
    const { id } = req.params;
    // Find the user by ID
    const userToUpdate = await User.findByPk(id);
    // Check if the user exists
    if (!userToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.render('formupdateUser.twig', { title: 'Update form', user: userToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; 

async function updateUser(req, res){
  try {
    const { User } = await db();
    // Assuming you send the updated user data in the request body
    const { title, username,password,birthday } = req.body;
    const { id } = req.params;
    // Find the user by ID
    const userToUpdate = await User.findByPk(id);
    // Check if the user exists
    if (!userToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Update the user
    userToUpdate.title = title;
    userToUpdate.username = username;
    userToUpdate.password = password;
    userToUpdate.birthday = birthday;

    await userToUpdate.save();
    // Send the updated useer as a response
    // res.json(userToUpdate);
    res.redirect('/Userforms');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteUser(req, res, next){
  try {
    const { User } = await db();
    const { id } = req.params;
    // Find the user by ID
    const userToDelete = await User.findByPk(id);
    // Check if the user exists
    if (!userToDelete) {
      return res.status(404).json({ error: 'user not found' });
    }
    // Delete the user
    await userToDelete.destroy();
    // Send a success message as a response

    res.redirect('/Userforms');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
module.exports= { findAll1, createUser,displayUpdateUserform, updateUser,deleteUser}
